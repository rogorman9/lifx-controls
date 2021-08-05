export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
}

export type BottomTabParamList = {
  Lights: undefined
  Scenes: undefined
}

export type LightsParamList = {
  EditLightScreen: { light: Light }
  LightsScreen: undefined
}

export type ScenesParamList = {
  ScenesScreen: undefined
}

export type Power = 'on' | 'off'

export type Light = {
  id: string
  uuid: string
  label: string
  connected: boolean
  power: Power
  color: {
    hue: number
    saturation: number
    kelvin: number
  }
  brightness: number
  effect: string
  group: {
    id: string
    name: string
  }
  location: {
    id: string
    name: string
  }
  product: {
    name: string
    identifier: string
    company: string
    capabilities: {
      has_color: boolean
      has_variable_color_temp: boolean
      has_ir: boolean
      has_chain: boolean
      has_multizone: boolean
      min_kelvin: number
      max_kelvin: number
    }
    product_id: number
    vendor_id: number
  }
  last_seen: string
  seconds_since_seen: number
}
