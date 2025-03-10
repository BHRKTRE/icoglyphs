<script>
	let { minSectionHeight } = $props();
</script>

<section style="min-height:{minSectionHeight}" id="hero-section">
	<div class="hero-text-container">
		<h1>Open-Source Ideographic Icon Library</h1>
		<p>
			Designed for developers, designers, and everyone else, IcoGlyphs aims to provide a universal
			and intuitive visual language. Use it as icons or in any form of communication, making it
			accessible to all, regardless of culture, age, or education. <br />
			Free and open-source, licensed under the GPL. // "icoGlyphs: Unifying Communication Through Visual
			Language" "Join the icoGlyphers in Crafting the Future of Communication"
		</p>
	</div>

	<!--Sticky button ? -->
	<button>Discover the library</button>
</section>

<style>
	button {
		background: #477bbe;
	}

	#hero-section {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
