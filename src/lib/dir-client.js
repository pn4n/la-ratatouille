import { createDirectus, rest, staticToken } from '@directus/sdk';
import { readItems, readItem, updateItem, updateUser, createItem, deleteItem } from '@directus/sdk';
import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private';

export const getDirectusInstance = ( fetch ) => {
  	const options = fetch ? { globals: { fetch } } : {};
	// const directus = createDirectus(PUBLIC_APIURL, options ).with(rest());
	const directus = createDirectus(DIRECTUS_URL, options)
        .with(staticToken(DIRECTUS_TOKEN))
        .with(rest());
	return directus;
}

export const getUserById = async (id) => {
	const dir = getDirectusInstance();
	return await dir.request(readItem('users', { 
	fields: ['*']
  }));
}