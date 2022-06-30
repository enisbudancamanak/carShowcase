<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { carModel } from '../store/stores';
	import { useGltf } from 'threlte/extras';
	const { gltf } = useGltf('src/assets/3DModels/ScionXB/ScionXB.glb');

	let finishedLoading = false;

	// @ts-ignore
	let t1;

	$: if ($gltf) {
		carModel.set($gltf);

		setTimeout(function () {
			t1.play();
		}, 1000);
	}

	onMount(() => {
		t1 = gsap.timeline({ paused: true, defaults: { duration: 1 } });

		t1.to(document.getElementById('loadingScreen'), {
			opacity: 0
		});

		t1.to(document.getElementById('slot'), {
			opacity: 1,
			onStart: () => {
				finishedLoading = true;
			}
		});
	});
</script>

<svelte:head>
	<title>Scion XB 2003 Showcase</title>
</svelte:head>

<div id="loadingScreen">
	{#if !finishedLoading}
		<div class="flex items-center justify-center w-screen h-screen bg-black">
			<img src="src/assets/1200px-Logo_Scion.svg.png" alt="" srcset="" />
		</div>
	{/if}
</div>
<div id="slot" class="opacity-0">
	{#if finishedLoading}
		<slot />
	{/if}
</div>
