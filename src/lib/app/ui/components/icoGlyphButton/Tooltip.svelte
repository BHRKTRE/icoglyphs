<script>
	let {
		tooltipsText = 'coucou',
		tooltipLocation = 'top-right',
		tooltipsSpaceBetween = '10px',
		buttonIsOver = false
	} = $props();

	let spaceBetweenSetup = `calc(100% + ${tooltipsSpaceBetween})`;

	let spaceBetweenLocation = $derived.by(() => {
		switch (tooltipLocation) {
			case 'top':
			case 'top-left':
			case 'top-right':
				return `bottom`;

			case 'bottom':
			case 'bottom-left':
			case 'bottom-right':
				return `top`;

			case 'right':
				return `left`;

			case 'left':
				return `right`;
		}
	});

	// $inspect(tooltipLocation);
</script>

<span
	class="tooltip {tooltipLocation}"
	class:buttonIsOver
	style="{spaceBetweenLocation}:{spaceBetweenSetup};">{tooltipsText}</span
>

<style>
	span {
		color: var(--t1);
		text-align: center;
		user-select: none;
		pointer-events: none;
	}

	.tooltip {
		visibility: hidden;
		opacity: 0;

		background-color: var(--b1);
		text-align: center;
		padding: var(--spacing-small) var(--spacing-medium);
		border-radius: var(--border-radius);

		transition: opacity 1s;

		white-space: nowrap;
		position: absolute;
		z-index: 1;
	}

	.buttonIsOver {
		visibility: visible;
		opacity: 1;
	}

	.top {
		transform: translateX(-50%);

		left: 50%;
	}
	.top-left {
		transform: translateX(-100%);
		border-radius: var(--border-radius) var(--border-radius) 0 var(--border-radius);

		left: 50%;
	}
	.top-right {
		transform: translateX(100%);
		border-radius: var(--border-radius) var(--border-radius) var(--border-radius) 0;

		right: 50%;
	}
	.bottom {
		transform: translateX(-50%);

		left: 50%;
	}
	.bottom-left {
		transform: translateX(-100%);
		border-radius: var(--border-radius) 0px var(--border-radius) var(--border-radius);

		left: 50%;
	}
	.bottom-right {
		transform: translateX(100%);
		border-radius: 0px var(--border-radius) var(--border-radius) var(--border-radius);

		right: 50%;
	}
	.left {
		top: 50%;
		transform: translateY(-50%);
	}
	.right {
		top: 50%;
		transform: translateY(-50%);
	}

	/* Arrow */
	/* .top::after {
		content: ' ';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: var(--b1o3) transparent transparent transparent;
	}

	.bottom::after {
		content: ' ';
		position: absolute;
		bottom: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent var(--b1o3) transparent;
	}
	.right::after {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 100%;
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent transparent var(--b1o3);
	}
	.left::after {
		content: ' ';
		position: absolute;
		top: 50%;
		right: 100%;
		margin-top: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent var(--b1o3) transparent transparent;
	} */

	/*  */

	/* .top-left::after {
		content: ' ';
		position: absolute;
		top: 100%; 
		right: 1.3%;
		margin-left: -5px;
		border-width: 3px;
		border-style: solid;
		border-color: var(--b1o3) var(--b1o3) transparent transparent;
	} */
</style>
