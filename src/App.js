import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import LeanCoffeeDetails from './components/coffees/Details/Details'
import ListLeanCoffees from './components/coffees/List'
import ListParticipants from './components/participants/List'
import ListTopics from './components/topics/List'
import Home from './components/Home'
import TopMenu from './components/TopMenu'

class App extends Component {
  render() {
    return (
    <Container>
      <TopMenu />

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/participants" component={ListParticipants}/>
        <Route exact path="/coffees" component={ListLeanCoffees}/>
        <Route exact path="/coffees/:id" component={LeanCoffeeDetails}/>
        <Route exact path="/topics" component={ListTopics}/>
      </Switch>
    </Container>
    )
  }
}

export default App
