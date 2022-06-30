<script>
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/all';

	import { onMount } from 'svelte';
	import { Object3DInstance, Mesh, MeshInstance } from 'threlte';
	import { useThrelte, useFrame } from 'threlte';
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

	import {
		CircleBufferGeometry,
		MeshStandardMaterial,
		DoubleSide,
		MeshPhysicalMaterial,
		Vector2,
		CanvasTexture,
		Mesh as Meshi,
		RepeatWrapping,
		EquirectangularReflectionMapping,
		sRGBEncoding,
		ACESFilmicToneMapping,
		SphereGeometry,
		ReinhardToneMapping
	} from 'three';

	const { renderer, size, camera, scene } = useThrelte();

	onMount(async () => {
		renderer.outputEncoding = sRGBEncoding;
		renderer.toneMapping = ReinhardToneMapping;
		renderer.toneMappingExposure = 0.9;

		const loader = new RGBELoader();
		loader.load('src/assets/hdrs/satara_night_no_lamps_4k.hdr', (texture) => {
			texture.mapping = EquirectangularReflectionMapping;
			// scene.background = texture;
			scene.environment = texture;
		});
		// Resize Canvas
		// window.addEventListener('resize', function () {
		// 	$camera.aspect = window.innerWidth / window.innerHeight;
		// 	$camera.updateProjectionMatrix();
		// 	renderer.render(scene, $camera);
		// });
	});
</script>
