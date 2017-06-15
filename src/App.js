import React, { Component } from 'react'
import { Button, Checkbox, Form, Grid, Header } from 'semantic-ui-react'
import AllLeanCoffees from './components/AllLeanCoffees'
import AddParticipant from './components/participants/AddParticipant'
import Participants from './components/participants/Participants'

class App extends Component {
  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row streched>
          <Grid.Column>
            <Header as='h1'>Lean Coffee</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row streched>
          <Grid.Column width={4}>
            <AllLeanCoffees />
          </Grid.Column>
          <Grid.Column width={8}>
            <Participants />
            <AddParticipant />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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

const AddParticipants = () => (
  <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='Name' />
    </Form.Field>
    <Form.Field>
      <Form.Select label='State' options={options} placeholder='State' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

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
