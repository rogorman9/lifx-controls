import { Light } from '../types'
import { authHeaders, LIFX_API_URL } from './common'

export default async function getAllLights(): Promise<Light[] | undefined> {
  const response = await fetch(`${LIFX_API_URL}/lights/all`, {
    headers: authHeaders,
  })
  return response.json()
}
