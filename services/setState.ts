import { LIFX_API_URL } from '@env'
import { Light, Power } from '../types'
import { authHeaders } from './common'

export async function setPower(light: Light, power: Power): Promise<void> {
  await fetch(`${LIFX_API_URL}/lights/id:${light.id}/state`, {
    method: 'PUT',
    headers: { ...authHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      power,
    }),
  })
}

export async function setColor(light: Light, hue: number, saturation: number, kelvin?: number) {
  await fetch(`${LIFX_API_URL}/lights/id:${light.id}/state`, {
    method: 'PUT',
    headers: { ...authHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      color: kelvin ? `kelvin:${kelvin.toFixed()}` : `hue:${hue} saturation:${saturation}`,
    }),
  })
}

export async function setBrightness(light: Light, brightness: number) {
  await fetch(`${LIFX_API_URL}/lights/id:${light.id}/state`, {
    method: 'PUT',
    headers: { ...authHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      brightness,
    }),
  })
}
