import { getDirectusInstance, getReserve } from '$lib/dir-client.js';
import { readItem, updateItem } from '@directus/sdk';
import { error, fail } from '@sveltejs/kit';
import { UNAUTHORIZED } from '$env/static/private';

export async function load({ locals, params }) {
    const isAuthenticated = locals?.user?.isAuthenticated || false
	const res = await getReserve(params.slug)
    if (res.data.length < 1) {
        return error(404, 'Not found')
    }
    return {res, isAuthenticated}
}

/** @type {import('./$types').Actions} */
export const actions = {
	cancel: async ({ locals, params, cookies }) => {
        const dir = getDirectusInstance(fetch);
        try {
            const reserve = await dir.request(readItem( 
                'reservations', params.slug));

            const current_user = locals?.user?.id || UNAUTHORIZED
            
            if (reserve.user != current_user) { 
                return fail(400, { success:false, 
                    message: 'only owner can cancel this reservation' } )
            }         
            switch (reserve.status) {
                case 'canceled':
                    return fail(400, { success:false, 
                        message: 'already canceled' } )
                case 'completed':
                    return fail(400, { success:false,
                        message: 'already completed' } )
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