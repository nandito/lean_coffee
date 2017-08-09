import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import { compose, graphql } from 'react-apollo'
import { createLeanCoffee, getLeanCoffees, getUser } from '../../graphql'

// TODO: split component: get the list of participants only when the modal is opened
class CreateLeanCoffee extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
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
    const { submit, data: { user } } = this.props

    submit({ userId: user.id, state: 'TOPIC_COLLECTION' })
    this.setState({
      modalOpen: false,
    })
  }

  render() {
    const { data } = this.props

    if (data.loading) return null

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
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' disabled value={data.user.name} />
              </Form.Field>
              <Form.Field>
                <label>State</label>
                <input placeholder='Name' disabled value='Topic collection' />
              </Form.Field>
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

export default compose(
  graphql(getUser),
  graphql(createLeanCoffee, {
    props: ({ mutate }) => ({
      submit: ({ userId, state }) => mutate(
        {
          refetchQueries: [{ query: getLeanCoffees }],
          variables: {
            userId,
            state
          }
        }
      ),
    }),
  })
)(CreateLeanCoffee)
