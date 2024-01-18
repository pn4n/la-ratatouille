import { getDirectusInstance, getOrder, getItems } from '$lib/dir-client.js';
import { readItem, updateItem } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const res = await getOrder(params.slug)
    console.log('load', res)
    if (res.data.length < 1) {
        return error(404, 'Not found')
    }
    // const items = getItems(res.data[0].order_items)
    return {res}
}

/** @type {import('./$types').Actions} */
export const actions = {
	cancel: async ({ locals, params, cookies }) => {
        const dir = getDirectusInstance(fetch);
        try {
            const reserve = await dir.request(readItem( 
                'orders', params.slug));

            if (reserve.user != locals.user.id) { 
                return fail(400, { success:false, 
                    message: 'only owner can cancel this reservation' } )
            } 

            if (reserve.status === 'canceled') {
                return fail(400, { success:false, 
                    message: 'already canceled' } )
            }

            await dir.request(updateItem( 
                'orders', params.slug, { 'status': 'canceled' } ));
            await cookies.delete('reservation', { path: '/' })
            return { success: true }
          } catch (error) {
            console.log(error)
            return fail(400, { success:false} )
          }
        }
};