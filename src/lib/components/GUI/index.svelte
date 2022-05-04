<script lang="ts">
  import { createReactiveContext } from '$lib/utils/createReactiveContext'
  import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
  import type { Scene } from '@babylonjs/core/scene.js'
  import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
  import { getContext, onDestroy } from 'svelte'
  import type { Writable } from 'svelte/types/runtime/store'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'GUI'
  export let foreground = true
  export let sampling: Parameters<typeof AdvancedDynamicTexture.CreateFullscreenUI>[3] =
    Texture.BILINEAR_SAMPLINGMODE
  export let adaptiveScaling = false

  export const gui = createReactiveContext(
    'gui',
    AdvancedDynamicTexture.CreateFullscreenUI(name, foreground, $scene, sampling, adaptiveScaling),
  )

  onDestroy(() => {
    $gui.dispose()
  })
</script>

{#if $gui}
  <slot />
{/if}
