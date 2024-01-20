import { getDirectusInstance } from '$lib/dir-client.js';
import { readItems } from '@directus/sdk';

export const load = async ({url, locals}) => {
  const dir = getDirectusInstance();
  let orders = await dir.request(readItems('orders',
    { filter: { user: { _eq: locals.user.id } },
      fields: ['id', 'date_created', 'status'] },
    { sort: '-date_created' } ));
  // console.log(orders)
  let reserves = await dir.request(readItems('reservations',
    { filter: { user: { _eq: locals.user.id } },
    fields: ['id', 'date', 'status']  },
    { sort: '-date' } ));
  
  const tab = url.searchParams.get('tab');

  return { tab, reserves, orders }
}

