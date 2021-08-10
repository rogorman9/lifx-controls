import React, { useState } from 'react'
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import { setColor } from '../services/setState'
import { Light } from '../types'
import { convertHSToXY, convertXYToHS, getColorHex } from '../utils/colors'
import Pin from './images/Pin'

const colorWheelImage = require('../assets/images/color-wheel.png')

type Props = {
  light: Light
  onColorChange: (hue: number, saturation: number) => void
}

const { width, height } = Dimensions.get('window')
const colorWheelSize = Math.min(width, height)

const PIN_WIDTH = 48
const PIN_HEIGHT = 80

export default function ColorWheel({ light, onColorChange }: Props) {
  const [{ x, y }, setTapCoords] = useState(
    convertHSToXY(light.color.hue, light.color.saturation, colorWheelSize / 2)
  )
  return (
    <Pressable
      onPress={(event: GestureResponderEvent) => {
        const { locationX, locationY } = event.nativeEvent
        const { hue, saturation } = convertXYToHS(locationX, locationY, colorWheelSize / 2)
        // Don't register clicks outside the circle
        if (saturation <= 1) {
          try {
            setColor(light, hue, saturation)
          } catch {
            return
          }
          setTapCoords({ x: locationX, y: locationY })
          onColorChange(hue, saturation)
        }
      }}
    >
      <ImageBackground source={colorWheelImage} style={styles.colorWheel}>
        <Pin
          fillColor={getColorHex(light)}
          label="SL"
          style={[
            styles.pinIcon,
            {
              left: x - PIN_WIDTH / 2,
              top: y - PIN_HEIGHT,
            },
          ]}
        />
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
