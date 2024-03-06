import { redirect } from '@sveltejs/kit';
import { generateHash, createItem } from '@directus/sdk';
import { getDirectusInstance, verifyUser } from '$lib/dir-client.js';
import { fail } from '@sveltejs/kit';

// import { languageTag } from '$paraglide/runtime.js';
// import { i18n } from '$lib/i18n.js';

export function load({url}) {
  
  const tab = url.searchParams.get('tab');
  return { tab }
}

/** @type {import('./$types').Actions} */
export const actions = {
  signup: async ({ request, cookies }) => {
    const dir = getDirectusInstance(fetch);
    const data = await request.formData();

    try {
      console.log(data.get('password'), generateHash(data.get('password')))
      const user = {
        email: data.get('email'),
        pass: data.get('password'),
        name: data.get('name')
      }
      const res = await dir.request(createItem('users', user));

      cookies.set('session', res.pass, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 60 * 60 * 24 * 7 // one week
      });
      cookies.set('user', res.email, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 60 * 60 * 24 * 7 // one week
      });

      // update a user in the database for active order and reserve
      // const reserve = await cookies.get('reservation', { path: '/' });
      // const order = await cookies.get('order', { path: '/' });
      // updateUser(res.id, order, reserve)

      return { success: true }
    } catch (error) {
      if (error.errors[0].extensions.code === 'RECORD_NOT_UNIQUE') {
        return { success: false, message: 'User with this email already exists' }

      }
      return { success: false }
    }
  },
  signin: async ({ request, cookies }) => {
    const data = await request.formData();

    const res = await verifyUser(data.get('email'), data.get('password'))

    if (!res.success) return fail(400, res)

    if (res.user) {
      cookies.set('session', res.user.pass, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 60 * 60 * 24 * 7 // one week
      });
      cookies.set('user', res.user.email, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: 60 * 60 * 24 * 7 // one week
      });
      // update a user in the database for active order and reserve
      // const reserve = await cookies.get('reservation', { path: '/' });
      // const order = await cookies.get('order', { path: '/' });
      // const ress = await updateUser(res.id, order, reserve)
      // redirect(303, '/account')

      // goto(i18n.resolveRoute(url_without_lang, lang))
      // console.log(i18n.resolveRoute('/account', languageTag))
      // redirect(i18n.resolveRoute('/account', languageTag))
      redirect(303, '/account')
    }

    return fail(400, res)
  },
};

