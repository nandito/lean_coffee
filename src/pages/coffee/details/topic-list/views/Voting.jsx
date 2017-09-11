import React from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'semantic-ui-react'

const Voting = ({ loading, topics }) => {
  if (loading) { return <div>loading...</div> }

  return (
    <Table compact celled>
      <Table.Header>
        <Table.Row textAlign='center'>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Vote count</Table.HeaderCell>
          <Table.HeaderCell>State</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { topics.map(topic =>
          <Table.Row key={topic.id}>
            <Table.Cell>{topic.name}</Table.Cell>
            <Table.Cell textAlign='right'>{topic._votesMeta.count}</Table.Cell>
            <Table.Cell textAlign='center'>{topic.state}</Table.Cell>
            <Table.Cell textAlign='right'>
              <Button size='small' disabled>Vote</Button>
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
  loading: PropTypes.bool.isRequired,
  topics: PropTypes.array,
}

export default Voting
