import type { Handle } from '@sveltejs/kit';
import { getUserById } from '$lib/dir-client';
// import { SvelteKitAuth } from "@auth/sveltekit";
// import Auth from "@auth/core";
// import Credentials from "@auth/core/providers/credentials";

// import GitHub from "@auth/sveltekit/providers/github";
// import Mailru from "@auth/sveltekit/providers/mailru";
// import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private";
// import { MAILRU_CLIENT_ID, MAILRU_CLIENT_SECRET } from "$env/static/private";
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
	const sessionId = event.cookies.get('session_id');
	const pathname = event.url.pathname;
	console.log('path: ', pathname)
	if (!sessionId && pathname.startsWith('/account/')) {
		throw redirect(303, '/account');
	}
	// const currentUser = await getUserById(sessionId);
	// if (currentUser) {
	// 	event.locals.user = {
	// 		isAuthenticated: true,
	// 		email: currentUser.email,
	// 		id: currentUser.id
	// 	};
	// } else {
	// 	if (pathname.startsWith('/account/')) {
	// 		throw redirect(303, '/');
	// 	}
	// }

	if (pathname.startsWith('/signout')) {
		await event.cookies.delete('session_id', { path: '/' });
		console.log('<signout>')
	}
	return resolve(event);
}

export const handle: Handle = sequence(
	auth_handle,
	dir_handle
);
