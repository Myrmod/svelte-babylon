<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client'
  import { ControlsAddon } from '@vitebook/client/addons'
  import type * as BABYLON from 'babylonjs'
  import 'babylonjs-loaders'
  import { Custom } from 'svelte-babylon'
  import DescriptionAddon from 'vitebook/Addons/DescriptionAddon.svelte'
  import FirstPersonWorld from './index.svelte'

  export const __pageMeta: PageMeta = {
    title: 'First person world',
    description: '',
  }
</script>

<script lang="ts">
  let meshes: BABYLON.ISceneLoaderAsyncResult['meshes']
  let showCustom = false
</script>

<FirstPersonWorld>
  {#if showCustom}
    <Custom
      name="Level"
      rootUrl="/assets/models/"
      fileName="Prototype_Level.glb"
      bind:meshes
      receiveShadows
      checkCollisions
      slot="models"
    />
  {/if}
</FirstPersonWorld>

<ControlsAddon>
  <label style="margin-top: 24px;display:block;">
    show custom <input type="checkbox" bind:checked={showCustom} />
  </label>
</ControlsAddon>

<DescriptionAddon>
  <h1>Issues</h1>
  <ul>
    <li>
      <p>
        We made the cameras ellipsoid very small so that we can walk up the ramp. That's not how it
        is supposed to be though. So we're creating a physics based approach.
      </p>
    </li>
    <li>
      <p>
        For some reason it is not possible to scale an element with collision. This causes the
        Camera to slowly fall through while moving.
      </p>
    </li>
  </ul>
</DescriptionAddon>
