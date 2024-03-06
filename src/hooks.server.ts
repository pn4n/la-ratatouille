import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';

import { i18n } from '$lib/i18n.js'
import { languageTag, availableLanguageTags } from '$paraglide/runtime.js';

import { DIRECTUS_URL } from '$env/static/private';
import { removeLangSlug } from '$lib/utils.js'
import { verifySession } from '$lib/dir-client.js';

export const reroute = i18n.reroute()

export async function dir_handle({ event, resolve }) {
	return await resolve(event, {
		filterSerializedResponseHeaders: (key, value) => {
			return key.toLowerCase() === 'content-type';
		},
	});
}

export const auth_handle = async ({ event, resolve }) => {
	const username = event.cookies.get('user');

	const url_without_lang = removeLangSlug(event.url.pathname, availableLanguageTags);

	if (!username && url_without_lang.startsWith('/account')) {
		// throw redirect(303, '/login');
		throw redirect(303, i18n.resolveRoute('/login', languageTag))
	}
	
	const session = await event.cookies.get('session');
	let res = {success: false, user:null}
	
	if (session) {
		res = await verifySession(username,session);
	}
	
	if (!res.success) {
		await event.cookies.delete('session', { path: '/' });
		await event.cookies.delete('user', { path: '/' });
		
		if ( url_without_lang.startsWith('/account')) 
		throw redirect(303, i18n.resolveRoute('/login', languageTag))
	}

	if (username && url_without_lang == '/login') 
	// throw redirect(303, '/account');
	throw redirect(303, i18n.resolveRoute('/account', languageTag))

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
	if (url_without_lang == '/signout') {
		await event.cookies.delete('session', { path: '/' });
		await event.cookies.delete('user', { path: '/' });
		await event.cookies.delete('reservation', { path: '/' });
		await event.cookies.delete('order', { path: '/' });
		event.locals.user = null;
		throw redirect(303, i18n.resolveRoute('/login', languageTag))
	}
	
	const response = await resolve(event);

	if (event.url.pathname.startsWith('/')) {
		response.headers.append('Access-Control-Allow-Origin', DIRECTUS_URL);
	}
	return response;
}

export const handle: Handle = sequence(
	auth_handle,
	dir_handle
);
