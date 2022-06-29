<script>
	import { onMount } from 'svelte';

	let carModel;
	onMount(async () => {
		carModel = (await import('../components/Car/CanvasCar.svelte')).default;
	});

	onMount(() => {});
</script>

<div class="top-0 left-0 !outline-none !border-none z-0">
	<svelte:component this={carModel} />
</div>

<style>
	/* #content {
		background-color: #0a0a0a;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23EA4CD5' stroke-width='0.7' stroke-opacity='0.13' %3E%3Ccircle fill='%230A0A0A' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230A0A0A' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
	} */
</style>
