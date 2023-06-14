<script lang="ts">
	import { browser } from '$app/environment'
	import type { InstancedMesh, Mesh } from '@babylonjs/core'
	import '@babylonjs/core/Meshes/instancedMesh.js'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/types/runtime/store'

	const object = getContext<Writable<Mesh>>('object')
	export let number = 1
	export let onCreated: (instance: InstancedMesh, index: number) => void = undefined
	export let instances: Array<InstancedMesh> = []

	$: if ($object && number && browser) {
		for (let i = 0; i < number; i++) {
			instances[i] = $object.createInstance(`${$object.name}-${i}`)
			onCreated(instances[i], i)
		}
	}
</script>
