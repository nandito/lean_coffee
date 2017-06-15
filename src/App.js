import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Button, Checkbox, Form, Grid, Header } from 'semantic-ui-react'
import AllLeanCoffees from './components/AllLeanCoffees'
import AddParticipant from './components/participants/AddParticipant'
import Participants from './components/participants/Participants'
import Sidebar from './components/Sidebar'

class App extends Component {
  render() {
    return (
      <div>

        <Grid columns={2} divided padded>

          <Header as='h1'>Lean Coffee</Header>

          <Grid.Row streched>

            <Grid.Column width={3}>
              <Sidebar />
            </Grid.Column>

            <Grid.Column width={13}>
              <Switch>
                <Route exact path="/" />
                <Route exact path="/participants" component={Participants}/>
                <Route exact path="/participants/add" component={AddParticipant}/>
              </Switch>
            </Grid.Column>

          </Grid.Row>

        </Grid>
      </div>
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
