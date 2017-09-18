import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { Button, Icon, Label, List } from 'semantic-ui-react'
import CreateTopicForm from '../../../../topic/create/CreateForm'
import { TOPIC_STATE_ICONS, TOPIC_STATE_COLORS } from '../../../../topic/constants'
import { deleteTopic, getTopicsOfLeanCoffee, topicsOfLeanCoffeeSubscription } from '../../../../../graphql'

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addTopicOpen: false,
    }
  }

  componentDidMount() {
    const { data, leanCoffeeId } = this.props

    this.createTopicsSubscription = data.subscribeToMore({
      document: topicsOfLeanCoffeeSubscription,
      variables: { id: leanCoffeeId },
      updateQuery: (previousState, {subscriptionData}) => {
        if (!subscriptionData.data) {
            return previousState
        }

        const newTopic = subscriptionData.data.Topic.node

        if (!newTopic) {
          const removedTopicId = subscriptionData.data.Topic.previousValues.id

          return Object.assign({}, previousState, {
            allTopics: previousState.allTopics.filter(topic => topic.id !== removedTopicId)
          })
        }

        return Object.assign({}, previousState, {
          allTopics: [...previousState.allTopics, newTopic]
        })
      },
      onError: (err) => console.error(err),
    })
  }

  handleAddTopicOpen = () => {
    this.setState({
      addTopicOpen: true
    })
  }

  handleAddTopicClose = () => {
    this.setState({
      addTopicOpen: false
    })
  }

  handleRemove = (topicId) => {
    this.props.deleteTopic(this.props.leanCoffeeId, topicId)
  }

  renderRemoveButton = (topicId) => (
    <span>
      {' '}
      <Label
        as='a'
        color='red'
        onClick={() => this.handleRemove(topicId)}
        size='mini'
        >
          Remove
        </Label>
    </span>
  )

  render() {
    const { leanCoffeeId, leanCoffeeUserId, userId } = this.props

    if (this.props.data.loading) { return <div>loading...</div> }

    const topics = this.props.data.allTopics

    return (
      <div>
        <List>
          { !topics.length && <List.Item>There are no topics specified</List.Item> }

          { topics.length !== 0 && topics.map(topic => (
            <List.Item key={topic.id}>
              <Icon
                color={TOPIC_STATE_COLORS[topic.state]}
                name={TOPIC_STATE_ICONS[topic.state]}
              />
              <List.Content>
                <List.Header>{topic.name}</List.Header>
                <List.Description>
                  Added by {topic.user ? topic.user.name : 'N/A'}.
                  {
                    (
                      (leanCoffeeUserId === userId)
                      || (topic.user && topic.user.id === userId)
                    )
                    && this.renderRemoveButton(topic.id)
                  }
                </List.Description>
              </List.Content>
            </List.Item>

            ))}
          </List>

          {
            this.state.addTopicOpen
            ? <CreateTopicForm
                removeForm={this.handleAddTopicClose}
                leanCoffeeId={leanCoffeeId}
                userId={userId}
              />
            : <Button size='mini' onClick={this.handleAddTopicOpen}><Icon name='add' /> Add topic</Button>
          }
      </div>
    )
  }
}

Collection.propTypes = {
  data: PropTypes.object.isRequired,
  leanCoffeeId: PropTypes.string.isRequired,
  leanCoffeeUserId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
}

export default compose(
  graphql(getTopicsOfLeanCoffee, {
    options: ({ leanCoffeeId }) => ({
      fetchPolicy: 'network-only',
      variables: { id: leanCoffeeId },
    })
  }),
  graphql(deleteTopic, {
    props: ({ mutate }) => ({
      deleteTopic: (leanCoffeeId, topicId) => mutate({
        refetchQueries: [
          {
            query: getTopicsOfLeanCoffee,
            variables: { id: leanCoffeeId },
          }
        ],
        variables: { id: topicId }
      })
    })
  })
)(Collection)
