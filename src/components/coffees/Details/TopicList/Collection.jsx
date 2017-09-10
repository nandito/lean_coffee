import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Button, Icon, Label, List } from 'semantic-ui-react'
import CreateTopicForm from '../../../topics/CreateForm'
import { getTopicColor, TOPIC_ICONS } from '../Details'
import { getLeanCoffees, deleteTopic } from '../../../../graphql'

class Collection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addTopicOpen: false,
    }
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

  handleRemove = (id) => {
    this.props.deleteTopic(id)
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
    const { leanCoffeeId, leanCoffeeUserId, loading, topics, userId } = this.props

    if (loading) { return <div>loading...</div> }

    return (
      <div>
        <List>
          { !topics.length && <List.Item>There are no topics specified</List.Item> }

          { topics.length !== 0 && topics.map(topic => (
            <List.Item key={topic.id}>
              <Icon
                color={getTopicColor(topic.state)}
                name={TOPIC_ICONS[topic.state]}
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
  leanCoffeeId: PropTypes.string.isRequired,
  leanCoffeeUserId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  topics: PropTypes.array,
  userId: PropTypes.string.isRequired,
}

export default graphql(deleteTopic, {
  props: ({ mutate }) => ({
    deleteTopic: (id) => mutate({
      refetchQueries: [
        { query: getLeanCoffees }
      ],
      variables: { id }
    })
  })
})(Collection)
