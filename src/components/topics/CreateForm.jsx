import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Button, Form, Select, } from 'semantic-ui-react'
import { createTopic, getLeanCoffee, getTopics } from '../../graphql'

class CreateTopicForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      state: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, state } = this.state
    const { removeForm, leanCoffeeId, submit } = this.props

    submit(leanCoffeeId, name, state)

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
          label='State'
          control={Select}
          onChange={(e, { value }) => this.handleSelectChange('state', value)}
          options={TOPIC_STATES}
          placeholder='Select state'
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

const TOPIC_STATES = [
  { text: 'Current', value: 'CURRENT' },
  { text: 'Open', value: 'OPEN' },
  { text: 'Closed', value: 'CLOSED' },
]

export default graphql(createTopic, {
  props: ({ mutate }) => ({
    submit: (leanCoffeeId, name, state) => {
      if (leanCoffeeId) {
        return mutate({
          refetchQueries: [{
            query: getLeanCoffee,
            variables: { id: leanCoffeeId },
          }],
          variables: { leanCoffeeId, name, state }
        })
      }
      else {
        return mutate({
          refetchQueries: [
            { query: getTopics },
          ],
          variables: { name, state }
        })
      }
    },
  }),
})(CreateTopicForm)
