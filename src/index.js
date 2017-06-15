import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import './index.css'
import 'semantic-ui-css/semantic.min.css'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj3okomy5fb9l0198ja30bnhu'
})

const client = new ApolloClient({
  networkInterface: networkInterface
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// registerServiceWorker()
