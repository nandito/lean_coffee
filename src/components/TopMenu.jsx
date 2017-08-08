import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Menu } from 'semantic-ui-react'
import AuthControl from './menu/AuthControl'

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
          name='/coffees'
          active={activeItem === '/coffees'}
          onClick={this.handleItemClick}
        >
          Lean Coffees
        </Menu.Item>

        <AuthControl data={this.props.data} />
      </Menu>
    )
  }
}

export default withRouter(TopMenu)
