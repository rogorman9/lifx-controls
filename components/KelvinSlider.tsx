import React from 'react'
import Slider from '@sharcoux/slider'
import { ImageBackground, StyleSheet } from 'react-native'
import debounce from 'debounce'
import { setColor } from '../services/setState'
import { Light } from '../types'
import { getColorHex } from '../utils/colors'
const gradientImage = require('../assets/images/kelvin_gradient.png')

export interface KelvinSliderProps {
  light: Light
  onColorChange: (kelvin: number) => void
}

const KelvinSlider: React.FunctionComponent<KelvinSliderProps> = ({ light, onColorChange }) => {
  const inKelvinMode = light.color.saturation === 0
  return (
    <ImageBackground source={gradientImage} style={styles.image}>
      <Slider
        minimumTrackTintColor="#00000000"
        maximumTrackTintColor="#00000000"
        minimumValue={1500}
        maximumValue={9000}
        onSlidingComplete={(value: number) => {
          setColor(light, 0, 0, value)
        }}
        onValueChange={onColorChange}
        thumbTintColor={getColorHex(light)}
        thumbSize={inKelvinMode ? 48 : 0}
        value={light.color.kelvin}
        trackHeight={10}
        thumbStyle={styles.thumb}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
  thumb: {
    borderWidth: 0.3,
    borderStyle: 'solid',
    borderColor: 'gray',
  },
})

export default KelvinSlider
