---
title: GUI
description: The Babylon.js GUI library is an extension you can use to generate interactive user interface. It is build on top of the DynamicTexture.
---

<script>
  import CheckboxStory from 'svelte-babylon/components/GUI/Checkbox/Checkbox.story.svelte'
  import ColorPickerStory from 'svelte-babylon/components/GUI/ColorPicker/ColorPicker.story.svelte'
  import DisplayGridStory from 'svelte-babylon/components/GUI/DisplayGrid/DisplayGrid.story.svelte'
  import EllipseStory from 'svelte-babylon/components/GUI/Ellipse/Ellipse.story.svelte'
  import ExampleWrapper from '$routes/docs/_components/ExampleWrapper.svelte'
  import GridStory from 'svelte-babylon/components/GUI/Grid/Grid.story.svelte'
  import ImageStory from 'svelte-babylon/components/GUI/Image/Image.story.svelte'
  import InputPasswordStory from 'svelte-babylon/components/GUI/InputPassword/InputPassword.story.svelte'
  import InputTextStory from 'svelte-babylon/components/GUI/InputText/InputText.story.svelte'
  import LineStory from 'svelte-babylon/components/GUI/Line/Line.story.svelte'
  import RadioButtonStory from 'svelte-babylon/components/GUI/RadioButton/RadioButton.story.svelte'
  import RectangleStory from 'svelte-babylon/components/GUI/Rectangle/Rectangle.story.svelte'
  import ScrollViewerStory from 'svelte-babylon/components/GUI/ScrollViewer/ScrollViewer.story.svelte'
  import SliderStory from 'svelte-babylon/components/GUI/Slider/Slider.story.svelte'
  import StackPanelStory from 'svelte-babylon/components/GUI/StackPanel/StackPanel.story.svelte'
  import TextBlockStory from 'svelte-babylon/components/GUI/TextBlock/TextBlock.story.svelte'
  import TextButtonStory from 'svelte-babylon/components/GUI/TextButton/TextButton.story.svelte'
  import VirtualKeyboardStory from 'svelte-babylon/components/GUI/VirtualKeyboard/VirtualKeyboard.story.svelte'
  import XMLLoaderStory from 'svelte-babylon/components/GUI/XMLLoader/XMLLoader.story.svelte'
</script>

The Babylon.js GUI library is an extension you can use to generate interactive user interface. It is build on top of the DynamicTexture.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui)

## Checkbox

The checkbox is used to control a boolean value.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#checkbox)

### Example

<ExampleWrapper id="CheckboxStory">
  <CheckboxStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import Checkbox from 'svelte-babylon/components/GUI/Checkbox/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Sphere from 'svelte-babylon/components/Objects/Sphere/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	const color = '#ffffff'
	let showBox = true
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera />
		{#if showBox}
			<Box />
		{:else}
			<Sphere />
		{/if}
		<GUI>
			<Checkbox {color} width="50px" height="50px" on:change={() => (showBox = !showBox)} />
		</GUI>
	</Scene>
</Canvas>
```

## ColorPicker

The color picker control allows users to set colors in your scene.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#colorpicker)

### Example

<ExampleWrapper id="ColorPickerStory">
  <ColorPickerStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import ColorPicker from 'svelte-babylon/components/GUI/ColorPicker/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import StandardMaterial from 'svelte-babylon/components/Materials/StandardMaterial/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Color3 } from '@babylonjs/core'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let color = Color3.Gray()
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera />
		<Box>
			<StandardMaterial diffuseColor={color} />
		</Box>
		<GUI>
			<ColorPicker bind:color />
		</GUI>
	</Scene>
</Canvas>
```

## DisplayGrid

The display grid control is a simple control used to display grids inside your GUI.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#displaygrid)

### Example

<ExampleWrapper id="DisplayGridStory">
  <DisplayGridStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import DisplayGrid from 'svelte-babylon/components/GUI/DisplayGrid/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<DisplayGrid width="500px" height="500px" />
		</GUI>
	</Scene>
</Canvas>
```

## Ellipse

The Ellipse is a ellipsoidal container

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#ellipse)

### Example

<ExampleWrapper id="EllipseStory">
  <EllipseStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import Ellipse from 'svelte-babylon/components/GUI/Ellipse/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<Ellipse width="400px" height="400px" background="blue" color="yellow" thickness={4} />
		</GUI>
	</Scene>
</Canvas>
```

## Grid

The Grid is a control which defines a set of rows and columns and allows children to specify which cell they want to belong to

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#grid)

### Example

<ExampleWrapper id="GridStory">
  <GridStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import Grid from 'svelte-babylon/components/GUI/Grid/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import Rectangle from 'svelte-babylon/components/GUI/Rectangle/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<Grid
				width="500px"
				height="500px"
				columnDefinitions={[{ width: 100, isPixel: true }, 0.5, 0.5, { width: 100, isPixel: true }]}
				rowDefinitions={[0.5, 0.5]}
				background="beige"
			>
				<Rectangle background="blue" column={0} row={0} />
				<Rectangle background="yellow" column={0} row={1} />
				<Rectangle background="red" column={1} row={1} />
			</Grid>
		</GUI>
	</Scene>
</Canvas>
```

## Image

Use the image control to display an image in your UI. You can control the stretch used by the image with stretch property.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#image)

### Example

<ExampleWrapper id="ImageStory">
  <ImageStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import Image from 'svelte-babylon/components/GUI/Image/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<Image src="/svelte-babylon-logo.png" />
		</GUI>
	</Scene>
</Canvas>
```

## InputPassword

The InputPassword is a control that shows the entered characters as bullets and is thus suited for entering passwords

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#inputpassword)

### Example

<ExampleWrapper id="InputPasswordStory">
  <InputPasswordStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import InputPassword from 'svelte-babylon/components/GUI/InputPassword/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'

	let value: string
	$: if (value) {
		console.log(value)
	}
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<InputPassword bind:value width="100px" height="30px" />
		</GUI>
	</Scene>
</Canvas>
```

## InputText

The InputText is a control used to let users insert text in a single line

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#inputtext)

### Example

<ExampleWrapper id="InputTextStory">
  <InputTextStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import InputText from 'svelte-babylon/components/GUI/InputText/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'

	let value: string
	$: if (value) {
		console.log(value)
	}
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<InputText bind:value width="100px" height="30px" />
		</GUI>
	</Scene>
</Canvas>
```

## Line

The line will draw a line (!!) between two points

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#line)

### Example

<ExampleWrapper id="LineStory">
  <LineStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import Line from 'svelte-babylon/components/GUI/Line/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<Line start={[10, 10]} end={[1000, 500]} dash={[5, 10]} />
		</GUI>
	</Scene>
</Canvas>
```

## RadioButton

The radio button is used to define a value among a list by using a group of radio buttons where only one can be true. You can specify the selected value with the checked property.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#radiobutton)

### Example

<ExampleWrapper id="RadioButtonStory">
  <RadioButtonStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import RadioButton from 'svelte-babylon/components/GUI/RadioButton/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Sphere from 'svelte-babylon/components/Objects/Sphere/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let showBox = true
	let showSphere = false
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera />
		{#if showBox}
			<Box />
		{/if}
		{#if showSphere}
			<Sphere />
		{/if}
		<GUI>
			<RadioButton width="50px" height="50px" top={60} bind:checked={showSphere} />
			<RadioButton width="50px" height="50px" bind:checked={showBox} />
		</GUI>
	</Scene>
</Canvas>
```

## Rectangle

The Rectangle is a rectangular container

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#rectangle)

### Example

<ExampleWrapper id="RectangleStory">
  <RectangleStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import Rectangle from 'svelte-babylon/components/GUI/Rectangle/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<Rectangle
				width="400px"
				height="400px"
				background="blue"
				color="yellow"
				thickness={4}
				cornerRadius={10}
			/>
		</GUI>
	</Scene>
</Canvas>
```

## ScrollViewer

When you want to keep your user interface small and the information to present large you can use the ScrollViewer to contain the information.
It consists of vertical and horizontal scroll bars and a viewing area. The information you want to present is created as a control that you add to your scroll viewer and is shown in the viewing area. If all the information control fits inside the scroll viewer no scroll bars will be shown.
It is possible to use an image for the thumb control and in the bars.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/scrollViewer)

### Example

<ExampleWrapper id="ScrollViewerStory">
  <ScrollViewerStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import Image from 'svelte-babylon/components/GUI/Image/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import ScrollViewer from 'svelte-babylon/components/GUI/ScrollViewer/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
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
```

## Slider

The slider is used to control a value within a range. You can specify the range withthe `minimum` and `maximum` properties.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#slider)

### Example

<ExampleWrapper id="SliderStory">
  <SliderStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import Slider from 'svelte-babylon/components/GUI/Slider/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector.js'

	let value = 0
</script>

<Canvas>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera />
		<GUI>
			<Box rotation={new Vector3(0, -value, 0)} />
			<Slider bind:value width="200px" height="20px" minimum={0} maximum={2 * Math.PI} />
		</GUI>
	</Scene>
</Canvas>
```

## StackPanel

The StackPanel is a control which stacks its children based on its orientation (can be horizontal or vertical). All children must have a defined width or height

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#stackpanel)

### Example

<ExampleWrapper id="StackPanelStory">
  <StackPanelStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import Ellipse from 'svelte-babylon/components/GUI/Ellipse/index.svelte'
	import Image from 'svelte-babylon/components/GUI/Image/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import Rectangle from 'svelte-babylon/components/GUI/Rectangle/index.svelte'
	import StackPanel from 'svelte-babylon/components/GUI/StackPanel/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
</script>

<Canvas>
	<Scene>
		<ArcRotateCamera />
		<GUI>
			<StackPanel width="100px">
				<Image src="/svelte-babylon-logo.png" width="100px" height="100px" />
				<Ellipse width="100px" height="100px" background="blue" color="blue" />
				<Rectangle width="100px" height="100px" background="green" color="green" />
			</StackPanel>
		</GUI>
	</Scene>
</Canvas>
```

## TextBlock

The TextBlock is a simple control used to display text.

### Example

<ExampleWrapper id="TextBlockStory">
  <TextBlockStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import TextBlock from 'svelte-babylon/components/GUI/TextBlock/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	const text = 'Hello Svelte-Babylon'
	const color = '#ffffff'
	const fontSize = 24
	const fontFamily = 'Arial'
	const fontStyle = 'normal'
	const fontWeight = '600'
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera />
		<Box />
		<GUI>
			<TextBlock {text} {color} {fontSize} {fontFamily} {fontStyle} {fontWeight} />
		</GUI>
	</Scene>
</Canvas>
```

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#textblock)

## TextButton

A button can be used to interact with your user. Please see the events chapter to see how to connect your events with your buttons. The onPointerClickObservable is raised when a button is clicked, meaning both the down and up event happen while the cursor is over the control.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#button)

### Example

<ExampleWrapper id="TextButtonStory">
  <TextButtonStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import TextButton from 'svelte-babylon/components/GUI/TextButton/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Box from 'svelte-babylon/components/Objects/Box/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	function handleClick() {
		alert('clicked button')
	}

	const width = '150px'
	const height = '40px'
	const color = '#ffffff'
	const cornerRadius = 20
	const background = '#aaaa00'
	const text = 'Click Me'
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera />
		<Box />
		<GUI>
			<TextButton
				onPointerUp={handleClick}
				{width}
				{height}
				{color}
				{cornerRadius}
				{background}
				{text}
			/>
		</GUI>
	</Scene>
</Canvas>
```

## VirtualKeyboard

The VirtualKeyboard is a control used to display simple onscreen keyboard. This is mostly useful with WebVR scenarios where the user cannot easily use his keyboard.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/gui#virtualkeyboard)

### Example

<ExampleWrapper id="VirtualKeyboardStory">
  <VirtualKeyboardStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import GUI from 'svelte-babylon/components/GUI/index.svelte'
	import TextBlock from 'svelte-babylon/components/GUI/TextBlock/index.svelte'
	import VirtualKeyboard from 'svelte-babylon/components/GUI/VirtualKeyboard/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'

	let text = 'Hello VirtualKeyboard'
	function handleKeyboardInput({ detail }: { detail: string }) {
		if (detail === '\u2190') {
			text = text.substring(0, text.length - 1)
			return
		}
		text = text + detail
	}
</script>

<Canvas
	antialiasing={true}
	engineOptions={{
		preserveDrawingBuffer: true,
		stencil: true,
	}}
>
	<Scene>
		<HemisphericLight intensity={0.5} />
		<DirectionalLight
			intensity={0.25}
			direction={new Vector3(-10, -20, -10)}
			position={new Vector3(2, 6, 2)}
		/>
		<ArcRotateCamera />
		<GUI>
			<TextBlock {text} />
			<VirtualKeyboard
				on:keyPress={handleKeyboardInput}
				defaultButtonBackground="darkred"
				keyRows={[
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\u2190'],
					{ vals: ['a', 'b'], propertySets: [null, { width: '200px' }] },
				]}
			/>
		</GUI>
	</Scene>
</Canvas>
```

## XMLLoader

When you want to create GUI layouts in an easy and structured way you may want to take a look at the Xml Loader.

[BabylonJS reference](https://doc.babylonjs.com/divingDeeper/gui/xmlLoader)

### Example

<ExampleWrapper id="XMLLoaderStory">
  <XMLLoaderStory />
</ExampleWrapper>

### Example Code

```svelte
<script lang="ts">
	import ArcRotateCamera from 'svelte-babylon/components/Cameras/ArcRotateCamera/index.svelte'
	import Canvas from 'svelte-babylon/components/Canvas/index.svelte'
	import XMLLoader from 'svelte-babylon/components/GUI/XMLLoader/index.svelte'
	import DirectionalLight from 'svelte-babylon/components/Lights/DirectionalLight/index.svelte'
	import HemisphericLight from 'svelte-babylon/components/Lights/HemisphericLight/index.svelte'
	import Scene from 'svelte-babylon/components/Scene/index.svelte'
	import { Vector3 } from '@babylonjs/core/Maths/math.vector'
</script>

<Canvas>
	<Scene>
		<HemisphericLight intensity={0.25} />
		<DirectionalLight intensity={0.5} direction={new Vector3(-10, -20, -10)} />
		<ArcRotateCamera />
		<XMLLoader src="/assets/layout.xml" />
	</Scene>
</Canvas>
```

```js
<?xml version="1.0"?>
<root>
  <Rectangle id="firstContainer" verticalAlignment="Control.HORIZONTAL_ALIGNMENT_CENTER" background="yellow" width=".8" height=".4" color="Orange">
    <Button id="imageButton" name="imageButton" width="0.2" background="red" height="0.3">
      <Image id="image" source="/svelte-babylon-icon.png" width="1" height="1" name="image" stretch="Image.STRETCH_FILL" horizontalAlignment="Control.HORIZONTAL_ALIGNMENT_LEFT" />
    </Button>
  </Rectangle>
</root>
```
