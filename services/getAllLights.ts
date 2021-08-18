import { LIFX_API_URL } from '@env'
import { mockAllLights } from '../mocks/mockLights'
import { Light } from '../types'
import { authHeaders } from './common'

export default async function getAllLights(): Promise<Light[] | undefined> {
  if (LIFX_API_URL) {
    const response = await fetch(`${LIFX_API_URL}/lights/all`, {
      headers: authHeaders,
    })
    return response.json()
  }
  return mockAllLights
}
