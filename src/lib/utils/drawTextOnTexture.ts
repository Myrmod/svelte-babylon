import type * as BABYLON from 'babylonjs'

export default function drawTextOnTexture(
  texture: BABYLON.DynamicTexture,
  text: string,
  fontFamily: string,
  textOffsetX: number,
  textOffsetY: number,
  color: string,
  backgroundColor: string,
  fontSizeMultiplier: number,
  dtWidth: number,
) {
  const dtContext = texture.getContext()
  const size = 12
  dtContext.font = `${size}px ${fontFamily}`
  const textWidth = dtContext.measureText(text).width
  const ratio = textWidth / size
  const fontSize = Math.floor(dtWidth / (ratio * fontSizeMultiplier))
  const font = `${fontSize}px ${fontFamily}`

  texture.drawText(text, textOffsetX, textOffsetY, font, color, backgroundColor, true)
}
