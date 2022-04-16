<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { Texture } from '@babylonjs/core/Materials/Textures/texture'
  import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture'
  import { onDestroy, onMount, setContext } from 'svelte'

  const root = getRoot()

  export let name: string = 'GUI'
  export let foreground = true
  export let sampling: Parameters<typeof AdvancedDynamicTexture.CreateFullscreenUI>[3] =
    Texture.BILINEAR_SAMPLINGMODE
  export let adaptiveScaling = false

  export const gui = AdvancedDynamicTexture.CreateFullscreenUI(
    name,
    foreground,
    root.scene,
    sampling,
    adaptiveScaling,
  )

  setContext('gui', gui)

  onMount(() => {
    try {
      if (root.gui[name]) {
        throw new Error(`A GUI names "${name}" already exists`)
      }

      root.gui[name] = {
        self: gui,
        controls: {},
      }
      root.scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    gui.dispose()
    delete root.objects[name]
  })

  $: if (root.gui[name]?.self?.name === name) {
    root.scene.render()
  }
</script>

{#if root.gui[name]?.self?.name === name}
  <slot />
{/if}
