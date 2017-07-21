import React from 'react'
import { Header, Step } from 'semantic-ui-react'

const steps = [
  {
    icon: 'add user',
    title: 'Add participants',
    description: 'To define who can participate'
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


const Home = () => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Header.Content>
        Lean Coffee home
      </Header.Content>
    </Header>

    <Step.Group fluid items={steps} />

  </div>
)

export default Home
