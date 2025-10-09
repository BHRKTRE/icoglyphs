<script>
	let segmentType = 'line';

	let segmentsNumber = 3;

	let M = $state({ x: 0, y: -35 });
	let curves = $state([
		{ x1: 6.6667, y1: -27.6667, x2: 13.3333, y2: -20.3333, x: 20, y: -13 },
		{ x1: 15.3333, y1: -3.3333, x2: 10.6667, y2: 6.3333, x: 6, y: 16 },
		{ x1: -6, y1: 9, x2: -18, y2: 2, x: -30, y: -5 },
		{ x1: -25.3333, y1: -12, x2: -20.6667, y2: -19, x: -16, y: -26 }
	]);

	let fullPath = $derived(
		[
			`M${M.x} ${M.y}`,
			...curves.map((c) => `C${c.x1} ${c.y1}, ${c.x2} ${c.y2}, ${c.x} ${c.y}`)
		].join(' ')
	);

	const alignRemainingPoints = () => {
		const segmentEnd = curves[segmentsNumber - 1]; // point de référence
		const len = curves.length;

		for (let i = segmentsNumber; i < len; i++) {
			const currentPoint = curves[i]; // point courant
			currentPoint.x1 = segmentEnd.x;
			currentPoint.y1 = segmentEnd.y;
			currentPoint.x2 = segmentEnd.x;
			currentPoint.y2 = segmentEnd.y;
			currentPoint.x = segmentEnd.x;
			currentPoint.y = segmentEnd.y;
		}
	};

	const modPath = () => {
		alignRemainingPoints();
	};

	// $inspect(curves[0]);
</script>

<svg
	role="img"
	aria-labelledby="icon-title"
	stroke="#b5ea39"
	stroke-linejoin="round"
	stroke-linecap="round"
	stroke-width="2"
	stroke-opacity="1"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="-50 -50 100 100"
	focusable="false"
	data-icoGlyph="plus"
	class="s-FO5Q4on8ThbD"
>
	<title id="icon-title">title</title>
	<path {@attach modPath} d={fullPath}></path>
</svg>
