import * as React from 'react'
import { withRouter, IInjectedProps } from 'react-router'
import { Menu } from 'semantic-ui-react'
import AuthControl from './AuthControl'

interface State {
  activeItem: string;
}

class Navbar extends React.Component<IInjectedProps, State> {
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
      <Menu stackable={true}>
        <Menu.Item header={true}>Lean Coffee</Menu.Item>
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
