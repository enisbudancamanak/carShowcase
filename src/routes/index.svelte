<script lang="ts">
	import { onMount } from 'svelte';
	import { carColor, entryAnimationRunning } from '../store/stores';

	let carModel;
	onMount(async () => {
		carModel = (await import('../components/Car/CanvasCar.svelte')).default;
	});

	function changeCarColor(color) {
		carColor.set(color);
	}

	onMount(() => {});
</script>

<div id="content" class="relative w-screen min-h-screen px-4">
	<div class="top-0 left-0 !outline-none !border-none z-0">
		<svelte:component this={carModel} />
	</div>

	<div class="relative z-10 flex justify-center">
		<h1 class="mt-16 text-white text-7xl font-Scion">SCION</h1>
	</div>

	<div class="absolute flex gap-4 right-8 bottom-8">
		<div class="avatar">
			<div
				class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#202124] cursor-pointer"
				on:click={() => changeCarColor('#202124')}
			/>
		</div>
		<div class="avatar">
			<div
				class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#ff03ed] cursor-pointer"
				on:click={() => changeCarColor('#ff03ed')}
			/>
		</div>
		<div class="avatar">
			<div
				class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#ffc91f] cursor-pointer"
				on:click={() => changeCarColor('#ffc91f')}
			/>
		</div>
		<div class="avatar">
			<div
				class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#da1918] cursor-pointer"
				on:click={() => changeCarColor('#da1918')}
			/>
		</div>
	</div>
</div>

<style>
	/* #content {
		background-color: #0a0a0a;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23EA4CD5' stroke-width='0.7' stroke-opacity='0.13' %3E%3Ccircle fill='%230A0A0A' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230A0A0A' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
	} */
</style>
