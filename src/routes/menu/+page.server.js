import { readItems, createItem } from '@directus/sdk';
import { redirect } from '@sveltejs/kit';
import { UNAUTHORIZED } from '$env/static/private';

import { getDirectusInstance } from '$lib/dir-client.js';
import { fail } from '@sveltejs/kit';
import { categorizeItems } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const dir = getDirectusInstance();
  // let user
  // if (locals.user) user = locals.user
  return {
    // user: locals.user,
    streamed: new Promise(async (resolve) => {
        try {

        const items = await dir.request(readItems('items', 
              { deep: {translations: { }}, 
                fields: ['*', { translations: ['*'] }]
              } ))
              
        let categories = await dir.request(readItems('categories', 
              { deep: {translations: { }}, 
                fields: ['*', { translations: ['*'] }]
              } ))
        // let orders = await dir.request(readItems('users' ))
        const cat_expaned = categorizeItems(categories, items)
        resolve({ menu_items: cat_expaned, items: items, url: dir.url.origin })
      } catch {
        resolve({ error:  ' directus failed to load' })
      }
      }),
      
    
  }

};

export const actions = {
  default: async ({ request, cookies, locals }) => {
    const data = await request.formData();

    let user
    if (locals.user == null) user = UNAUTHORIZED;
    else user = locals.user.id


    const item_info ='Email: ' + data.get('email') +
              ', Name: ' + data.get('name') +
              ', Phone: ' + data.get('phone') +
              // ', Address: ' + data.get('address') +
              ', Comment: ' + data.get('comment')

    let items = data.get('order')
    const order = {
      status: 'created',
      // for unauthorized user:NULL
      user: user,
      order_items: JSON.parse(items),
      address: data.get('address'),
      info: item_info
    }
    let res
    try {
      const dir = getDirectusInstance();
      res = await dir.request(createItem('orders', order));
      cookies.set('order', res.id, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 60 * 60 * 24 * 7 // one week
      });
    } catch (error) {
      console.log(error)
      return fail(400, {success: false , message: JSON.stringify(error)})
    }
    redirect(303, '/order/' + res.id);
  },
};
