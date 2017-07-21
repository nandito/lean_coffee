import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Icon, Modal, Select } from 'semantic-ui-react'
import { compose, graphql } from 'react-apollo'
import { createLeanCoffee, getLeanCoffees, getParticipants } from '../../graphql'

// TODO: split component: get the list of participants only when the modal is opened
class CreateLeanCoffee extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hostId: '',
      modalOpen: false,
      state: '',
    }
  }

  handleOpen = (e) => this.setState({
    modalOpen: true,
  })

  handleClose = (e) => this.setState({
    modalOpen: false,
  })

  handleSubmit = (event) => {
    event.preventDefault()
    const { hostId, state } = this.state

    this.props.submit({ hostId, state })
    this.setState({
      hostId: '',
      modalOpen: false,
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
      <Modal
        trigger={
          <Button onClick={this.handleOpen}>
            <Icon name='coffee' circular /> Add Lean Coffee
          </Button>
        }
        closeIcon
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
          <Icon name='coffee' circular /> Add Lean Coffee
        </Modal.Header>

        <Modal.Content>
          <Modal.Description>
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
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

CreateLeanCoffee.propTypes = {
  data: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
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

export default compose(
  graphql(getParticipants),
  graphql(createLeanCoffee, {
    props: ({ mutate }) => ({
      submit: ({ hostId, state }) => mutate(
        {
          refetchQueries: [{ query: getLeanCoffees }],
          variables: {
            hostId,
            state
          }
        }
      ),
    }),
  })
)(CreateLeanCoffee)
