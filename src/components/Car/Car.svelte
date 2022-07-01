<script>
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/all';

	import { onMount } from 'svelte';
	import { Object3DInstance, Mesh, MeshInstance } from 'threlte';
	import { useThrelte, useFrame } from 'threlte';
	import {
		carColor,
		entryAnimationRunning,
		pauseAnimation,
		anotherAnimation
	} from '../../store/stores';

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
		ReinhardToneMapping,
		PlaneBufferGeometry
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
	let tl2 = gsap.timeline({});
	let tl3 = gsap.timeline({});

	let mesh = new Meshi();
	let wallMesh = new Meshi();

	const floorMaterial = {
		metalness: 0.8,
		roughness: 0.4,
		color: 0x020202,
		normalMap: textureReal,
		normalScale: new Vector2(1, 1)
	};

	$: checkPause($pauseAnimation);
	// @ts-ignore
	function checkPause(pause) {
		if (pause) tl.pause();
		else tl.resume();
	}

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
				o.name != 'DesireFX_ME_Text_xB' &&
				o.name != 'DesireFX_ME_Tire_left_front' &&
				o.name != 'DesireFX_ME_Tire_left_front01' &&
				o.name != 'DesireFX_ME_Tire_left_front02' &&
				o.name != 'DesireFX_ME_Tire_left_front03'
			)
				o.material = new MeshPhysicalMaterial(carMaterial);

			if (o.name == 'DesireFX_ME_Windows') {
				o.material.transparent = true;
				o.material.opacity = 0.1;
			}

			// if (
			// 	o.name == 'DesireFX_ME_Headlight_front_glass' ||
			// 	o.name == 'DesireFX_ME_Headlight_rear_glass'
			// ) {
			// 	o.material = new MeshStandardMaterial({
			// 		color: '#ffffff',
			// 		emissive: 0xffffff,
			// 		emissiveIntensity: 10
			// 	});
			// }

			if (
				o.name == 'DesireFX_ME_Scion_symbol_front_part1' ||
				o.name == 'DesireFX_ME_Scion_symbol_rear_part1' ||
				o.name == 'DesireFX_ME_Text_xB'
			) {
				o.material = new MeshStandardMaterial({
					color: '#ffffff',
					roughness: 1,
					metalness: 0
				});
			}

			if (
				o.name == 'DesireFX_ME_Tire_left_front' ||
				o.name == 'DesireFX_ME_Tire_left_front01' ||
				o.name == 'DesireFX_ME_Tire_left_front02' ||
				o.name == 'DesireFX_ME_Tire_left_front03'
			) {
				o.material = new MeshStandardMaterial({
					color: '#000000',
					roughness: 0.8,
					metalness: 0.2
				});
			}

			if (
				o.name == 'DesireFX_ME_Rim_Left_Front_part1' ||
				o.name == 'DesireFX_ME_Rim_Left_Front_part04' ||
				o.name == 'DesireFX_ME_Rim_Left_Front_part06' ||
				o.name == 'DesireFX_ME_Rim_Left_Front_part08'
			) {
				o.material = new MeshStandardMaterial({
					color: '#A4A8AF',
					roughness: 0.8,
					metalness: 0.8
				});
			}

			if (o.name == 'DesireFX_ME_Seat') {
				o.material = new MeshPhysicalMaterial({ color: $carColor });
			}
		});
	}

	function registerEntryAnimation() {
		gltf.scene.children[19].material = new MeshStandardMaterial({
			opacity: 0,
			transparent: true,
			color: '#ffffff',
			emissive: '#FFFFCC',
			emissiveIntensity: 10
		});

		gltf.scene.children[17].material = new MeshStandardMaterial({
			opacity: 0,
			transparent: true,
			color: '#ffffff',
			emissive: '#FFFFCC',
			emissiveIntensity: 10
		});

		tl.from($camera.position, {
			x: 29.861027480640256,
			y: -1.739376648254959,
			z: 9.751223381140683,
			duration: 5,
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
				duration: 3,
				ease: 'slow(0.7, 0.7, false)',
				onComplete: () => {
					gsap.to([gltf.scene.children[17].material, gltf.scene.children[19].material], {
						opacity: 1,
						duration: 1,
						ease: 'power1.out',
						onComplete: () => {
							entryAnimationRunning.set(false);
						}
					});
				}
			},
			'-=5'
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
	}

	$: checkAnotherAnimation($anotherAnimation);

	function checkAnotherAnimation(topView) {
		if (!$entryAnimationRunning)
			if (topView) {
				tl2.to($camera.position, {
					x: 6.405749622402716,
					y: 154.60780225324243,
					z: -25.303750792579514,
					duration: 4,
					ease: 'slow(0.7, 0.7, false)'
				});

				tl2.to(
					$camera.rotation,
					{
						x: -1.5707973237433617,
						y: 7.806252873970862e-8,
						z: 3.0634506242981008,
						duration: 3,
						ease: 'slow(0.7, 0.7, false)'
					},
					'-=4'
				);
				tl2.play();
			} else {
				tl3.to($camera.position, {
					x: 0,
					y: 1,
					z: 50,
					duration: 2,
					ease: 'slow(0.7, 0.7, false)'
				});

				tl3.to(
					$camera.rotation,
					{
						x: 0,
						y: 0,
						z: 0,
						duration: 2,
						ease: 'slow(0.7, 0.7, false)'
					},
					'-=2'
				);
				tl3.play();
			}
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

	<Mesh
		bind:wallMesh
		receiveShadow
		position={{ x: 0, y: -10, z: -100 }}
		rotation={{ z: -90 * (Math.PI / 180) }}
		geometry={new PlaneBufferGeometry(10, 10)}
		material={new MeshPhysicalMaterial({
			metalness: 0.8,
			roughness: 0.5,
			color: 0x000000,
			normalScale: new Vector2(1, 1)
		})}
		scale={{ x: 400, y: 300, z: 300 }}
	/>
{/if}
