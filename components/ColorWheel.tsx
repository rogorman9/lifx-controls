import React, { useState } from 'react'
import { GestureResponderEvent, ImageBackground, Pressable, StyleSheet } from 'react-native'
import { setColor } from '../services/setState'
import { Light } from '../types'
import { convertHSToXY, convertXYToHS, getColorHex } from '../utils/colors'
import Pin from './images/Pin'
import Layout from '../constants/Layout'

const colorWheelImage = require('../assets/images/color-wheel.png')

type Props = {
  light: Light
  onColorChange: (hue: number, saturation: number) => void
}

const {
  window: { width, height },
} = Layout
const colorWheelSize = Math.min(width, height, 800)

const PIN_WIDTH = 48
const PIN_HEIGHT = 80

const getInitials = (name: string): string => {
  const splitName = name.trim().split(/\s+/)
  const initialsArr = splitName.map((word: string) => word[0]?.toUpperCase())
  // Limit label to 3 characters for now
  return initialsArr.slice(0, 3).join('')
}

export default function ColorWheel({ light, onColorChange }: Props) {
  const [{ x, y }, setTapCoords] = useState(
    convertHSToXY(light.color.hue, light.color.saturation, colorWheelSize / 2)
  )
  const inColorMode = light.color.saturation !== 0
  return (
    <Pressable
      onPress={(event: GestureResponderEvent) => {
        // The type for onPress appears to be incorrect; layerX and layerY are present on web
        const { locationX, locationY, layerX, layerY } = event.nativeEvent as any
        const x = locationX || layerX
        const y = locationY || layerY
        const { hue, saturation } = convertXYToHS(x, y, colorWheelSize / 2)
        // Don't register clicks outside the circle
        if (saturation <= 1) {
          try {
            setColor(light, hue, saturation)
          } catch {
            return
          }
          setTapCoords({ x: x, y: y })
          onColorChange(hue, saturation)
        }
      }}
    >
      <ImageBackground source={colorWheelImage} style={styles.colorWheel}>
        {inColorMode && (
          <Pin
            fillColor={getColorHex(light)}
            label={getInitials(light.label)}
            style={[
              styles.pinIcon,
              {
                left: x - PIN_WIDTH / 2,
                top: y - PIN_HEIGHT,
              },
            ]}
          />
        )}
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  colorWheel: {
    width: colorWheelSize,
    height: colorWheelSize,
  },
  pinIcon: {
    position: 'absolute',
    width: PIN_WIDTH,
    height: PIN_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
})
