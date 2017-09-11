import React from 'react'
import PropTypes from 'prop-types'
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
    <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>
          Participants
        </Header.Content>
      </Header>

      <Segment>
        <CreateParticipant />
      </Segment>

      <Segment>
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
      </Segment>
    </div>
  )
}

ListParticipants.propTypes = {
  data: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default compose(
  graphql(getParticipants, { options: { fetchPolicy: 'network-only' } }),
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
