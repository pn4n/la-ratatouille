import { getDirectusInstance } from '$lib/dir-client.js';
import { readItem, updateItem } from '@directus/sdk';
import { fail } from '@sveltejs/kit';

export function load({ fetch, params }) {
	const dir = getDirectusInstance(fetch);
    return {
        res: new Promise(async (resolve) => {
            try {
                const res = await dir.request(readItem('reservations', params.slug));
                console.log(res)
                resolve(res)
            } catch {
                resolve({ error:  ' directus failed to load' })
            }
        })
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
	cancel: async ({ request, params }) => {
        const dir = getDirectusInstance(fetch);
        const data = await request.formData();
    
        try {
            await dir.request(updateItem( 
                'reservations', params.slug, { 'status': 'canceled' } ));
            return { success: true }
          } catch (error) {
            return fail(400, {message:JSON.stringify(error) } )
          }
        }
};