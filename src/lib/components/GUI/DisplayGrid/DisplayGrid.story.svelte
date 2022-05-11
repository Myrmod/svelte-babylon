<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import DisplayGrid from '$lib/components/GUI/DisplayGrid/index.svelte'
  import GUI from '$lib/components/GUI/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
</script>

<Canvas>
  <Scene>
    <ArcRotateCamera />
    <GUI>
      <DisplayGrid width="500px" height="500px" />
    </GUI>
  </Scene>
</Canvas>
