
import { dir } from '$lib/dir-client.js';
import { createItem } from '@directus/sdk/rest';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const user = cookies.get('sessionid');
	return { user };
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const reserve = {
      status: 'created',
      user: 1,
      date:  data.get('date'),
      time:  data.get('time'),
      info: 'Name: \t' + data.get('first_name') +
      '\nSurname: \t' + data.get('last_name') +
      '\nPhone: \t' + data.get('phone') +
      '\nNumber of people: \t' + data.get('people') +
      '\nComment: \t' + data.get('comment'),
    //   date: new Date().toISOString()
    }

    let res;

    try {
      res = await dir.request(createItem('reservations', reserve));
    //   return { success: true, res: res.id}
    } catch (error) {
        console.log(error)
      return { success: false }
    }

    redirect(303, '/reservation/' + res.id);
  },
};
