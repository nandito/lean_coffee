import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

const middlewareLink = setContext(() => {
  const token = localStorage.getItem('auth0IdToken')

  if (!token) {
    return null
  }

  return {
    headers: { 
      authorization: `Bearer ${token}`,
    }
  }
})

const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cj3okomy5fb9l0198ja30bnhu' })

const hasSubscriptionOperation = ({ query: { definitions } }) => (
  definitions.some(({ kind, operation }) => (
    kind === 'OperationDefinition' && operation === 'subscription'
  ))
)

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj3okomy5fb9l0198ja30bnhu', {
  reconnect: true,
  timeout: 30000,
  connectionParams: {
    Authorization: `Bearer ${localStorage.getItem('auth0IdToken')}`,
},
})

const wsLink = new WebSocketLink(wsClient)

const link = ApolloLink.split(
  hasSubscriptionOperation,
  wsLink,
  middlewareLink.concat(httpLink),
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: Function; }
}

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// registerServiceWorker()
