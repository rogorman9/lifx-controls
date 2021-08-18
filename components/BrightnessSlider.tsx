import React from 'react'
import Slider from '@sharcoux/slider'
import { setBrightness } from '../services/setState'
import { Light } from '../types'

interface BrightnessSliderProps {
  light: Light
  onBrightnessChange: (brightness: number) => void
}

export default function BrightnessSlider({ light, onBrightnessChange }: BrightnessSliderProps) {
  return (
    <Slider
      minimumValue={0}
      maximumValue={1}
      onSlidingComplete={async (brightness: number) => {
        await setBrightness(light, brightness)
        onBrightnessChange(brightness)
      }}
      value={light.brightness}
      thumbSize={32}
      trackHeight={8}
    />
  )
}
