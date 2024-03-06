<script>
	import { languageTag, setLanguageTag, availableLanguageTags } from '$paraglide/runtime.js';

	import { i18n } from '$lib/i18n.js';
	import { page } from '$app/stores';
	// import { redirect } from '@sveltejs/kit'
	import { goto } from '$app/navigation'
	import { removeLangSlug } from '$lib/utils'

	let changeLanguage = (lang) => {
		if (lang == languageTag()) return

		setLanguageTag(lang);
		let url_without_lang = removeLangSlug($page.url.pathname, availableLanguageTags)
		
		// console.log(lang)
		// redirect(303, i18n.resolveRoute($page.url.pathname, lang))
		// console.log('url without lang ',url_without_lang)
		// console.log('lang ',lang)
		// console.log('langTag ',languageTag())
		// console.log('resolve ', i18n.resolveRoute(url_without_lang, lang))
		goto(i18n.resolveRoute(url_without_lang, lang))
		
	}
</script>

<div class="text-center flex-col items-center justify-center py-10">
	<img src="/remy.png" alt="remy the mouse" class="remy" />
	<div class="flex items-center justify-center">
		<div class="space-x-2  btn btn-xs">
			{#each availableLanguageTags as lang}
			<!-- href={i18n.route($page.url.pathname)}
			hreflang={lang} -->
				<button
					on:click={() => changeLanguage(lang)}
					aria-current={lang === languageTag() ? 'page' : undefined}
					class="{lang === languageTag() ? 'code variant-ghost-tertiary disabled' : 'code variant-filled-tertiary'}
                    p-1"
				>
					{lang}
			</button>
			{/each}
		</div>
		<p class="text-tertiary-800 font-light">
			{m.footer_madeby()} <a href="https://github.com/pn4n" class="anchor p-1">pn4n</a>
		</p>
	</div>
</div>

<style>
	.remy {
		width: 15rem;
		margin: 0 auto;
	}
</style>
