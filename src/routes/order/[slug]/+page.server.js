import { getDirectusInstance, getOrder } from '$lib/dir-client.js';
import { readItem, updateItem } from '@directus/sdk';
import { error, fail } from '@sveltejs/kit';
import { UNAUTHORIZED } from '$env/static/private';

export async function load({ params, locals }) {
    const isAuthenticated = locals?.user?.isAuthenticated || false
	const res = await getOrder(params.slug)
    if (res.data.length < 1) {
        return error(404, 'Not found')
    }
    // const items = getItems(res.data[0].order_items)
    return {res, isAuthenticated}
}

/** @type {import('./$types').Actions} */
export const actions = {
	cancel: async ({ locals, params, cookies }) => {
        const dir = getDirectusInstance(fetch);
        try {
            const reserve = await dir.request(readItem( 
                'orders', params.slug));

            const current_user = locals?.user?.id || UNAUTHORIZED
            if (reserve.user != current_user) { 
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