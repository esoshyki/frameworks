<script>
	import NewsList from "./components/NewsList.svelte";

	$: value = 1;
	export const name = 'huy';

	export const increase = () => {
		value ++;
	}
</script>

<main>
	<h1>News</h1>
	<NewsList />
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;

	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 1em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>