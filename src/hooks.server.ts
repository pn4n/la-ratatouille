import type { Handle } from '@sveltejs/kit';
import { DIRECTUS_URL } from '$env/static/private'

export const handle: Handle = async ({ resolve, event }) => {
    
      const response = await resolve(event);
      if (event.url.pathname.startsWith('/')) {
            response.headers.append('Access-Control-Allow-Origin', DIRECTUS_URL);
      }
      return response;
    };