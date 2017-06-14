import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as='h1'>Lean Coffee</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default App
