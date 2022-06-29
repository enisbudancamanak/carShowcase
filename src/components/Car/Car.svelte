<script>
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/all';

	import { onMount } from 'svelte';
	import { Object3DInstance, Mesh, MeshInstance } from 'threlte';
	import { useThrelte, useFrame } from 'threlte';
	import { FlakesTexture } from './FlakesTexture.js';

	import {
		CircleBufferGeometry,
		MeshStandardMaterial,
		DoubleSide,
		MeshPhysicalMaterial,
		Vector2,
		CanvasTexture,
		Mesh as Meshi,
		RepeatWrapping
	} from 'three';

	import { carModel } from '../../store/stores.js';

	let textureReal = new CanvasTexture(new FlakesTexture());
	textureReal.wrapS = RepeatWrapping;
	textureReal.wrapT = RepeatWrapping;
	textureReal.repeat.x = 10;
	textureReal.repeat.y = 6;

	const { renderer, size, camera, scene } = useThrelte();

	const gltf = $carModel;
	let animationFinished = false;
	let rotation = 1;

	let mesh = new Meshi();

	const floorMaterial = {
		clearCoat: 1.0,
		clearcoatRoughness: 0.1,
		metalness: 0.9,
		roughness: 0.5,
		color: 0x161616,
		normalMap: textureReal,
		normalScale: new Vector2(0.15, 0.15)
	};

	onMount(async () => {
		renderer.setClearColor(0x000000, 1);

		// Resize Canvas
		window.addEventListener('resize', function () {
			$camera.aspect = window.innerWidth / window.innerHeight;
			$camera.updateProjectionMatrix();
			renderer.render(scene, $camera);
		});

		// $camera.setViewOffset(
		// 	window.innerWidth * 1,
		// 	window.innerHeight,
		// 	window.innerWidth * 0.3,
		// 	-120,
		// 	window.innerWidth,
		// 	window.innerHeight
		// );
	});

	$: if ($carModel) {
		// registerScrollAnimation();
		gsap.to($carModel.scene.rotation, {
			y: Math.PI * (2.3 * 100),
			repeat: -1,
			// yoyo: true
			ease: 'Circ.out',
			duration: 1000
		});

		gsap.to(mesh.rotation, {
			z: Math.PI * (2.3 * 100),
			repeat: -1,
			// yoyo: true
			ease: 'Circ.out',
			duration: 1000
		});

		// useFrame(() => {
		// 	$carModel.scene.rotation.y += 0.00001;
		// });
	}

	// GSAP ScrollTrigger
	function registerScrollAnimation() {
		gsap.registerPlugin(ScrollTrigger);

		gsap.to(gltf.scene.scale, {
			x: 1,
			y: 1,
			z: 1,
			duration: 1.2,
			ease: 'Back.easeOut'
		});

		gsap.to(gltf.scene.rotation, {
			x: -0.08,
			y: 0,
			z: 0,
			duration: 1.8,
			ease: 'Back.easeOut'
		});

		gsap.to(gltf.scene.position, {
			x: -0.5,
			y: -1.5,
			z: 0,
			duration: 1.8,
			ease: 'Back.easeOut',
			onComplete: () => {
				animationFinished = true;
			}
		});

		gsap.from(gltf.scene.position, {
			scrollTrigger: {
				trigger: '#content',
				start: 'top top',
				scrub: true,
				toggleActions: 'restart pause resume pause'
			},
			y: -1.5
		});

		gsap.from(gltf.scene.rotation, {
			scrollTrigger: {
				trigger: '#content',
				start: 'top top',
				scrub: true,
				toggleActions: 'restart pause resume pause'
			},
			x: -0.08
		});

		gsap.to(gltf.scene.rotation, {
			scrollTrigger: {
				trigger: '#content',
				start: 'top top',
				end: 'bottom top',
				scrub: true,
				toggleActions: 'restart pause resume pause'
			},
			y: Math.PI
		});
	}
</script>

{#if gltf}
	<Object3DInstance
		castShadow
		object={gltf.scene}
		position={{ x: 0, y: -10, z: -10 }}
		rotation={{ x: 0, y: 1, z: 0 }}
		scale={{ x: 0.1, y: 0.1, z: 0.1 }}
	/>

	<!-- Floor -->
	<Mesh
		bind:mesh
		receiveShadow
		position={{ x: 0, y: -10, z: -10 }}
		rotation={{ x: -90 * (Math.PI / 180), z: rotation }}
		geometry={new CircleBufferGeometry(1, 72)}
		material={new MeshPhysicalMaterial(floorMaterial)}
		scale={{ x: 50, y: 50, z: 50 }}
	/>
{/if}

<!-- <Object3DInstance bind:object position={{ z: -5, y: -3.2, x: -5 }} /> -->
