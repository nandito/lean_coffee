import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import moment from 'moment'
import { Button, Dimmer, Header, Icon, Loader, Table } from 'semantic-ui-react'
import CreateTopicModal from './CreateModal'
import { getTopics, deleteTopic } from '../../graphql'

const ListTopics = ({ data, handleDelete }) => {

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
        <Icon name='file text' circular />
        <Header.Content>
          Topics
        </Header.Content>
      </Header>

      <Table compact celled>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Updated at</Table.HeaderCell>
            <Table.HeaderCell>Assigned coffee</Table.HeaderCell>
            <Table.HeaderCell>Vote count</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { data.allTopics.map(topic =>
            <Table.Row key={topic.id}>
              <Table.Cell>{topic.name}</Table.Cell>
              <Table.Cell textAlign='center'>{topic.state}</Table.Cell>
              <Table.Cell textAlign='center'>{ moment(topic.updatedAt).format('MMMM Do YYYY') }</Table.Cell>
              <Table.Cell textAlign='center'>
                { topic.leanCoffee
                  ? moment(topic.leanCoffee.createdAt).format('MMMM Do YYYY')
                  : 'Not assigned'
                }
              </Table.Cell>
              <Table.Cell textAlign='right'>{topic._votesMeta.count}</Table.Cell>
              <Table.Cell textAlign='right'>
                <Button size='small' disabled>Edit</Button>
                <Button size='small' negative onClick={() => handleDelete(topic.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ) }
        </Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='6'>
              <CreateTopicModal />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>

      </Table>
    </div>
  )
}

ListTopics.propTypes = {
  data: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default compose(
  graphql(getTopics),
  graphql(deleteTopic, {
    props: ({ mutate }) => ({
      handleDelete: (id) => mutate({
        refetchQueries: [
          { query: getTopics }
        ],
        variables: { id }
      })
    })
  })
)(ListTopics)
