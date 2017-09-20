import * as React from 'react'
// import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { Button, Card, Divider, Header, List } from 'semantic-ui-react'
import { TopicFeed } from '../../../../../components'
import { getLeanCoffee, getTopicsOfLeanCoffee, topicsOfLeanCoffeeSubscription, updateTopicState } from '../../../../../graphql'

class Discussion extends React.Component<any, any> {
  private createTopicsSubscription: any

  componentDidMount() {
    const { data, leanCoffeeId } = this.props

    this.createTopicsSubscription = data.subscribeToMore({
      document: topicsOfLeanCoffeeSubscription,
      variables: { id: leanCoffeeId },
      updateQuery: (previousState, {subscriptionData}) => {
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
    const { leanCoffeeId, data: { allTopics: topics }, updateTopicState, userId } = this.props
    const upcomingTopics = topics
      .filter(topic => topic.state === 'OPEN')
      .sort((a,b) => (b._votesMeta.count - a._votesMeta.count))

    updateTopicState(upcomingTopics[0].id, 'CURRENT', leanCoffeeId, userId)
  }

  handleClose = (id) => {
    const { leanCoffeeId, updateTopicState, userId } = this.props

    updateTopicState(id, 'CLOSED', leanCoffeeId, userId)
  }

  renderCurrentTopic = (currentTopic) => (
    <Card centered>
      <Card.Content>
        <Divider horizontal>Current topic</Divider>

        <Card.Description>
          <Header as='h2' content={currentTopic.name} textAlign='center' />
        </Card.Description>

        <Divider />

        <Card.Meta textAlign='center'>
          <List horizontal divided>
            <List.Item>added by {(currentTopic.user && currentTopic.user.name) || 'N/A'}</List.Item>
            <List.Item>has {currentTopic._votesMeta.count} votes</List.Item>
          </List>
        </Card.Meta>
      </Card.Content>

      { this.props.leanCoffeeUserId === this.props.userId
        && <Card.Content textAlign='center' extra>
             <Button
               basic
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
      return <Button basic color='blue' content='Discuss a topic' onClick={this.handleStartDiscussion} />
    }
    else {
      return <Card.Header content='Waiting for the host' />
    }
  }

  renderTopicPicker = (upcomingTopics) => (
    <Card centered>
      <Card.Content textAlign='center'>
        { upcomingTopics.length
          ? this.renderControl()
          : <Card.Header content='There are no more topics.' />
        }
      </Card.Content>
    </Card>
  )

  renderNoTopic = () => (
    <Card centered>
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
        <Card.Group stackable>
          { currentTopic
            ? this.renderCurrentTopic(currentTopic)
            : this.renderTopicPicker(upcomingTopics)
          }
        </Card.Group>

        <Card.Group itemsPerRow='2' stackable>
          <TopicFeed cardTitle='Upcoming' topics={upcomingTopics}/>
          <TopicFeed cardTitle='Closed' topics={closedTopics}/>
        </Card.Group>

      </div>
    )
  }
}

// Discussion.propTypes = {
//   leanCoffeeId: PropTypes.string.isRequired,
//   leanCoffeeUserId: PropTypes.string.isRequired,
//   loading: PropTypes.bool.isRequired,
//   userId: PropTypes.string.isRequired,
//   updateTopicState: PropTypes.func.isRequired,
// }

export default compose(
  graphql(getTopicsOfLeanCoffee, {
    options: ({ leanCoffeeId }: any) => ({
      fetchPolicy: 'network-only',
      variables: { id: leanCoffeeId },
    })
  }),
  graphql(updateTopicState, {
    props: ({ mutate }: any) => ({
      updateTopicState: (id, state, leanCoffeeId, userId) => mutate({
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
    })
  }),
)(Discussion)
