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
import Auth from './auth/Auth'

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

class App extends Component {
  render() {
    return (
    <Container>
      <TopMenu auth={auth} />

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/participants" component={ListParticipants}/>
        <Route exact path="/coffees" component={ListLeanCoffees}/>
        <Route exact path="/coffees/:id" component={LeanCoffeeDetails}/>
        <Route exact path="/topics" component={ListTopics}/>
        <Route path="/callback" render={(props) => {
            handleAuthentication(props)
            return <Loading {...props} />
        }}/>
      </Switch>
    </Container>
    )
  }
}

export default App
