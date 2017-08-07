import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import LeanCoffeeDetails from './components/coffees/Details/Details'
import ListLeanCoffees from './components/coffees/List'
import ListParticipants from './components/participants/List'
import ListTopics from './components/topics/List'
import Home from './components/Home'
import Loading from './components/loading/Loading'
import TopMenu from './components/TopMenu'
import CreateUser from './components/user/CreateUser'
import { graphql, gql } from 'react-apollo'

export const clientId = 'tdJNe4V3XWxqNAQYhrK0FbrDzW3jbPcq'
export const domain='lean-coffee.eu.auth0.com'

class App extends Component {
  render () {
    if (this.props.data.loading) {
      return <Loading />
    }

    return (
      <Container>
        <TopMenu />

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/participants" component={ListParticipants}/>
          <Route exact path="/coffees" component={ListLeanCoffees}/>
          <Route exact path="/coffees/:id" component={LeanCoffeeDetails}/>
          <Route exact path="/topics" component={ListTopics}/>
          <Route exact path="/signup" component={CreateUser}/>
        </Switch>
      </Container>
    )
  }
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

export default graphql(userQuery, { options: {fetchPolicy: 'network-only' }})(App)
