import { dir } from '$lib/dir-client.js';
import { readItem } from '@directus/sdk/rest';

export function load({ params }) {
    return {
        res: new Promise(async (resolve) => {
            try {
                const res = await dir.request(readItem('reservations', params.slug));
                resolve(res)
            } catch {
                resolve({ error:  ' directus failed to load' })
            }
        })
    }
    const res = dir.request(readItem('reservations', params.slug));
    console.log(res)
    return {res}

	error(404, 'Not found');
}