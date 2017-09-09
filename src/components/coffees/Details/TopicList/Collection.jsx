import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Label, List, } from 'semantic-ui-react'
import CreateTopicForm from '../../../topics/CreateForm'
import { getTopicColor } from '../Details'

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

  render() {
    const { leanCoffeeId, loading, topics, userId } = this.props

    if (loading) { return <div>loading...</div> }

    return (
      <div>
        <List bulleted>
          { !topics.length && <List.Item>There are no topics specified</List.Item> }

          { topics.length !== 0 && topics.map(topic => (
            <List.Item key={topic.id}>
              <Header size='small'>
                {topic.name}
                <Label
                  color={getTopicColor(topic.state)}
                  pointing='left'
                  size='mini'
                  >
                    {topic.state}
                    <Label.Detail>
                      {topic._votesMeta && topic._votesMeta.count}
                    </Label.Detail>
                  </Label>
                </Header>
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
  loading: PropTypes.bool.isRequired,
  topics: PropTypes.array,
  userId: PropTypes.string.isRequired,
}

export default Collection
