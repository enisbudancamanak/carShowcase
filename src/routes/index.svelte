<script lang="ts">
	import { onMount } from 'svelte';
	import { carColor, pauseAnimation, anotherAnimation, wireframe } from '../store/stores';

	let carModel;
	onMount(async () => {
		carModel = (await import('../components/Car/CanvasCar.svelte')).default;
	});

	function changeCarColor(color) {
		carColor.set(color);
	}

	function toggleAnimation() {
		pauseAnimation.set(!$pauseAnimation);
		if ($pauseAnimation) document.querySelector('#pauseText').innerHTML = 'play';
		else document.querySelector('#pauseText').innerHTML = 'pause';
	}

	function toggleViewAnimation() {
		anotherAnimation.set(!$anotherAnimation);
	}

	function toggleWireframe() {
		wireframe.set(!$wireframe);
		if ($wireframe) document.querySelector('#wireframeText').innerHTML = 'normal';
		else document.querySelector('#wireframeText').innerHTML = 'wireframe';
	}

	onMount(() => {});
</script>

<div class="fixed z-50 flex flex-col gap-4 right-8 top-8">
	<div class="avatar placeholder">
		<div
			id="pauseText"
			class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#202124] cursor-pointer font-bold text-sm"
			on:click={() => toggleAnimation()}
		>
			pause
		</div>
	</div>

	<div class="avatar placeholder">
		<div
			id="anotherViewText"
			class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#202124] text-center cursor-pointer font-bold text-xs"
			on:click={() => toggleViewAnimation()}
		>
			change view
		</div>
	</div>

	<div class="avatar placeholder">
		<div
			id="wireframeText"
			class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#202124] text-center cursor-pointer font-bold text-[10px]"
			on:click={() => toggleWireframe()}
		>
			wireframe
		</div>
	</div>
</div>

<div class="fixed z-50 flex gap-4 right-8 bottom-8">
	<div class="avatar">
		<div
			class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#0d1116] cursor-pointer"
			on:click={() => changeCarColor('#0d1116')}
		/>
	</div>
	<div class="avatar">
		<div
			class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#A4A8AF] cursor-pointer"
			on:click={() => changeCarColor('#A4A8AF')}
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
			class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#fbe212] cursor-pointer"
			on:click={() => changeCarColor('#fbe212')}
		/>
	</div>
	<div class="avatar">
		<div
			class="w-12 rounded-full ring ring-gray-400 ring-offset-base-100 ring-offset-1 bg-[#da1918] cursor-pointer"
			on:click={() => changeCarColor('#da1918')}
		/>
	</div>
</div>

<div id="content" class="relative w-screen min-h-screen px-4">
	<div class="top-0 left-0 !outline-none !border-none z-0">
		<svelte:component this={carModel} />
	</div>

	<div class="relative z-10 flex justify-center">
		<h1 class="mt-16 text-3xl font-bold text-center text-white lg:text-6xl md:text-5xl font-Scion">
			SCION XB 2003
		</h1>
	</div>
	<!-- 
	<div class="relative z-10 flex">
		<div class="h-screen" />
	</div>

	<div class="relative z-10 flex">
		<div class="h-screen" />
	</div> -->
</div>

<style>
	/* #content {
		background-color: #0a0a0a;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23EA4CD5' stroke-width='0.7' stroke-opacity='0.13' %3E%3Ccircle fill='%230A0A0A' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%230a0a0a' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%230A0A0A' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
	} */
</style>
