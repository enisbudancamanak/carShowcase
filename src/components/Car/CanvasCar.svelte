<script lang="ts">
	// import { useGltf } from 'threlte/extras';
	// const { gltf } = useGltf('src/assets/3DModels/Wagenfeldlampe/wagenfeldlampe_24.glb');

	import { PerspectiveCamera } from 'three';
	import Car from './Car.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import Background from './Background.svelte';
	import { carColor } from '../../store/stores';

	import {
		Canvas,
		DirectionalLight,
		HemisphereLight,
		CameraInstance,
		AmbientLight,
		OrbitControls,
		Mesh,
		SpotLight
	} from 'threlte';

	onMount(() => {});

	let cameraVariable = new PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		0.001,
		1000.0
	);
</script>

<div id="content" class="fixed top-0 left-0 w-screen h-screen">
	<Canvas>
		<!-- rotation={{ x: DEG2RAD * 0.5, y: DEG2RAD * -43.47, z: DEG2RAD * 0.54 }} -->
		<CameraInstance
			camera={cameraVariable}
			useCamera={true}
			viewportAware={true}
			position={{ x: 0, y: 3, z: 50 }}
		>
			<OrbitControls autoRotate={false} enableZoom={true} />
		</CameraInstance>

		<!-- <AmbientLight color={0xffffff} intensity={1} /> -->

		<HemisphereLight skyColor={0xffeeb1} groundColor={0x080820} intensity={4} />

		<SpotLight
			shadow
			position={{ x: 0, y: -20, z: 50 }}
			color={'#ffffff'}
			target={{ x: 0, y: -10, z: -100 }}
			intensity={1}
		/>

		<SpotLight
			shadow
			position={{ x: 0, y: 30, z: 50 }}
			color={$carColor}
			target={{ x: 0, y: -10, z: -100 }}
			intensity={1}
		/>

		<SpotLight
			shadow
			position={{ x: 0, y: 40, z: -10 }}
			color={$carColor}
			target={{ x: 0, y: -10, z: -10 }}
			intensity={4}
		/>

		<Car />
		<Background />
	</Canvas>
</div>
