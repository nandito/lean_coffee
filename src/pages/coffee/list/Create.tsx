import * as React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { compose, ChildProps, graphql } from 'react-apollo'
import { createLeanCoffee, getLeanCoffees, getUser } from '../../../graphql'
import { getUserQuery } from '../../../schema'

interface CreateLeanCoffeeProps {
  data: {
    loading: boolean;
    user: getUserQuery['user']
  };
  submit: Function
}

type State = {
  modalOpen: boolean;
}

type WrappedProps = ChildProps<CreateLeanCoffeeProps, getUserQuery>

class CreateLeanCoffee extends React.Component<WrappedProps, State> {
  constructor(props: WrappedProps) {
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

  handleSubmit = () => {
    const { submit, data: { user } } = this.props

    if (user && user.id) {
      submit({ userId: user.id })
      this.setState({ modalOpen: false })
    }
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return null
    }

    return (
      <Modal
        trigger={
          <Button onClick={this.handleOpen} primary={true} >
            <Icon name='plus' /> Start new session
          </Button>}
        closeIcon={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
          <Icon name='coffee' circular={true} /> Add Lean Coffee
        </Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <p>Do you want to start a new Lean Coffee session?</p>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button color='red' onClick={this.handleClose}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={this.handleSubmit}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default compose(
  graphql<getUserQuery>(getUser),
  graphql(createLeanCoffee, {
    props: ({ mutate }) => ({
      submit: ({ userId }) => {
        if (mutate) {
          mutate(
            {
              refetchQueries: [{ query: getLeanCoffees }],
              variables: {
                userId,
                state: 'TOPIC_COLLECTION'
              }
            }
          )
        }
      },
    }),
  })
)(CreateLeanCoffee)
