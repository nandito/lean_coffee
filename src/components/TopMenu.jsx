import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Input, Label, Menu } from 'semantic-ui-react'

class TopMenu extends Component {
  state = { activeItem: 'participants' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push(name)
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item header>Lean Coffee</Menu.Item>
        <Menu.Item
          name='/'
          active={activeItem === '/'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          name='/participants'
          active={activeItem === '/participants'}
          onClick={this.handleItemClick}
        >
          Participants
        </Menu.Item>

        <Menu.Item
          name='/participants/add'
          active={activeItem === '/participants/add'}
          onClick={this.handleItemClick}
        >
          Add participant
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(TopMenu)
