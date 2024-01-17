import { redirect } from '@sveltejs/kit';
import { generateHash, readItem, createItem } from '@directus/sdk';
import { getDirectusInstance } from '$lib/dir-client.js';
import { fail } from 'assert';

// export const load = async (event) => {
//   const session = await event.locals.getSession();
//   // if (!session?.user) {
//   //   throw redirect(303, '/auth');
//   // }
//   // return {session};
// };

/** @type {import('./$types').Actions} */
export const actions = {
	signup: async ({ request, params }) => {
        const dir = getDirectusInstance(fetch);
        const data = await request.formData();
    
        try {
          console.log(data.get('password'), generateHash(data.get('password')))
          const user = {
            email: data.get('email'),
            pass :data.get('password'),
            name: data.get('name')
          } 
          const res = await dir.request(createItem('users', user));
                console.log(res);
            return { success: true }
          } catch (error) {
            console.log( error)
            return { success: false, error }
          }
        },
  signin: async ({ request, params }) => {
    const dir = getDirectusInstance(fetch);
    const data = await request.formData();

    try {
      const res = await dir.request(readItem( 
        'users', data.username ));
        console.log(res);
        return { success: true }
      } catch (error) {
        // console.log( error)
        return { success: false, error }
      }
    }
};