import React from 'react'
import { gql, graphql } from 'react-apollo'
import { Button, Dimmer, Label, List, Loader, Segment } from 'semantic-ui-react'

const Participants = ({ data }) => {
  if (data.loading) return (
    <Dimmer inverted active>
      <Loader>Loading</Loader>
    </Dimmer>
  )

  if (data.error) {
    console.error('Something went wrong:' , data.error)
    return null
  }

  return (
    <Segment>
      <List celled>
        { data.allParticipants.map(participant =>
          <List.Item key={participant.id}>
            <List.Content floated='right'>
              <Button size='mini' color='red'>Delete</Button>
            </List.Content>
            <List.Content>
              {participant.name}
            </List.Content>
          </List.Item>
        ) }
      </List>
    </Segment>
  )
}

const getParticipants = gql`
  query {
    allParticipants {
      id,
      name,
    }
  }
`

export default graphql(getParticipants)(Participants)
