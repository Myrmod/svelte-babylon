<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import * as BABYLON from 'babylonjs'

  const buttons = [
    { name: 'Platform1Button', text: 'go to platform 1' },
    { name: 'Platform2Button', text: 'go to platform 2' },
    { name: 'Platform3Button', text: 'go to platform 3' },
    { name: 'Platform4Button', text: 'go to platform 4' },
  ]

  export let screens: Array<{ self: BABYLON.Mesh }> = []

  const root = getRoot()

  function handleClick(id: number) {
    if (id === -1) {
      ;(root.scene.activeCamera as BABYLON.ArcRotateCamera).setTarget(new BABYLON.Vector3(0, 10, 0))

      return
    }

    const mesh = screens[id].self
    const platform = mesh.parent as BABYLON.Mesh
    const vector = mesh.forward
    const origin = platform.position
    const newPosition = origin.add(vector.multiplyByFloats(1, 1, 1))

    console.log(mesh.name)
    ;(root.scene.activeCamera as BABYLON.ArcRotateCamera).setTarget(mesh.position)
    root.scene.beginDirectAnimation(
      root.scene.activeCamera,
      [
        animMove(root.scene.activeCamera, newPosition),
        animLookAt(root.scene.activeCamera as BABYLON.ArcRotateCamera, mesh.position),
      ],
      0,
      120,
      false,
      0.5,
    )

    function animMove(camera: BABYLON.Camera, pos: BABYLON.Vector3) {
      const anim = new BABYLON.Animation(
        'movecam',
        'position',
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      )
      anim.setKeys([
        { frame: 0, value: camera.position.clone() },
        { frame: 60, value: pos },
      ])

      return anim
    }

    function animLookAt(camera: BABYLON.ArcRotateCamera, lookAt: BABYLON.Vector3) {
      const anim = new BABYLON.Animation(
        'lookcam',
        'target',
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      )
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
  <button on:click={() => handleClick(-1)}>Reset</button>
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
