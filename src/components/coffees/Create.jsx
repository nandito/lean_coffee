import React, { Component, PropTypes } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'

class CreateLeanCoffee extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.submit(this.state.name)
    this.setState({ name: '' })
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' onChange={this.handleChange} value={this.state.name} />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

CreateLeanCoffee.propTypes = {
  submit: PropTypes.func.isRequired
}

const submitLeanCoffee = gql`
  mutation { createLeanCoffee(hostId: "cj3ylixq5ifr30136mfzawkk3", state: TOPIC_COLLECTION) {id, host {id, name}, state} }
`
export default graphql(submitLeanCoffee, {
  // props: ({ mutate }) => ({
  //   submit: (name) => mutate({ variables: { hostId } }),
  // }),
})(CreateLeanCoffee)
