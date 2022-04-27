<script lang="ts">
  import type RootContext from '$lib/types'
  import { Animation } from '@babylonjs/core/Animations/animation.js'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { ArcRotateCamera } from 'svelte-babylon'
  import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
  import Button from 'svelte-babylon/components/GUI/Button/index.svelte'
  import GUI from 'svelte-babylon/components/GUI/index.svelte'
  import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
  import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
  import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
  import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
  import type { Writable } from 'svelte/store'

  let root: Writable<RootContext>
  let boxes = [[], [], []]
  const matrix = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
  ]
  let newPositionMatrix: typeof matrix

  $: if ($root && newPositionMatrix) {
    boxes.forEach((row, i) => {
      row.forEach((box, j) => {
        if (!box) return

        const anim = new Animation(
          `Box-${i}-${j}`,
          'position',
          100,
          Animation.ANIMATIONTYPE_VECTOR3,
        )

        anim.setKeys([
          {
            frame: 0,
            value: new Vector3(box.self.position.x, box.self.position.y, 0),
          },
          {
            frame: 100,
            value: new Vector3(newPositionMatrix[i][j].x, newPositionMatrix[i][j].y, 0),
          },
        ])
        box.self.animations.push(anim)

        $root.scene.beginAnimation(box.self, 0, 100, false, 1)
      })
    })
  }

  function shuffle<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length
    let randomIndex: number

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    ;(array as unknown as Array<Array<T>>).forEach(item => {
      if (typeof item === 'object' && item.length !== undefined) {
        shuffle(item)
      }
    })

    return array
  }
</script>

<Canvas
  antialiasing={true}
  engineOptions={{
    preserveDrawingBuffer: true,
    stencil: true,
  }}
  bind:root
  animationsEnabled
>
  <HemisphericLight intensity={0.5} />
  <DirectionalLight
    intensity={0.25}
    direction={new Vector3(-10, -20, -10)}
    position={new Vector3(2, 6, 2)}
  />
  <ArcRotateCamera target={new Vector3(1, 1, 0)} radius={10} />
  {#each matrix as row, x}
    {#each row as item, y}
      <Box {...item} bind:object={boxes[x][y]}>
        <StandardMaterial diffuseColor={Color3.Random()} />
      </Box>
    {/each}
  {/each}
  <GUI>
    <Button
      text="shuffle"
      onPointerUp={() => {
        newPositionMatrix = shuffle(matrix)
        boxes = boxes
      }}
      top={-240}
    />
  </GUI>
</Canvas>
