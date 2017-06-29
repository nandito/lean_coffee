import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Menu } from 'semantic-ui-react'

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

        <Menu.Item
          name='/coffees/add'
          active={activeItem === '/coffees/add'}
          onClick={this.handleItemClick}
        >
          Add Lean Coffee
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(TopMenu)
