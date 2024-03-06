import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { paraglide } from "@inlang/paraglide-js-adapter-sveltekit/vite"

import { defineConfig } from 'vite';

import autoImport from 'sveltekit-autoimport';

export default defineConfig({
	plugins: [
		paraglide({
			project: "./project.inlang",
			outdir: "./src/paraglide",
		}),
		autoImport({ 
			mapping: {
				m: `import * as m from "$paraglide/messages"`,
			},
			include: [/\.svelte$/],
		}),
		sveltekit(), purgeCss()]
});