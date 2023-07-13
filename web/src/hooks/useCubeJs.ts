import { useEffect, useState } from 'react'

import cubejs, { CubejsApi } from '@cubejs-client/core'

import { useAuth } from 'src/auth'
import { CONFIG } from 'src/config/config'

export const useCubeJs = () => {
  const [cubeJsInstance, setCubeJs] = useState<CubejsApi>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  // contains token
  const { getToken, isAuthenticated } = useAuth()

  useEffect(() => {
    getToken().then((token) => {
      const cubejsApi = cubejs(`bearer ${token}`, {
        apiUrl: CONFIG.cubes.endpoint,
        credentials: 'include',
      })

      setCubeJs(cubejsApi)
      setLoading(false)
    })
  }, [isAuthenticated, getToken])

  return [cubeJsInstance, { loading }] as const
}
