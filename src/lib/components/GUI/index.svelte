<script lang="ts">
  import { Texture } from '@babylonjs/core/Materials/Textures/texture.js'
  import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js'
  import { onDestroy, onMount, setContext } from 'svelte'

  const scene = getContext<Writable<Scene>>('scene')

  export let name: string = 'GUI'
  export let foreground = true
  export let sampling: Parameters<typeof AdvancedDynamicTexture.CreateFullscreenUI>[3] =
    Texture.BILINEAR_SAMPLINGMODE
  export let adaptiveScaling = false

  export const gui = AdvancedDynamicTexture.CreateFullscreenUI(
    name,
    foreground,
    $scene,
    sampling,
    adaptiveScaling,
  )

  setContext('gui', gui)

  onMount(() => {
    try {
      if ($root.gui[name]) {
        throw new Error(`A GUI names "${name}" already exists`)
      }

      $root.gui[name] = {
        self: gui,
        controls: {},
      }
      $scene.render()
    } catch (error) {
      console.error(error)
    }
  })

  onDestroy(() => {
    gui.dispose()
    delete $root.objects[name]
  })

  $: if ($root.gui[name]?.self?.name === name) {
    $scene.render()
  }
</script>

{#if $root.gui[name]?.self?.name === name}
  <slot />
{/if}
