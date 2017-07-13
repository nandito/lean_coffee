import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Button, Container, Form } from 'semantic-ui-react'
import ListLeanCoffees from './components/coffees/List'
import ListParticipants from './components/participants/List'
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
      </Switch>
    </Container>
    )
  }
}

/*
  1. add participant = yourself
    mutation { createParticipant(name: "TestB", ) {id, name}}

    {
      "data": {
        "createParticipant": {
          "id": "cj3ylixq5ifr30136mfzawkk3",
          "name": "TestB"
        }
      }
    }

  2. list participants
  3. add a Coffee
    mutation { createLeanCoffee(hostId: "cj3ylixq5ifr30136mfzawkk3", state: TOPIC_COLLECTION) {id, host {id, name}, state} }

    {
      "data": {
        "createLeanCoffee": {
          "id": "cj3ylm68hgwdr0106d12xdeve",
          "host": {
            "id": "cj3ylixq5ifr30136mfzawkk3",
            "name": "TestB"
          },
          "state": "TOPIC_COLLECTION"
        }
      }
    }
  4. add a topic
*/

const options = [
  { key: 'cu', text: 'current', value: 'CURRENT' },
  { key: 'op', text: 'open', value: 'OPEN' },
  { key: 'cl', text: 'closed', value: 'CLOSED' },
]

const Topic = () => (
  <Form>
    <Form.Field>
      <label>Topic</label>
      <input placeholder='Topic' />
    </Form.Field>
    <Form.Field>
      <Form.Select label='State' options={options} placeholder='State' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default App
