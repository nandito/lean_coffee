import React from 'react'
import { compose, graphql } from 'react-apollo'
import CreateParticipant from './Create'
import { Button, Dimmer, Header, Icon, List, Loader, Segment } from 'semantic-ui-react'
import { deleteParticipant, getParticipants } from '../../graphql'

const ListParticipants = ({ data, handleDelete }) => {

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
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>
          Participants
        </Header.Content>
      </Header>

      <List divided verticalAlign='middle'>
        { data.allParticipants.map(participant =>
          <List.Item key={participant.id}>
            <List.Content floated='right'>
              <Button size='mini' color='red' onClick={() => handleDelete(participant.id)}>Delete</Button>
            </List.Content>
            <List.Content>
              {participant.name}
            </List.Content>
          </List.Item>
        ) }
      </List>

      <CreateParticipant />

    </Segment>
  )
}

export default compose(
  graphql(getParticipants),
  graphql(deleteParticipant, {
    props: ({ mutate }) => ({
      handleDelete: (id) => mutate({
        refetchQueries: [
          { query: getParticipants }
        ],
        variables: { id }
      })
    })
  })
)(ListParticipants)
