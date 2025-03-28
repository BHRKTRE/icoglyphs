<script>
	import IcoGlyphButton from '$lib/app/ui/components/icoGlyphButton/IcoGlyphButton.svelte';
	import icoGlyphs from '$lib/index.js';
	import icoGlyphButtonPropsConstructor from '$lib/app/ui/components/icoGlyphButton/propsConstructor.js';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import psi from '$lib/app/ui/utils/psi.js';
	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';
	import Tooltip from '$lib/app/ui/components/Tooltip.svelte';

	let bbb = $state(new icoGlyphButtonPropsConstructor());
	bbb.add('arrow-left', () => console.log('function 2'), {
		to: 'arrow-right',
		tooltip: bbb.tooltip('a faire', 'bottom'),
		text: 'Prends le bail'
	});
	bbb.add('arrow-right', () => console.log('function 1'), {
		tooltip: bbb.tooltip('coucou', 'top'),
		text: '.png'
	});
	// bbb.add('arrow-top', () => console.log('function 3'));

	const styleyy = {
		// background: 'var(--b2)',
		// width: '100px',
		// height: '100px'
	};

	//////////////////////////

	let selectedButton1 = $state('arrow-left');

	function changeActualState() {
		selectedButton1 = 'arrow-right';
	}

	let animeDurationButton1 = $state(500);

	function changeDuration() {
		animeDurationButton1 = 2000;
	}

	/**
	 *Doc:
	 * @notice This will trigger when the parent change the name button
	 * @param {string} selected - Must be a valid icoGlyph name and being in the button	* can be used to bind the selected prop of IcoGlyphButton
	 * Thus you can change the button state from anywhere in the app
	 * Ex: if the state button depend of a boolean in the parent component
	 * bind:selected={...}
	 */

	// $inspect(appState.modes);

	let defNAme = $state('arrow-left');
	let nextname = $state('arrow-left');

	let tooltipText = $state('coucou');

	function changeActualState2() {
		// defNAme = nextname;
		tooltipText = 'sissi';
		setTimeout(() => {
			tooltipText = 'coucou'; // Valeur initiale
		}, 2000);
	}
</script>

<main>
	<div class="justforspace"></div>
	<div class="flex">
		<Tooltip text={tooltipText} location="top">
			<button class="button-default button-1" onclick={() => console.log('click')}>
				<svg class="svg-default" {...icoGlyphs.getSvgAttributes(appState.modes.colorMode.value)}>
					<MorphingPath IGName={appState.modes.colorMode.value} />
				</svg>
			</button>
		</Tooltip>
	</div>
	<div class="justforspace"></div>
	<input type="text" bind:value={nextname} />
	<button class="text-button" onclick={changeActualState2}>change2</button>

	<div class="justforspace"></div>
	<IcoGlyphButton
		bind:selected={selectedButton1}
		animeDuration={animeDurationButton1}
		buttonConfig={bbb}
		buttonStyle={styleyy}
	/>
	<br />
	<br />
	<button class="text-button" onclick={changeActualState}>change</button>
	<button class="text-button" onclick={changeDuration}>duration</button>
	<!-- <button class="text-button" onclick={changeDuration}>params</button>

	<div id="params-container"><Params /></div> -->
</main>

<style>
	.flex {
		display: flex;
	}
	.button-1 {
		height: 50px;
		width: 50px;
	}

	/* #params-container {
		border: 1px solid var(--b2);
		position: absolute;
		background: var(--b1);
		top: 10px;
	} */
	main {
		margin-left: 15px;
	}

	.justforspace {
		height: 100px;
	}
</style>
