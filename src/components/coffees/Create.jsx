import React, { Component, PropTypes } from 'react'
import { Button, Form, Select } from 'semantic-ui-react'
import { compose, gql, graphql } from 'react-apollo'
import { getParticipants } from '../../queries/participant'

class CreateLeanCoffee extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hostId: '',
      state: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { hostId, state } = this.state

    this.props.submit({ hostId, state })
    this.setState({
      hostId: '',
      state: '',
    })
  }

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { data } = this.props
    let hostOptions = []

    if (!data.loading && data.allParticipants) {
      hostOptions = hostDataToOptions(data.allParticipants)
    }

    return (
      <Form
        loading={data.loading}
        onSubmit={this.handleSubmit}
      >
        <Form.Field
          label='Host'
          control={Select}
          onChange={(e, { value }) => this.handleSelectChange('hostId', value)}
          options={hostOptions}
          placeholder='Select host'
          required
        />

        <Form.Field
          label='State'
          control={Select}
          onChange={(e, { value }) => this.handleSelectChange('state', value)}
          options={LEAN_COFFEE_STATES}
          placeholder='Select state'
          required
        />

        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

CreateLeanCoffee.propTypes = {
  data: PropTypes.object.isRequired,
}

const hostDataToOptions = (allParticipants) => (
  allParticipants.map(participant => (
    { value: participant.id, text: participant.name }
  ))
)

const LEAN_COFFEE_STATES = [
  { text: 'Topic collection', value: 'TOPIC_COLLECTION' },
  { text: 'Topic voting', value: 'TOPIC_VOTING' },
  { text: 'Discussion', value: 'DISCUSSION' },
]

const submitLeanCoffee = gql`
  mutation createLeanCoffee($hostId: ID!, $state: LEAN_COFFEE_STATE!) {
    createLeanCoffee(hostId: $hostId, state: $state) {
      id
    }
  }
`

export default compose(
  graphql(getParticipants),
  graphql(submitLeanCoffee, {
    props: ({ mutate }) => ({
      submit: ({ hostId, state }) => mutate(
        {
          variables: {
            hostId,
            state
          }
        }
      ),
    }),
  })
)(CreateLeanCoffee)
