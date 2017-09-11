import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Menu } from 'semantic-ui-react'
import AuthControl from './AuthControl'

class Navbar extends Component {
  state = { activeItem: 'participants' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push(name)
  }

  isLoggedIn = () => {
    return this.props.data.user
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

        { this.isLoggedIn() &&
          <Menu.Item
            name='/participants'
            active={activeItem === '/participants'}
            onClick={this.handleItemClick}
          >
            Participants
          </Menu.Item>
        }

        { this.isLoggedIn() &&
          <Menu.Item
            name='/coffees'
            active={activeItem === '/coffees'}
            onClick={this.handleItemClick}
          >
            Lean Coffees
          </Menu.Item>
        }

        <AuthControl data={this.props.data} />
      </Menu>
    )
  }
}

export default withRouter(Navbar)
