import React from 'react'
import { Header, Message, Step } from 'semantic-ui-react'

const steps = [
  {
    icon: 'add user',
    title: 'Sign up',
    description: 'To access all functions of the site'
  },
  {
    icon: 'coffee',
    title: 'Create coffee',
    description: 'To start a new session'
  },
  {
    icon: 'file text',
    title: 'Collect topics',
    description: 'To define the discussion topics'
  },
]


const Home = ({ location }) => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Header.Content>
        Lean Coffee home
      </Header.Content>
    </Header>

    { location.state && location.state.from &&
      <Message negative>
        <Message.Header>Permission denied</Message.Header>
        <p>You have to log in to access '{location.state.from.pathname}' page</p>
      </Message>
    }

    <Step.Group fluid items={steps} />

  </div>
)

export default Home
