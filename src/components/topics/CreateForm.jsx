import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Button, Form, Select, } from 'semantic-ui-react'
import { createTopic, getTopics } from '../../graphql'

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
    const { afterSubmit, submit } = this.props

    submit(name, state)

    afterSubmit && afterSubmit()
  }

  handleInputChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
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
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

CreateTopicForm.propTypes = {
  afterSubmit: PropTypes.func,
  submit: PropTypes.func.isRequired
}

const TOPIC_STATES = [
  { text: 'Current', value: 'CURRENT' },
  { text: 'Open', value: 'OPEN' },
  { text: 'Closed', value: 'CLOSED' },
]

export default graphql(createTopic, {
  props: ({ mutate }) => ({
    submit: (name, state) => mutate({
      refetchQueries: [{ query: getTopics }],
      variables: { name, state }
    }),
  }),
})(CreateTopicForm)
