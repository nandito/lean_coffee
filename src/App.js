import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import AllLeanCoffees from './components/AllLeanCoffees'

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
            <div>current coffee</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default App
