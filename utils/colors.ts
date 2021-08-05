import { hsv, rgb } from 'color-convert'
import kelvinToRgb from 'kelvin-to-rgb'
import { Light } from '../types'

export const getColorHex = (light: Light): string => {
  if (light.power === 'off') {
    return '#000000'
  }
  // When light is in "white" mode, saturation is 0
  if (light.color.saturation > 0) {
    return `#${hsv.hex([light.color.hue, light.color.saturation * 100, light.brightness * 100])}`
  }
  return `#${rgb.hex(kelvinToRgb(light.color.kelvin))}`
}

export const convertXYToHS = (
  x: number,
  y: number,
  radius: number
): { hue: number; saturation: number } => {
  const scaledX = x - radius
  const scaledY = radius - y
  // saturation is the radius (center is white), scaled to be between 0 and 1
  const radians =
    scaledY > 0 ? Math.atan2(scaledY, scaledX) : Math.atan2(scaledY, scaledX) + Math.PI * 2
  const hue = radians * (180 / Math.PI)
  const saturation = Math.sqrt(scaledX * scaledX + scaledY * scaledY) / radius
  return { hue, saturation }
}

export const convertHSToXY = (
  hue: number,
  saturation: number,
  radius: number
): { x: number; y: number } => {
  const radians = hue * (Math.PI / 180)
  const scaledSaturation = radius * saturation
  const x = scaledSaturation * Math.cos(radians) + radius
  const y = radius - scaledSaturation * Math.sin(radians)
  return { x, y }
}
