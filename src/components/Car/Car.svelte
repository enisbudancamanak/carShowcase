<script>
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/all';

	import { onMount } from 'svelte';
	import { Object3DInstance, Mesh, MeshInstance } from 'threlte';
	import { useThrelte, useFrame } from 'threlte';
	import { carColor, entryAnimationRunning } from '../../store/stores';

	import {
		CircleBufferGeometry,
		MeshStandardMaterial,
		DoubleSide,
		MeshPhysicalMaterial,
		Vector2,
		CanvasTexture,
		Mesh as Meshi,
		RepeatWrapping,
		TextureLoader,
		ReinhardToneMapping
	} from 'three';

	import { carModel } from '../../store/stores.js';
	import { FlakesTexture } from './FlakesTexture';

	//new TextureLoader().load('src/assets/textures/aerial_asphalt_01_diff_4k.jpg')
	let textureReal = new CanvasTexture(new FlakesTexture());
	textureReal.wrapS = RepeatWrapping;
	textureReal.wrapT = RepeatWrapping;
	textureReal.repeat.x = 1;
	textureReal.repeat.y = 1;

	const { renderer, size, camera, scene } = useThrelte();

	const gltf = $carModel;
	let tl = gsap.timeline({});

	let mesh = new Meshi();

	const floorMaterial = {
		metalness: 0.8,
		roughness: 0.4,
		color: 0x020202,
		normalMap: textureReal,
		normalScale: new Vector2(1, 1)
	};

	$: checkColorChange($carColor);

	// @ts-ignore
	function checkColorChange(color) {
		carMaterial.color = color;
		renderer.render(scene, $camera);
	}

	const carMaterial = {
		metalness: 0.9,
		// wireframe: true,
		roughness: 0.2,
		color: $carColor,
		// normalMap: textureReal,
		normalScale: new Vector2(0.15, 0.15)
	};

	onMount(async () => {
		renderer.setClearColor(0x000000, 1);
		// Resize Canvas
		window.addEventListener('resize', function () {
			$camera.aspect = window.innerWidth / window.innerHeight;
			$camera.updateProjectionMatrix();
			renderer.render(scene, $camera);

			// console.log($camera.position);
			// console.log($camera.rotation);
		});

		$camera.setViewOffset(
			window.innerWidth * 1,
			window.innerHeight,
			window.innerWidth * 0,
			-150,
			window.innerWidth,
			window.innerHeight
		);

		// entryAnimation
		registerEntryAnimation();
	});

	$: if ($carModel) {
		gltf.scene.traverse((o) => {
			if (
				o.isMesh &&
				o.name != 'DesireFX_ME_Windows' &&
				o.name != 'DesireFX_ME_Headlight_front_glass' &&
				o.name != 'DesireFX_ME_Scion_symbol_front_part1' &&
				o.name != 'DesireFX_ME_Scion_symbol_rear_part1' &&
				o.name != 'DesireFX_ME_Headlight_rear_glass' &&
				o.name != 'DesireFX_ME_Seat' &&
				o.name != 'DesireFX_ME_Text_xB'
			)
				o.material = new MeshPhysicalMaterial(carMaterial);

			if (o.name == 'DesireFX_ME_Windows') {
				o.material.transparent = true;
				o.material.opacity = 0.1;
			}

			if (
				o.name == 'DesireFX_ME_Headlight_front_glass' &&
				o.name == 'DesireFX_ME_Headlight_rear_glass' &&
				o.name == 'DesireFX_ME_Scion_symbol_front_part1' &&
				o.name == 'DesireFX_ME_Scion_symbol_rear_part1' &&
				o.name == 'DesireFX_ME_Text_xB'
			) {
				o.material = new MeshStandardMaterial({ color: '#ffffff', roughness: 1, metalness: 0 });
			}

			if (o.name == 'DesireFX_ME_Seat') {
				o.material = new MeshPhysicalMaterial({ color: $carColor });
			}
		});
	}

	function registerEntryAnimation() {
		gltf.scene.children[19].material.opacity = 0;
		gltf.scene.children[19].material.transparent = true;
		tl.from($camera.position, {
			x: 29.861027480640256,
			y: -1.739376648254959,
			z: 9.751223381140683,
			duration: 3,
			ease: 'slow(0.7, 0.7, false)',
			onStart: () => {
				entryAnimationRunning.set(true);
			}
		});

		tl.from(
			$camera.rotation,
			{
				x: -0.22700967759851307,
				y: 0.9721812485302048,
				z: 0.1885588477362553,
				duration: 2.5,
				ease: 'slow(0.7, 0.7, false)',
				onComplete: () => {
					gsap.to(gltf.scene.children[19].material, {
						opacity: 1,
						duration: 1,
						ease: 'power1.out',
						onComplete: () => {
							entryAnimationRunning.set(false);
						}
					});
				}
			},
			'-=3'
		);

		tl.to($carModel.scene.rotation, {
			y: Math.PI * (2.3 * 100),
			repeat: -1,
			// yoyo: true
			ease: 'Circ.out',
			duration: 2000
		});

		tl.to(
			mesh.rotation,
			{
				z: Math.PI * (2.3 * 100),
				repeat: -1,
				// yoyo: true
				ease: 'Circ.out',
				duration: 2000
			},
			'-=2000'
		);

		tl.to(gltf.scene.children[19].material, {
			opacity: 1,
			duration: 1,
			ease: 'power1.out',
			onComplete: () => {
				entryAnimationRunning.set(false);
			}
		});

		tl.play();

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
		receiveShadow
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
		rotation={{ x: -90 * (Math.PI / 180) }}
		geometry={new CircleBufferGeometry(1, 72)}
		material={new MeshPhysicalMaterial(floorMaterial)}
		scale={{ x: 50, y: 50, z: 50 }}
	/>
{/if}
