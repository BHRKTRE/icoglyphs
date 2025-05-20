<script>
	import BasicBlock from '$lib/app/components/BasicBlock.svelte';
	import appState from '$lib/app/appState.svelte.js';
	import MorphingPath from '$lib/app/components/MorphingPath.svelte';
	import icoGlyphs from '$lib/index.js';
	import {
		downloadPng,
		copySvgToClipBoard,
		downloadSvg
	} from '$lib/app/utils/export-tools.svelte.js';

	let { data } = $props();

	const buttonsConfig = [
		{
			key: 'dlPng',
			action: () => downloadPng(data.name),
			state1: { text: "Download icon's PNG", icon: 'download' },
			state2: { text: 'PNG is downloading!', icon: 'download' }
		},
		{
			key: 'dlSvg',
			action: () => downloadSvg(data.name),
			state1: { text: "Download icon's SVG", icon: 'download' },
			state2: { text: 'SVG is downloading!', icon: 'download' }
		},
		{
			key: 'copySvg',
			action: () => copySvgToClipBoard(data.name),
			state1: { text: 'Copy SVG to clipboard', icon: 'copy' },
			state2: { text: 'SVG copied!', icon: 'copy' }
		}
	];

	let buttonsArray = $state(
		buttonsConfig.map(({ key, action, state1, state2 }) => ({
			key: key,
			action: action,
			text: state1.text,
			icon: state1.icon,
			state1: state1,
			state2: state2
		}))
	);

	function handleClick(btn) {
		btn.action();

		btn.text = btn.state2.text;
		btn.icon = btn.state2.icon;

		setTimeout(() => {
			btn.text = btn.state1.text;
			btn.icon = btn.state1.icon;
		}, 5000);
	}

	// $inspect(buttonsArray);
</script>

<BasicBlock>
	{#snippet el()}
		{#each buttonsArray as btn}
			<button class="button-default" onclick={() => handleClick(btn)}>
				<span>{btn.text}</span>
				<svg class="svg-default" {...icoGlyphs.getSvgAttributes()}>
					<MorphingPath IGName={btn.icon} />
				</svg>
			</button>
		{/each}
	{/snippet}
</BasicBlock>

<style>
	#top-container {
		width: 100%;
		height: 100%;
		max-width: var(--max-width-medium);
		position: relative;
		display: flex;
		flex-direction: column;
	}

	button {
		width: 100%;
	}
</style>
