import type { Handle } from '@sveltejs/kit';

import { verifySession } from '$lib/dir-client';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';

export async function dir_handle({ event, resolve }) {
	return await resolve(event, {
		filterSerializedResponseHeaders: (key, value) => {
			return key.toLowerCase() === 'content-type';
		},
	});
}

export const auth_handle = async ({ event, resolve }) => {
	const username = event.cookies.get('user');

	const pathname = event.url.pathname;

	if (!username && pathname.startsWith('/account')) {
		throw redirect(303, '/login');
	}
	
	const res = await verifySession(username, event.cookies.get('session'));
	
	if (!res.success) {
		await event.cookies.delete('session', { path: '/' });
		await event.cookies.delete('user', { path: '/' });
		
		if ( pathname.startsWith('/account')) throw redirect(303, '/login');
	}

	if (pathname == '/login') throw redirect(303, '/account');

	const currentUser = res.user
	if (currentUser) {
		event.locals.user = {
			isAuthenticated: true,
			email: currentUser.email,
			id: currentUser.id,
			name: currentUser.name,
			phone: currentUser.phone,
			address: currentUser.address,
		};
	} 
	if (pathname == '/signout') {
		await event.cookies.delete('session', { path: '/' });
		await event.cookies.delete('user', { path: '/' });
		await event.cookies.delete('reservation', { path: '/' });
		await event.cookies.delete('order', { path: '/' });
		event.locals.user = null;
		redirect(303, '/account');
	}
	return resolve(event);
}

export const handle: Handle = sequence(
	auth_handle,
	dir_handle
);
