import { createDirectus, staticToken, rest } from '@directus/sdk';
import { DIRECTUS_URL } from '$env/static/private';
import { DIRECTUS_TOKEN } from '$env/static/private';

export const dir = createDirectus(DIRECTUS_URL)
    .with(staticToken(DIRECTUS_TOKEN))
    .with(rest());
