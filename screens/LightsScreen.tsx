import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, StyleSheet } from 'react-native'

import { Text, View } from '../components/Themed'
import { StackScreenProps } from '@react-navigation/stack'
import { Light, LightsParamList } from '../types'
import getAllLights from '../services/getAllLights'
import { getColorHex } from '../utils/colors'

export default function LightsScreen({
  navigation,
}: StackScreenProps<LightsParamList, 'LightsScreen'>) {
  const [lights, setLghts] = useState<Light[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const getInitialData = async () => {
    // blah
    setIsLoading(true)
    let response: Light[] | undefined
    try {
      response = await getAllLights()
    } catch {
      // do nothing for now
    }
    if (response) {
      const sorted = response.sort((a: Light, b: Light) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase())
      )
      setLghts(sorted)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getInitialData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lights</Text>
      <Button title="Reload" onPress={getInitialData} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="dodgerblue" />
        ) : (
          lights.map((light) => (
            <View style={styles.lightButton} key={light.id}>
              <Button
                title={light.label}
                color={getColorHex(light)}
                onPress={() => {
                  navigation.navigate('EditLightScreen', { light })
                }}
              />
            </View>
          ))
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
