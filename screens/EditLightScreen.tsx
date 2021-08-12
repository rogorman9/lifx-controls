import { RouteProp } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import ColorWheel from '../components/ColorWheel'
import KelvinSlider from '../components/KelvinSlider'
import { View } from '../components/Themed'
import { setPower } from '../services/setState'
import { LightsParamList, Power } from '../types'
import { getColorHex } from '../utils/colors'

type Props = {
  route: RouteProp<LightsParamList, 'EditLightScreen'>
}

export default function EditLightScreen({ route }: Props) {
  const [light, setLight] = useState(route.params.light)
  const [isPowerLoading, setIsPowerLoading] = useState(false)
  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        value={light.power === 'on'}
        disabled={isPowerLoading}
        onValueChange={async (value: boolean) => {
          setIsPowerLoading(true)
          const power: Power = value ? 'on' : 'off'
          try {
            await setPower(light, power)
          } catch (err) {
            return
          }
          // The GET response doesn't update right away, need to keep track of state locally :(
          const lightCopy = { ...light, power }
          setLight(lightCopy)
          setIsPowerLoading(false)
        }}
        trackColor={{ true: getColorHex(light) }}
        thumbColor={light.power === 'on' ? getColorHex(light) : 'gainsboro'}
      />
      <ColorWheel
        light={light}
        onColorChange={(hue, saturation) => {
          setLight({ ...light, color: { ...light.color, hue, saturation } })
        }}
      />
      <KelvinSlider
        light={light}
        onColorChange={(kelvin) => {
          // LIFX API sets saturation to 0 when updating color with kelvin
          setLight({ ...light, color: { ...light.color, saturation: 0, kelvin } })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  switch: {
    transform: [{ scale: 2 }, { rotate: '270deg' }],
    marginBottom: 32,
  },
})
