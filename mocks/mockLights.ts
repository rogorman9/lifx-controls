import { Light } from '../types'

export const mockLightA: Light = {
  id: 'abcde12345',
  uuid: '62e8e2b2-64b1-4397-b4cd-bcca46a3cf5e',
  label: 'Light A',
  connected: true,
  power: 'on',
  color: {
    hue: 2.81,
    saturation: 0.5,
    kelvin: 5000,
  },
  brightness: 1,
  group: {
    id: '36wn16wu19c2h5aivykstxug3lgz53xm',
    name: 'Living Room',
  },
  location: {
    id: '9hgmha3j1r5d5crmy29oztgmx7q1c0sa',
    name: 'Whole Home',
  },
  product: {
    name: 'LIFX A19',
    identifier: 'lifx_a19',
    company: 'LIFX',
    vendor_id: 1,
    product_id: 27,
    capabilities: {
      has_color: true,
      has_variable_color_temp: true,
      has_ir: false,
      has_hev: false,
      has_chain: false,
      has_matrix: false,
      has_multizone: false,
      min_kelvin: 2500,
      max_kelvin: 9000,
    },
  },
  last_seen: '2021-08-10T18:23:58Z',
  seconds_since_seen: 0,
}

export const mockLightB: Light = {
  id: '12345abcde',
  uuid: '5804bdaf-634c-478f-bb15-4f7242c36398',
  label: 'Light B',
  connected: true,
  power: 'off',
  color: {
    hue: 358.59,
    saturation: 0,
    kelvin: 5000,
  },
  brightness: 0.35,
  group: {
    id: 'ydm8hq0mjt1fc9uux57jrcs2po92t0kc',
    name: 'Bedroom',
  },
  location: {
    id: '9hgmha3j1r5d5crmy29oztgmx7q1c0sa',
    name: 'Whole Home',
  },
  product: {
    name: 'LIFX A19',
    identifier: 'lifx_a19',
    company: 'LIFX',
    vendor_id: 1,
    product_id: 43,
    capabilities: {
      has_color: true,
      has_variable_color_temp: true,
      has_ir: false,
      has_hev: false,
      has_chain: false,
      has_matrix: false,
      has_multizone: false,
      min_kelvin: 2500,
      max_kelvin: 9000,
    },
  },
  last_seen: '2021-08-10T18:23:58Z',
  seconds_since_seen: 0,
}

export const mockAllLights = [mockLightA, mockLightB]
