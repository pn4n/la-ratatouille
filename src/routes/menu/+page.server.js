import { readItems, createItem } from '@directus/sdk/rest';

import { dir } from '$lib/dir-client.js';
import { fail } from 'assert';
import { categorizeItems } from '$lib/utils';

// import { language } from '@inlang/sdk-js';


/** @type {import('./$types').PageServerLoad} */
export async function load() {

  return {
    streamed: {
      dir: new Promise(async (resolve) => {
        const result = await dir.request(readItems('items'))
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.error('An error occurred:', error);
        // });
        
        const items = await dir.request(readItems('items', 
              { deep: {translations: { }}, 
                fields: ['*', { translations: ['*'] }]
              } ))
              
        let categories = await dir.request(readItems('categories', 
              { deep: {translations: { }}, 
                fields: ['*', { translations: ['*'] }]
              } ))
        
        const cat_expaned = categorizeItems(categories, items)
        resolve({ menu_items: cat_expaned, items: items, url: dir.url.origin })
      }),
    }
  }
};

export const actions = {
  default: async ({ request }) => {
    const dir = directus()
    const data = await request.formData();

    const item_object = {

      user_info:'Email: ' + data.get('email') +
              ', Phone: ' + data.get('phone') +
              ', Address: ' + data.get('address') +
              ', Comment: ' + data.get('comment'),
      request_info: data.get('order')
    }

    try {
      await dir.request(createItem('requests', item_object));
      return { success: true }
    } catch {
      return fail('error')
    }
  },
};
