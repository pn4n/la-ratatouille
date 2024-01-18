import { getDirectusInstance, getReserve } from '$lib/dir-client.js';
import { readItem, updateItem } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const res = await getReserve(params.slug)
    if (res.data.length < 1) {
        return error(404, 'Not found')
    }
    return {res}
}

/** @type {import('./$types').Actions} */
export const actions = {
	cancel: async ({ locals, params, cookies }) => {
        const dir = getDirectusInstance(fetch);
        try {
            const reserve = await dir.request(readItem( 
                'reservations', params.slug));

            if (reserve.user != locals.user.id) { 
                return fail(400, { success:false, 
                    message: 'only owner can cancel this reservation' } )
            } 

            if (reserve.status === 'canceled') {
                return fail(400, { success:false, 
                    message: 'already canceled' } )
            }

            await dir.request(updateItem( 
                'reservations', params.slug, { 'status': 'canceled' } ));
            await cookies.delete('reservation', { path: '/' })
            return { success: true }
          } catch (error) {
            console.log(error)
            return fail(400, { success:false} )
          }
        }
};