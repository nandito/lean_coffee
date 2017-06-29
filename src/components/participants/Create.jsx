import React, { Component, PropTypes } from 'react'
import { Button, Form, Header, Icon, Modal, } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'

class CreateParticipant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
      name: '',
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
    this.props.submit(this.state.name)
    this.setState({
      modalOpen: false,
      name: '',
    })
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <Modal
        trigger={
          <Button onClick={this.handleOpen}>
            <Icon name='add user' circular /> Add participant
          </Button>
        }
        closeIcon
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
          <Icon name='add user' circular /> Add participant
        </Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' onChange={this.handleChange} value={this.state.name} />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

CreateParticipant.propTypes = {
  submit: PropTypes.func.isRequired
}

const submitParticipant = gql`
  mutation createParticipant($name: String!) {
    createParticipant(name: $name) {
      id,
      name
    }
  }
`
export default graphql(submitParticipant, {
  props: ({ mutate }) => ({
    submit: (name) => mutate({
      refetchQueries: [
        {
          query: gql`
            query {
              allParticipants {
                id,
                name,
              }
            }
          `
        }
      ],
      variables: { name }
    }),
  }),
})(CreateParticipant)
