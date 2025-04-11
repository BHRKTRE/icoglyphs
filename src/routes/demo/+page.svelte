<script>
	import icoGlyphs from '$lib/index.js';
	import appState from '$lib/app/core/stores/appState.svelte.js';
	import psi from '$lib/app/ui/utils/psi.js';
	import MorphingPath from '$lib/app/ui/components/MorphingPath.svelte';
	import Tooltip from '$lib/app/ui/components/Tooltip.svelte';
	import BasicBlock from '$lib/app/ui/components/BasicBlock.svelte';

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

	// $inspect(appState.modes);
	let tooltipop = $state(false);

	let defNAme = $state('arrow-left');
	let nextname = $state('arrow-left');

	let tooltipText = $state('coucou');

	function changeActualState2() {
		tooltipText = 'sissi';
		tooltipop = true;
		setTimeout(() => {
			tooltipText = 'coucou';
			tooltipop = false;
		}, 2000);
	}

	// $inspect(1 / psi ** 5);
</script>

<main>
	<div class="justforspace"></div>

	<Tooltip text={tooltipText} location="top" pop={tooltipop}>
		<BasicBlock>
			{#snippet title()}<h3>Settings</h3>{/snippet}
			{#snippet text()}
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad{/snippet}

			{#snippet subBlock()}
				<BasicBlock>
					{#snippet title()}<h4>Settings</h4>{/snippet}
					{#snippet text()}
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad{/snippet}

					{#snippet el()}
						<button class="button-default" onclick={changeActualState2}>
							<span>pop</span>
							<svg {...icoGlyphs.getSvgAttributes()}>
								<MorphingPath IGName={appState.modes.colorMode.value} />
							</svg>
						</button>
					{/snippet}
				</BasicBlock>
			{/snippet}
		</BasicBlock>
	</Tooltip>

	<div class="justforspace"></div>
	<div class="flex">
		<Tooltip text={tooltipText} location="top">
			<button class="button-svg-only button-1" onclick={() => console.log('click')}>
				<svg class="svg-default" {...icoGlyphs.getSvgAttributes(appState.modes.colorMode.value)}>
					<MorphingPath IGName={appState.modes.colorMode.value} />
				</svg>
			</button>
		</Tooltip>
	</div>

	<div class="justforspace"></div>
	<button class="button-default">
		<span>Download foo bar</span>
		<svg {...icoGlyphs.getSvgAttributes()}>
			<MorphingPath IGName={appState.modes.colorMode.value} />
		</svg>
		<svg {...icoGlyphs.getSvgAttributes()}>
			<MorphingPath IGName={appState.modes.colorMode.value} />
		</svg>
	</button>
	<div class="justforspace"></div>
	<div class="flex">
		<!-- <Tooltip text={tooltipText} location="top">
			<button class="button-svg-only button-1" onclick={() => console.log('click')}>
				<svg class="svg-default" {...icoGlyphs.getSvgAttributes(appState.modes.colorMode.value)}>
					<MorphingPath IGName={appState.modes.colorMode.value} />
				</svg>
			</button>
		</Tooltip> -->
	</div>
	<div class="justforspace"></div>
	<input type="text" bind:value={nextname} />
	<button class="button-text-only" onclick={changeActualState2}>change2</button>

	<div class="justforspace"></div>

	<br />
	<br />
	<button class="button-text-only" onclick={changeDuration}>duration</button>
	<!-- <button class="button-text-only" onclick={changeDuration}>params</button>

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
