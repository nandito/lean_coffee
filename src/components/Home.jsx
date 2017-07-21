import React from 'react'
import { Header, Icon, List, Segment } from 'semantic-ui-react'

const Home = () => (
  <Segment>
    <Header as='h2' icon textAlign='center'>
      <Header.Content>
        Lean Coffee home
      </Header.Content>
    </Header>

    <List divided verticalAlign='middle' size='large'>
      <List.Item>
        <List.Content>
          <List.Header>
            <Icon name='add user' circular /> Add participants
          </List.Header>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>
            <Icon name='coffee' circular /> Add coffee
          </List.Header>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>
            <Icon name='tags' circular /> Collect topics
          </List.Header>
        </List.Content>
      </List.Item>
    </List>
  </Segment>
)

export default Home
