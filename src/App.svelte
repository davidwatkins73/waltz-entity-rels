<script>
	import EntityRelations from "./EntityRelations.svelte";
</script>

<head>
	<title>Waltz: Explorer</title>
</head>

<main>
	<div style="background: #052960; padding: 1em;">
		<img alt="Waltz banner"
			 height="80px"
			 src="https://waltz.finos.org/site/img/waltz_badge_mono_600px.png">
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
		font-size: 2.5em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>