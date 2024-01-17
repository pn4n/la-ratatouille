import { readItems, createItem } from '@directus/sdk';

import { getDirectusInstance } from '$lib/dir-client.js';
import { fail } from '@sveltejs/kit';
import { categorizeItems } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const dir = getDirectusInstance(fetch);


  return {
    streamed: new Promise(async (resolve) => {
        try {
        const result = await dir.request(readItems('items'))

        const items = await dir.request(readItems('items', 
              { deep: {translations: { }}, 
                fields: ['*', { translations: ['*'] }]
              } ))
              
        let categories = await dir.request(readItems('categories', 
              { deep: {translations: { }}, 
                fields: ['*', { translations: ['*'] }]
              } ))
        let orders = await dir.request(readItems('orders' ))
        const cat_expaned = categorizeItems(categories, items)
        resolve({ menu_items: cat_expaned, items: items, url: dir.url.origin, orders: orders })
      } catch {
        resolve({ error:  ' directus failed to load' })
      }
      }),
      
    
  }

};

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();

    const item_object = {

      user_info:'Email: ' + data.get('email') +
              ', Name: ' + data.get('name') +
              ', Phone: ' + data.get('phone') +
              ', Address: ' + data.get('address') +
              ', Comment: ' + data.get('comment'),
    }
    let items = data.get('order')
    const order = {
      status: 'created',
      // for unauthorized user:NULL
      user: '4f108f40-41d8-4b53-b011-9840cc568b35',
      items: JSON.parse(items),
      address: data.get('address'),
      info: item_object.user_info
    }

    try {
      const dir = getDirectusInstance();
      const res = await dir.request(createItem('orders', order));

      // for unauthorized
      cookies.set('order', res.id, {path: '/'});

      return { success: true }
    } catch (error) {
      return fail(400, {success: false , message: JSON.stringify(error)})
    }
  },
};
