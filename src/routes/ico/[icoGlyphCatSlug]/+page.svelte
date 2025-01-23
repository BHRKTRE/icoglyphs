<script>
	import icoGlyphs from 'icoglyphs';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const allPathKeys = [];

	for (const icoGlyphName in icoGlyphs.library().svgData[data.name].path) {
		allPathKeys.push(icoGlyphName);
	}

	export const namePageOf = $state(data.name);

	goto(`/${namePageOf}/${allPathKeys[0]}`);

	// $inspect(allPathKeys[0]);
</script>
