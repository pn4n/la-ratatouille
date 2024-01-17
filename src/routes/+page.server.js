
import { getDirectusInstance } from '$lib/dir-client.js';
import { createItem, readItem } from '@directus/sdk';
import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import UNAUTHORIZED from '$env/static/private'

export async function load({ cookies }) {
	const reservation = cookies.get('reservation');
  const dir = getDirectusInstance();
  const res = await dir.request(readItem('users' ));
  console.log(res)
	return { reservation: reservation, users: res };
}

export const actions = {
  default: async ({ request, fetch, cookies}) => {
    const dir = getDirectusInstance(fetch);
    const data = await request.formData();

    const reserve = {
      status: 'created',
      user: {ID: UNAUTHORIZED},
      date:  data.get('date'),
      time:  data.get('time'),
      info: 'Name: \t' + data.get('name') +
      '\nEmail: \t' + data.get('email') +
      '\nPhone: \t' + data.get('phone') +
      '\nNumber of people: \t' + data.get('people') +
      '\nComment: \t' + data.get('comment'),
    //   date: new Date().toISOString()
    }

    let res;

    try {
      res = await dir.request(createItem('reservations', reserve));
      // for unauthorized
      cookies.set('reservation', res.id, {path: '/'});
      // console.log(res)
    //   return { success: true, res: res.id}
    } catch (error) {
        console.log(error)
      return fail(400,{ success: false, message: error })
    }

    redirect(303, '/reservation/' + res.id);
  },
};
