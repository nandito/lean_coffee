import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Select } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import { COFFEE_STATE_NAMES } from '../constants'
import { getLeanCoffee, updateLeanCoffeeState } from '../../../graphql'

class ChangeStateForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      state: props.state
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { hideForm, id, submit } = this.props
    const { state } = this.state

    submit({ id, state })
    hideForm()
  }

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { state } = this.state
    const stateOptions = Object.keys(COFFEE_STATE_NAMES).map(key => (
      { text: COFFEE_STATE_NAMES[key], value: key }
    ))

    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <Form.Field
          label='State'
          control={Select}
          onChange={(e, { value }) => this.handleSelectChange('state', value)}
          options={stateOptions}
          value={state}
          required
        />

        <Button type='submit' positive>Update</Button>
        <Button onClick={this.props.hideForm}>Cancel</Button>
      </Form>
    )
  }
}

ChangeStateForm.propTypes = {
  hideForm: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
}

export default graphql(updateLeanCoffeeState, {
  props: ({ mutate }) => ({
    submit: ({ id, state }) => mutate(
      {
        refetchQueries: [{
          query: getLeanCoffee,
          variables: { id }
        }],
        variables: {
          id,
          state
        }
      }
    ),
  }),
})(ChangeStateForm)
