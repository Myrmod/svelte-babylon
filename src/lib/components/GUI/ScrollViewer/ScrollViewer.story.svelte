<script lang="ts">
  import ArcRotateCamera from '$lib/components/Cameras/ArcRotateCamera/index.svelte'
  import Canvas from '$lib/components/Canvas/index.svelte'
  import Image from '$lib/components/GUI/Image/index.svelte'
  import GUI from '$lib/components/GUI/index.svelte'
  import ScrollViewer from '$lib/components/GUI/ScrollViewer/index.svelte'
  import Scene from '$lib/components/Scene/index.svelte'
</script>

<Canvas>
  <Scene>
    <ArcRotateCamera />
    <GUI>
      <ScrollViewer height={0.4} width={0.4}>
        <Image src="/svelte-babylon-logo.png" autoScale />
      </ScrollViewer>
    </GUI>
  </Scene>
</Canvas>
