
import { getDirectusInstance, reserveStatus, getOpenReserves } from '$lib/dir-client.js';
import { createItem } from '@directus/sdk';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { UNAUTHORIZED } from '$env/static/private'

export async function load({ cookies, parent }) {
  const data = await parent();
	const reservation = cookies.get('reservation');
  let reserve = null
  if (data.user) { // check if reservation exists
    // [for authorized users]
    reserve = await getOpenReserves(data.user.id)
    reserve = reserve.data.map((res) => res.id)[0]

  } else if (reservation) {
    // [for unauthorized users]
    reserve = await reserveStatus(reservation)
    if (!reserve.data.status in ['created', 'accepted']) {
      await cookies.delete('reservation',{ path: '/'})
      reserve = null
    }
  }
	return { reservation: reservation, reserve: reserve, user: data.user };
}

export const actions = {
  default: async ({ request, fetch, cookies, locals}) => {
    const dir = getDirectusInstance(fetch);
    const data = await request.formData();
    let user 
    //= locals.user.id || UNAUTHORIZED;
    
    if (locals.user == null) user = UNAUTHORIZED;
    else user = locals.user.id

    const reserve = {
      status: 'created',
      user: user,
      date:  data.get('date'),
      time:  data.get('time'),
      info: 'Name: \t' + data.get('name') +
      '\nEmail: \t' + data.get('email') +
      '\nPhone: \t' + data.get('phone') +
      '\nNumber of people: \t' + data.get('people') +
      '\nComment: \t' + data.get('comment'),
    }

    let res;

    try {
      res = await dir.request(createItem('reservations', reserve));
      console.log(res)
      cookies.set('reservation', res.id, {path: '/'});
    } catch (error) {
      console.log(error)
      return fail(400,{ success: false, message: JSON.stringify(error) })
    }

    redirect(303, '/reservation/' + res.id);
  },
};
