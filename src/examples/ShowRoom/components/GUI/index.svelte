<script lang="ts">
  import { getRoot } from '$lib/utils/context'
  import { Animation } from '@babylonjs/core/Animations/animation'
  import type { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
  import type { Camera } from '@babylonjs/core/Cameras/camera'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh'

  const buttons = [
    { name: 'Platform1Button', text: 'go to platform 1' },
    { name: 'Platform2Button', text: 'go to platform 2' },
    { name: 'Platform3Button', text: 'go to platform 3' },
    { name: 'Platform4Button', text: 'go to platform 4' },
  ]

  export let screens: Array<{ self: Mesh }> = []

  const root = getRoot()

  function handleClick(id: number) {
    if (id === -1) {
      root.scene.beginDirectAnimation(
        root.scene.activeCamera,
        [
          animMove(root.scene.activeCamera, new Vector3(0, 50, 0)),
          animLookAt(root.scene.activeCamera as ArcRotateCamera, Vector3.Zero()),
        ],
        0,
        120,
        false,
        0.5,
        () => {
          ;(root.scene.activeCamera as ArcRotateCamera).setTarget(Vector3.Zero())
        },
      )

      return
    }

    const mesh = screens[id].self
    const platform = mesh.parent as Mesh
    const vector = mesh.forward.multiplyByFloats(-1, -1, -1)
    const origin = new Vector3(platform.position.x, mesh.position.y, platform.position.z)
    const newPosition = origin.add(vector.multiplyByFloats(5, 1, 5))

    root.scene.beginDirectAnimation(
      root.scene.activeCamera,
      [
        animMove(root.scene.activeCamera, newPosition),
        animLookAt(root.scene.activeCamera as ArcRotateCamera, origin),
      ],
      0,
      120,
      false,
      0.5,
      () => {
        ;(root.scene.activeCamera as ArcRotateCamera).setTarget(origin)
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
