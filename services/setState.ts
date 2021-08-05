import { Light } from '../types'
import { authHeaders, LIFX_API_URL } from './common'

export async function toggleLight(light: Light): Promise<void> {
  await fetch(`${LIFX_API_URL}/lights/id:${light.id}/state`, {
    method: 'PUT',
    headers: { ...authHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      power: light.power === 'on' ? 'off' : 'on',
      fast: true,
    }),
  })
}

export async function setColor(light: Light, hue: number, saturation: number) {
  await fetch(`${LIFX_API_URL}/lights/id:${light.id}/state`, {
    method: 'PUT',
    headers: { ...authHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      color: `hue:${hue} saturation:${saturation}`,
      fast: true,
    }),
  })
}
