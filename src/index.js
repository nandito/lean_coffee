import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj3okomy5fb9l0198ja30bnhu', {
  reconnect: true,
  timeout: 30000,
  connectionParams: {
    Authorization: `Bearer ${localStorage.getItem('auth0IdToken')}`,
},
})

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj3okomy5fb9l0198ja30bnhu'
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`
    }
    next()
  },
}])

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
})

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {},
  compose(
    applyMiddleware(client.middleware()),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
)

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ApolloProvider client={client} store={store}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// registerServiceWorker()
