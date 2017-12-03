import * as React from 'react'
import { compose, graphql, QueryProps } from 'react-apollo'
import { Button, Table } from 'semantic-ui-react'
import { TOPIC_STATE_NAMES } from '../../../../topic/constants'
import { createVote, getLeanCoffee, getTopicsOfLeanCoffee, votesOfLeanCoffeeSubscription } from '../../../../../graphql'
import { createVoteMutation, topicsOfCoffeeQuery } from '../../../../../schema'

interface VotingProps {
  data: QueryProps & topicsOfCoffeeQuery
  leanCoffeeId: string
  leanCoffeeUserId: string
  userId: string
  votesLeft: number
  createVoteAndRefetchCoffee(leanCoffeeId: string, userId: string, topicId: string): Promise<{
    data: createVoteMutation
  }>
}

class Voting extends React.Component<VotingProps, {}> {
  private createVoteSubscription: () => void

  componentDidMount() {
    const { data, leanCoffeeId } = this.props

    this.createVoteSubscription = data.subscribeToMore({
      document: votesOfLeanCoffeeSubscription,
      variables: { id: leanCoffeeId },
      onError: (err) => console.error(err),
    })
  }

  render() {
    const { createVoteAndRefetchCoffee, data: { loading, allTopics }, leanCoffeeId, userId, votesLeft } = this.props

    if (loading) { return <div>loading...</div> }

    return (
      <Table compact={true} celled={true} selectable={true}>
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
                  onClick={() => createVoteAndRefetchCoffee(leanCoffeeId, userId, topic.id)}
                  positive={true}
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

export default compose(
  graphql(getTopicsOfLeanCoffee, {
    options: ({ leanCoffeeId }: { leanCoffeeId: string }) => ({
      fetchPolicy: 'network-only',
      variables: { id: leanCoffeeId },
    })
  }),
  graphql(createVote, {
    props: ({ mutate }) => ({
      createVoteAndRefetchCoffee: (leanCoffeeId: string, userId: string, topicId: string) => {
        if (!mutate) { return null }
        
        return mutate({
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
      }
    })
  })
)(Voting)
