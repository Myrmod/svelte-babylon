<script lang="ts">
	import type { ActionEvent } from '@babylonjs/core/Actions/actionEvent'
	import type { ArcRotateCamera as ACamera } from '@babylonjs/core/Cameras/arcRotateCamera.js'
	import type { FreeCamera as FCamera } from '@babylonjs/core/Cameras/freeCamera.js'
	import type { VideoTexture as VTexture } from '@babylonjs/core/Materials/Textures/videoTexture.js'
	import { Color3 } from '@babylonjs/core/Maths/math.color'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Scene as BScene } from '@babylonjs/core/scene.js'
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import FreeCamera from 'svelte-babylon/components/Cameras/FreeCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
	import Custom from 'svelte-babylon/components/Objects/Custom/index.svelte'
	import Disc from 'svelte-babylon/components/Objects/Disc/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import StandardTexture from 'svelte-babylon/components/Textures/StandardTexture/index.svelte'
	import VideoTexture from 'svelte-babylon/components/Textures/VideoTexture/index.svelte'
	import Skybox from 'svelte-babylon/prebuilds/Skybox/index.svelte'
	import TextPlane from 'svelte-babylon/prebuilds/TextPlane/index.svelte'
	import type { Writable } from 'svelte/store'
	import { get, writable } from 'svelte/store'
	import GUI from './components/GUI/index.svelte'
	import Platform from './components/Platform/index.svelte'

	const platforms: Array<Writable<Mesh>> = []
	let screens: Array<Writable<Mesh>> = [writable(null)]

	let arcCamera: Writable<ACamera>
	let freeCamera: Writable<FCamera>
	let useFreeCamera = false
	let controlsAdded = false
	$: if (!controlsAdded && freeCamera) {
		$freeCamera.keysUp.push(87) // w
		$freeCamera.keysLeft.push(65) // a
		$freeCamera.keysDown.push(83) // s
		$freeCamera.keysRight.push(68) // d
		controlsAdded = true
	}

	let scene: Writable<BScene>

	let customMesh: Writable<Mesh>
	$: if ($customMesh && $scene) {
		$scene.onBeforeRenderObservable.add(() => {
			if ($scene.activeCamera) {
				$customMesh.rotate(new Vector3(1, 1, 1), 0.005)
			}
		})
	}

	let shadowObjects: Array<Writable<Mesh>>
	$: if (customMesh && screens?.length && platforms?.length) {
		shadowObjects = [...platforms, ...screens].filter(v => v).concat(customMesh)
	}

	$: {
		screens[0] = customMesh
		screens = screens
	}

	let rotateToFacePickedFace: (
		e: ActionEvent,
		radius?: number,
		fps?: number,
		totalFrames?: number,
		onAnimationEnd?: any,
	) => Promise<void>

	let videoTexture: Writable<VTexture>
	let playVideo = false
	$: if (playVideo && $videoTexture) {
		$videoTexture.video.play()
	} else if ($videoTexture) {
		$videoTexture.video.pause()
	}
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene enablePointerLockOnClick={useFreeCamera} collisionsEnabled animationsEnabled bind:scene>
		<HemisphericLight intensity={1} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(20, 60, 20)}
			castShadowOf={shadowObjects?.map(v => get(v))}
		/>
		{#if useFreeCamera}
			<FreeCamera
				position={new Vector3(0, 2, 0)}
				speed={0.2}
				applyGravity
				checkCollisions
				ellipsoid={new Vector3(0.01, 1, 0.01)}
				target={new Vector3(4, 2, 4)}
				bind:camera={freeCamera}
			/>
		{:else}
			<ArcRotateCamera
				bind:camera={arcCamera}
				target={new Vector3(0, 10, 0)}
				bind:rotateToFacePickedFace
				radius={50}
				beta={0}
			/>
		{/if}
		<Platform
			bind:platform={platforms[0]}
			position={new Vector3(10, 0.5, 10)}
			name="Platform1 Object"
		>
			<Custom
				url="/assets/models/logo.glb"
				scaling={new Vector3(7, 7, 7)}
				position={new Vector3(0, 2, 0)}
				receiveShadows
				bind:object={customMesh}
			/>
		</Platform>
		<!-- Image on a screen -->
		<Platform
			bind:platform={platforms[1]}
			bind:screen={screens[1]}
			position={new Vector3(-10, 0.5, 10)}
			rotation={270}
			name="Platform2 Image"
		>
			<StandardMaterial slot="screen-material">
				<StandardTexture url="/assets/images/svelte-babylon.png" textureTarget="diffuseTexture" />
				<StandardTexture url="/assets/images/svelte-babylon.png" textureTarget="specularTexture" />
			</StandardMaterial>
		</Platform>
		<!-- Text -->
		<Platform
			bind:platform={platforms[2]}
			bind:screen={screens[2]}
			position={new Vector3(-10, 0.5, -10)}
			rotation={180}
			name="Platform3 Text"
		>
			<TextPlane
				slot="screen"
				text="TextPlane"
				planeOptions={{ width: 16 / 5.2, height: 9 / 5.2 }}
				backgroundColor={'#ffffff'}
				color={'#000000'}
				fontSizeMultiplier={1}
				sizeMultiplier={60}
				position={new Vector3(0, 0, -0.13)}
				checkCollisions
			/>
		</Platform>
		<!-- Video -->
		<Platform
			bind:platform={platforms[3]}
			bind:screen={screens[3]}
			position={new Vector3(10, 0.5, -10)}
			rotation={90}
			name="Platform4 Video"
		>
			<StandardMaterial
				roughness={1}
				emissiveColor={Color3.White()}
				slot="screen-material"
				specularColor={Color3.Black()}
			>
				<VideoTexture
					bind:texture={videoTexture}
					src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
				/>
			</StandardMaterial>
		</Platform>
		<!-- Base platform -->
		<Disc
			checkCollisions
			options={{ radius: 25 }}
			rotation={new Vector3(Math.PI / 2, 0, 0)}
			receiveShadows
		/>
		<Skybox rootUrl="/assets/textures/skybox/sky" />
		{#if screens.length && !useFreeCamera}
			<GUI
				{screens}
				playVideo={() => (playVideo = !playVideo)}
				useFreeCamera={() => (useFreeCamera = !useFreeCamera)}
			/>
		{/if}
	</Scene>
</Canvas>
