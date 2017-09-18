import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Button, Form, Select, } from 'semantic-ui-react'
import { TOPIC_STATE_NAMES } from '../constants'
import { createTopic, getTopicsOfLeanCoffee, getTopics } from '../../../graphql'

class CreateTopicForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      state: 'OPEN',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, state } = this.state
    const { removeForm, leanCoffeeId, submit, userId } = this.props

    submit(leanCoffeeId, name, state, userId)

    removeForm && removeForm()
  }

  handleInputChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { removeForm } = this.props
    const stateOptions = Object.keys(TOPIC_STATE_NAMES).map(key => (
      { text: TOPIC_STATE_NAMES[key], value: key }
    ))

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label='Name'
          onChange={this.handleInputChange}
          placeholder='Name'
          required
          value={this.state.name}
        />
        <Form.Field
          disabled
          label='State'
          control={Select}
          onChange={(e, { value }) => this.handleSelectChange('state', value)}
          options={stateOptions}
          placeholder='Select state'
          value={this.state.state}
          required
        />
        <Button type='submit' positive>Submit</Button>
        <Button onClick={removeForm}>Cancel</Button>
      </Form>
    )
  }
}

CreateTopicForm.propTypes = {
  removeForm: PropTypes.func,
  leanCoffeeId: PropTypes.string,
  submit: PropTypes.func.isRequired
}

export default graphql(createTopic, {
  props: ({ mutate }) => ({
    submit: (leanCoffeeId, name, state, userId) => {
      if (leanCoffeeId) {
        return mutate({
          refetchQueries: [{
            query: getTopicsOfLeanCoffee,
            variables: { id: leanCoffeeId },
          }],
          variables: { leanCoffeeId, name, state, userId }
        })
      }
      else {
        return mutate({
          refetchQueries: [
            { query: getTopics },
          ],
          variables: { name, state, userId }
        })
      }
    },
  }),
})(CreateTopicForm)
