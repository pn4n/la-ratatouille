import { getDirectusInstance } from '$lib/dir-client.js';
import { readItems } from '@directus/sdk';

export const load = async ({url, locals}) => {
  console.log('l', locals)
  const dir = getDirectusInstance();
  let orders = await dir.request(readItems('orders',
    { filter: { user: { _eq: locals.user.id } } }));
  // console.log(orders)
  let reserves = await dir.request(readItems('reservations',
    { filter: { user: { _eq: locals.user.id } } }));
  // if (reserves) reserves = reserves.map((res) => {
  //   id:res.id,
  //   date:res.date,
  //   stat:res.status})
  // if (orders) orders = orders.map((res) => {
  //   id:res.id,
  //   date:res.date,
  //   stat:res.status})
    // console.log(orders)
  
  const tab = url.searchParams.get('tab');

  return { tab, reserves, orders }
}

