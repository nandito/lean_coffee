import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Button, Table } from 'semantic-ui-react'
import { TOPIC_STATE_NAMES } from '../../../../topic/constants'
import { createVote, getLeanCoffee } from '../../../../../graphql'

const Voting = ({ createVote, leanCoffeeId, loading, topics, userId }) => {
  if (loading) { return <div>loading...</div> }

  return (
    <Table compact celled selectable>
      <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Votes</Table.HeaderCell>
          <Table.HeaderCell>State</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { topics.map(topic =>
          <Table.Row key={topic.id} disabled={topic.state !== 'OPEN'}>
            <Table.Cell>{topic.name}</Table.Cell>
            <Table.Cell textAlign='center'>{topic._votesMeta.count}</Table.Cell>
            <Table.Cell textAlign='center'>
              {TOPIC_STATE_NAMES[topic.state]}
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Button
                content='Vote'
                disabled={topic.state !== 'OPEN'}
                icon='hand paper'
                onClick={() => createVote(leanCoffeeId, userId, topic.id)}
                positive
                size='small'
              />
            </Table.Cell>
          </Table.Row>
        ) }
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan='6'>
            <Button disabled>Start discussion</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>

    </Table>
  )
}

Voting.propTypes = {
  createVote: PropTypes.func.isRequired,
  leanCoffeeId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  topics: PropTypes.array,
  userId: PropTypes.string.isRequired
}

export default graphql(createVote, {
  props: ({ mutate }) => ({
    createVote: (leanCoffeeId, userId, topicId) => mutate({
      refetchQueries: [
        {
          query: getLeanCoffee,
          variables: {
            id: leanCoffeeId,
          }
        }
      ],
      variables: {
        leanCoffeeId,
        userId,
        topicId,
      }
    })
  })
})(Voting)
