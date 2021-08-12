import { RouteProp } from '@react-navigation/core'
import React, { useState } from 'react'
import { Button, StyleSheet } from 'react-native'
import ColorWheel from '../components/ColorWheel'
import KelvinSlider from '../components/KelvinSlider'
import { View } from '../components/Themed'
import { toggleLight } from '../services/setState'
import { LightsParamList, Power } from '../types'
import { getColorHex } from '../utils/colors'

type Props = {
  route: RouteProp<LightsParamList, 'EditLightScreen'>
}

export default function EditLightScreen({ route }: Props) {
  const [light, setLight] = useState(route.params.light)
  return (
    <View style={styles.container}>
      <View style={styles.powerButton}>
        <Button
          title="Power"
          color={getColorHex(light)}
          onPress={async () => {
            try {
              await toggleLight(light)
            } catch (err) {
              return
            }
            // The GET response doesn't update right away, need to keep track of state locally :(
            const power: Power = light.power === 'on' ? 'off' : 'on'
            const lightCopy = { ...light, power }
            setLight(lightCopy)
          }}
        />
      </View>
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

  powerButton: {
    marginBottom: 32,
  },
})
