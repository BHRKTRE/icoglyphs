<script>
	import { page } from '$app/state';

	let { data, capitalizeTitle } = $props();
</script>

<svelte:head>
	<meta name="description" content="{data.aliases?.[0] || 'Unnamed'} – free icon." />
	<meta
		name="keywords"
		content="{data.aliases?.[0] ||
			'Unnamed'}, icon, glyph, universal icon, ideographic, API, customizable, SVG icon, PNG icon, UI design, visual language, free icon, scalable graphics, animable SVG"
	/>
	<meta name="author" content="IcoGlyphs Crew" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="'{data.aliases?.[0] || 'Unnamed'}' icon" />
	<meta
		property="og:description"
		content="'{data.aliases?.[0] ||
			'Unnamed'}' icon created through the research of signs, shapes, and forms."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url} />
	<meta property="og:image" content="https://www.icoglyphs.com/og-image.png" />
	<meta name="twitter:title" content="'{data.aliases?.[0] || 'Unnamed'}' icon" />
	<meta
		name="twitter:description"
		content="'{data.aliases?.[0] ||
			'Unnamed'}' icon created through the research of signs, shapes, and forms."
	/>
	<meta name="twitter:image" content="https://www.icoglyphs.com/og-image.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<title>{capitalizeTitle(data.aliases?.[0] || 'Unnamed')} – icon</title>
</svelte:head>
