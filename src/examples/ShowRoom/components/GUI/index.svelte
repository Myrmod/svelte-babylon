<script lang="ts">
	import { Animation } from '@babylonjs/core/Animations/animation.js'
	import type { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js'
	import type { Camera } from '@babylonjs/core/Cameras/camera'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
	import type { Mesh } from '@babylonjs/core/Meshes/mesh.js'
	import type { Scene } from '@babylonjs/core/scene.js'
	import { getContext } from 'svelte'
	import { get, type Writable , writable} from 'svelte/store'

	const buttons = [
		{ name: 'Platform1Button', text: 'go to platform 1' },
		{ name: 'Platform2Button', text: 'go to platform 2' },
		{ name: 'Platform3Button', text: 'go to platform 3' },
		{ name: 'Platform4Button', text: 'go to platform 4' },
	]

	export let screens: Array<Writable<Mesh>> = []
	export let playVideo: () => void
	export let useFreeCamera: () => void

	const scene = getContext<Writable<Scene>>(writable('scene'))

	async function handleClick(id: number) {
		if (id === -1) {
			$scene.beginDirectAnimation(
				$scene.activeCamera,
				[
					animMove($scene.activeCamera, new Vector3(0, 50, 0)),
					animLookAt($scene.activeCamera as ArcRotateCamera, Vector3.Zero()),
				],
				0,
				120,
				false,
				0.5,
				() => {
					;($scene.activeCamera as ArcRotateCamera).setTarget(Vector3.Zero())
				},
			)

			return
		}

		const mesh = screens[id]
		const platform = get(mesh).parent as Mesh
		const vector = get(mesh).forward.multiplyByFloats(-1, -1, -1)
		const origin = new Vector3(platform.position.x, get(mesh).position.y, platform.position.z)
		const newPosition = origin.add(vector.multiplyByFloats(5, 1, 5))

		$scene.beginDirectAnimation(
			$scene.activeCamera,
			[
				animMove($scene.activeCamera, newPosition),
				animLookAt($scene.activeCamera as ArcRotateCamera, origin),
			],
			0,
			120,
			false,
			0.5,
			() => {
				;($scene.activeCamera as ArcRotateCamera).setTarget(origin)
			},
		)

		function animMove(camera: Camera, pos: Vector3) {
			const anim = new Animation('movecam', 'position', 60, Animation.ANIMATIONTYPE_VECTOR3)
			anim.setKeys([
				{ frame: 0, value: camera.position.clone() },
				{ frame: 60, value: pos },
			])

			return anim
		}

		function animLookAt(camera: ArcRotateCamera, lookAt: Vector3) {
			const anim = new Animation('lookcam', 'target', 60, Animation.ANIMATIONTYPE_VECTOR3)
			anim.setKeys([
				{ frame: 0, value: camera.target.clone() },
				{ frame: 60, value: lookAt },
			])

			return anim
		}
	}
</script>

<fieldset>
	{#each buttons as button, index}
		<button on:click={() => handleClick(index)}>{button.text}</button>
	{/each}
	<button on:click={() => handleClick(-1)}>reset</button>
	<button on:click={playVideo}>play video</button>
	<button on:click={useFreeCamera}>use 1st Person</button>
</fieldset>

<style>
	fieldset {
		position: absolute;
		top: 0;
		left: 0;
		flex-direction: column;
		border: none;
		padding: 0;
	}
	button {
		display: block;
		height: 40px;
		cursor: pointer;
		border-radius: 0;
		border: none;
		background-color: #333c83;
		color: #fff;
		width: 100%;
	}
	button:hover,
	button:focus {
		background-color: #f24a72;
		outline: none;
	}
</style>
