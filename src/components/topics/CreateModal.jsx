import React, { Component } from 'react'
import { Button, Icon, Modal, } from 'semantic-ui-react'
import CreateTopicForm from './CreateForm'

class CreateTopicModal extends Component {
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
            <CreateTopicForm
              afterSubmit={this.handleClose}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default CreateTopicModal
