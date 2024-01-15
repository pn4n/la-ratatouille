import { readItems, createItem } from '@directus/sdk/rest';

import { dir } from '$lib/dir-client.js';
import { fail } from 'assert';
import { categorizeItems } from '$lib/utils';
// import { error } from 'console';
// import { userInfo } from 'os';

// import { language } from '@inlang/sdk-js';


/** @type {import('./$types').PageServerLoad} */
export async function load() {


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
  default: async ({ request }) => {
    // const dir = directus()
    const data = await request.formData();

    const item_object = {

      user_info:'Email: ' + data.get('email') +
              ', Name: ' + data.get('name') +
              ', Phone: ' + data.get('phone') +
              ', Address: ' + data.get('address') +
              ', Comment: ' + data.get('comment'),
      request_info: data.get('order') + 'yey'
    }
    const order = {
      status: 'created',
      user: '1',
      items:Object.keys(data.get('order')),
      address: data.get('address'),
      info: item_object.user_info
      // user_info:'Email: ' + data.get('email') +
      //         ', Name: ' + data.get('name') +
      //         ', Phone: ' + data.get('phone') +
      //         ', Address: ' + data.get('address') +
      //         ', Comment: ' + data.get('comment'),
      // request_info: data.get('order') + 'yey'
    }

    try {
      // await dir.request(createItem('requests', item_object));
      await dir.request(createItem('orders', order));
      return { success: true }
    } catch (error) {
      return fail(JSON.stringify(error))
    }
  },
};
