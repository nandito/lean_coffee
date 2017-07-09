import React, { Component, PropTypes } from 'react'
import { Button, Form, Select } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'

class CreateLeanCoffee extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      hostId: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.submit(this.state.name)
    this.setState({ name: '' })
  }

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field
          label='Host'
          control={Select}
          onChange={(e, { value }) => this.handleSelectChange('hostId', value)}
          options={[{ key: 'af', value: 'af', text: 'Afghanistan' }]}
          placeholder='Select host'
        />

        <Form.Field
          label='State'
          control={Select}
          onChange={(e, { value }) => this.handleSelectChange('state', value)}
          options={LEAN_COFFEE_STATES}
          placeholder='Select state'
        />

        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

const LEAN_COFFEE_STATES = [
  { text: 'Topic collection', value: 'TOPIC_COLLECTION' },
  { text: 'Topic voting', value: 'TOPIC_VOTING' },
  { text: 'Discussion', value: 'DISCUSSION' },
]

CreateLeanCoffee.propTypes = {
  submit: PropTypes.func.isRequired
}

const submitLeanCoffee = gql`
  mutation {
    createLeanCoffee(hostId: "cj3ylixq5ifr30136mfzawkk3", state: TOPIC_COLLECTION) {
      id
    }
  }
`
export default graphql(submitLeanCoffee, {
  // props: ({ mutate }) => ({
  //   submit: (name) => mutate({ variables: { hostId } }),
  // }),
})(CreateLeanCoffee)
