import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Button, Form, Header, Icon, Modal, Select, } from 'semantic-ui-react'
import { createTopic, getTopics } from '../../graphql'

class CreateTopic extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
      name: '',
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
    const { name, state } = this.state

    this.props.submit(name, state)
    this.setState({
      modalOpen: false,
      name: '',
      state: '',
    })
  }

  handleInputChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <Modal
        trigger={
          <Button floated='right' icon onClick={this.handleOpen}>
            <Icon name='add' /> Add Topic
          </Button>
        }
        closeIcon
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
          Add topic
        </Modal.Header>

        <Modal.Content>
          <Modal.Description>
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
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

CreateTopic.propTypes = {
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
})(CreateTopic)
