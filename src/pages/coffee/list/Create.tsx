import * as React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { compose, graphql, QueryProps } from 'react-apollo'
import { createLeanCoffee, getLeanCoffees, getUser } from '../../../graphql'

class CreateLeanCoffee extends React.Component<any, any> {
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

  handleSubmit = () => {
    const { submit, data: { user } } = this.props

    submit({ userId: user.id })
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
          <Button onClick={this.handleOpen} primary >
            <Icon name='plus' /> Start new session
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

type LeanCoffee = {
  id: string;
}

type Response = {
  leanCoffee: LeanCoffee;
}

type WrappedProps = Response & QueryProps;

export default compose(
  graphql(getUser),
  graphql<Response, any, WrappedProps>(createLeanCoffee, {
    props: ({ mutate }: any) => ({
      submit: ({ userId }) => mutate(
        {
          refetchQueries: [{ query: getLeanCoffees }],
          variables: {
            userId,
            state: 'TOPIC_COLLECTION'
          }
        }
      ),
    }),
  })
)(CreateLeanCoffee)
