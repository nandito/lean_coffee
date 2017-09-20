import * as React from 'react'
// import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { Button, Table } from 'semantic-ui-react'
import { TOPIC_STATE_NAMES } from '../../../../topic/constants'
import { createVote, getLeanCoffee, getTopicsOfLeanCoffee, votesOfLeanCoffeeSubscription } from '../../../../../graphql'

class Voting extends React.Component<any, any> {
  private createVoteSubscription: any

  componentDidMount() {
    const { data, leanCoffeeId } = this.props

    this.createVoteSubscription = data.subscribeToMore({
      document: votesOfLeanCoffeeSubscription,
      variables: { id: leanCoffeeId },
      onError: (err) => console.error(err),
    })
  }

  render() {
    const { createVote, data: { loading, allTopics }, leanCoffeeId, userId, votesLeft } = this.props

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
          { allTopics.map(topic =>
            <Table.Row key={topic.id} disabled={topic.state !== 'OPEN'}>
              <Table.Cell>{topic.name}</Table.Cell>
              <Table.Cell textAlign='center'>{topic._votesMeta.count}</Table.Cell>
              <Table.Cell textAlign='center'>
                {TOPIC_STATE_NAMES[topic.state]}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Button
                  content='Vote'
                  disabled={topic.state !== 'OPEN' || votesLeft < 1}
                  icon='hand paper'
                  onClick={() => createVote(leanCoffeeId, userId, topic.id)}
                  positive
                  size='small'
                />
              </Table.Cell>
            </Table.Row>
          ) }
        </Table.Body>
      </Table>
    )
  }
}

// Voting.propTypes = {
//   createVote: PropTypes.func.isRequired,
//   leanCoffeeId: PropTypes.string.isRequired,
//   loading: PropTypes.bool.isRequired,
//   userId: PropTypes.string.isRequired,
//   votesLeft: PropTypes.number.isRequired,
// }

export default compose(
  graphql(getTopicsOfLeanCoffee, {
    options: ({ leanCoffeeId }: any) => ({
      fetchPolicy: 'network-only',
      variables: { id: leanCoffeeId },
    })
  }),
  graphql(createVote, {
    props: ({ mutate }: any) => ({
      createVote: (leanCoffeeId, userId, topicId) => mutate({
        refetchQueries: [
          {
            query: getLeanCoffee,
            variables: {
              leanCoffeeId,
              userId,
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
  })
)(Voting)
