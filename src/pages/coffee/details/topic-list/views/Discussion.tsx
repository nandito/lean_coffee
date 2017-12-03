import * as React from 'react'
import { compose, graphql, QueryProps } from 'react-apollo'
import { Button, Card, Divider, Header, List } from 'semantic-ui-react'
import { TopicFeed } from '../../../../../components'
import {
  getLeanCoffee,
  getTopicsOfLeanCoffee,
  topicsOfLeanCoffeeSubscription,
  updateTopicState
} from '../../../../../graphql'
import { topicsOfCoffeeQuery, updateTopicMutation } from '../../../../../schema'

interface DiscussionProps {
  data: QueryProps & topicsOfCoffeeQuery
  leanCoffeeId: string
  leanCoffeeUserId: string
  userId: string
  updateTopicStateAndRefetchCoffee(id: string, state: string, leanCoffeId: string, userId: string): Promise<{
    data: updateTopicMutation
  }>
}

class Discussion extends React.Component<DiscussionProps, {}> {
  private createTopicsSubscription: () => void

  componentDidMount() {
    const { data, leanCoffeeId } = this.props

    this.createTopicsSubscription = data.subscribeToMore({
      document: topicsOfLeanCoffeeSubscription,
      variables: { id: leanCoffeeId },
      updateQuery: (previousState: topicsOfCoffeeQuery, {subscriptionData}) => {
        if (!subscriptionData.data) {
            return previousState
        }

        const changedTopic = subscriptionData.data.Topic.node

        return Object.assign({}, {
          allTopics: previousState.allTopics.map(topic =>
            topic.id === changedTopic.id ? changedTopic : topic
          )
        })
      },
      onError: (err) => console.error(err),
    })
  }

  handleStartDiscussion = () => {
    const { leanCoffeeId, data: { allTopics: topics }, updateTopicStateAndRefetchCoffee, userId } = this.props
    const upcomingTopics = topics
      .filter(topic => topic.state === 'OPEN')
      .sort((a, b) => (b._votesMeta.count - a._votesMeta.count))

    updateTopicStateAndRefetchCoffee(upcomingTopics[0].id, 'CURRENT', leanCoffeeId, userId)
  }

  handleClose = (id) => {
    const { leanCoffeeId, updateTopicStateAndRefetchCoffee, userId } = this.props

    updateTopicStateAndRefetchCoffee(id, 'CLOSED', leanCoffeeId, userId)
  }

  renderCurrentTopic = (currentTopic) => (
    <Card centered={true}>
      <Card.Content>
        <Divider horizontal={true}>Current topic</Divider>

        <Card.Description>
          <Header as='h2' content={currentTopic.name} textAlign='center' />
        </Card.Description>

        <Divider />

        <Card.Meta textAlign='center'>
          <List horizontal={true} divided={true}>
            <List.Item>added by {(currentTopic.user && currentTopic.user.name) || 'N/A'}</List.Item>
            <List.Item>has {currentTopic._votesMeta.count} votes</List.Item>
          </List>
        </Card.Meta>
      </Card.Content>

      { this.props.leanCoffeeUserId === this.props.userId
        && <Card.Content textAlign='center' extra={true}>
             <Button
               basic={true}
               color='blue'
               content='Close topic'
               size='small'
               onClick={() => this.handleClose(currentTopic.id)}
             />
           </Card.Content>
      }
    </Card>
  )

  renderControl = () => {
    if (this.props.leanCoffeeUserId === this.props.userId) {
      return <Button basic={true} color='blue' content='Discuss a topic' onClick={this.handleStartDiscussion} />
    } else {
      return <Card.Header content='Waiting for the host' />
    }
  }

  renderTopicPicker = (upcomingTopics) => (
    <Card centered={true}>
      <Card.Content textAlign='center'>
        { upcomingTopics.length
          ? this.renderControl()
          : <Card.Header content='There are no more topics.' />
        }
      </Card.Content>
    </Card>
  )

  renderNoTopic = () => (
    <Card centered={true}>
      <Card.Content>
        <Card.Header>
          There are no topics to discuss
        </Card.Header>
        <Card.Description>
          Add some topics when the session is in topic collection state.
        </Card.Description>
      </Card.Content>
    </Card>
  )

  render() {
    const { data: { loading, allTopics: topics } } = this.props

    if (loading) { return <div>loading...</div> }

    if (!topics.length) { return this.renderNoTopic() }

    const currentTopic = topics.filter(topic => topic.state === 'CURRENT')[0]
    const upcomingTopics = topics.filter(topic => topic.state === 'OPEN')
    const closedTopics = topics.filter(topic => topic.state === 'CLOSED')

    return (
      <div>
        <Card.Group stackable={true}>
          { currentTopic
            ? this.renderCurrentTopic(currentTopic)
            : this.renderTopicPicker(upcomingTopics)
          }
        </Card.Group>

        <Card.Group itemsPerRow='2' stackable={true}>
          <TopicFeed cardTitle='Upcoming' topics={upcomingTopics}/>
          <TopicFeed cardTitle='Closed' topics={closedTopics}/>
        </Card.Group>

      </div>
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
  graphql(updateTopicState, {
    props: ({ mutate }) => ({
      updateTopicStateAndRefetchCoffee: (id: string, state: string, leanCoffeeId: string, userId: string) => {
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
            id,
            state,
          }
        })
      }
    })
  }),
)(Discussion)
