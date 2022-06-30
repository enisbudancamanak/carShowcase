<script>
	import '../app.css';
	import { carModel } from '../store/stores';
	import { useGltf } from 'threlte/extras';
	const { gltf } = useGltf('src/assets/3DModels/ScionXB/ScionXB.glb');

	$: if ($gltf) {
		carModel.set($gltf);
	}
</script>

{#if $gltf}
	<slot />
{/if}
