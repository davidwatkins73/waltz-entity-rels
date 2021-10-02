<script>
	import EntityRelations from "./EntityRelations.svelte";

	export let name;
</script>

<main>
	<div style="background: #0f2952; padding: 2em;">
		<img  src="https://waltz.finos.org/site/img/waltz_badge_mono_600px.png">
	</div>
	<h1>Entity / Use Case Explorer</h1>
</main>

<EntityRelations/>


<p>
	The source (and data) is available on <a href="https://github.com/davidwatkins73/waltz-entity-rels">GitHub</a>.
</p>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>