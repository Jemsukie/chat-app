import { CubeProvider } from '@cubejs-client/react'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import { AuthProvider, useAuth } from './auth'
import { useCubeJs } from './hooks/useCubeJs'

import './index.css'

const EnhancedCubeJsProvider = ({ children }) => {
  const [cubeJsApi, { loading }] = useCubeJs()

  if (loading) {
    return <>loading...</>
  }

  return <CubeProvider cubejsApi={cubeJsApi}>{children}</CubeProvider>
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <EnhancedCubeJsProvider>
            <Routes />
          </EnhancedCubeJsProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
