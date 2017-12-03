import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu } from 'semantic-ui-react'
import AuthControl from './AuthControl'
import { getUserQuery } from '../../schema'

enum NavItems {
  Home = '/',
  Participants = '/participants',
  Coffees = '/coffees',
}

interface State {
  activeItem: NavItems;
}

interface Props {
  data: {
    loading: boolean;
    user: getUserQuery['user'];
  }
}

class Navbar extends React.Component<Props & RouteComponentProps<{}>, State> {
  state = { activeItem: NavItems.Home }

  handleItemClick = (e, { name }: { name: NavItems }): void => {
    this.setState({ activeItem: name })
    this.props.history.push(name)
  }

  isLoggedIn = (): boolean => this.props.data.user !== null

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable={true}>
        <Menu.Item header={true}>Lean Coffee</Menu.Item>
        <Menu.Item
          name={NavItems.Home}
          active={activeItem === NavItems.Home}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        { this.isLoggedIn() &&
          <Menu.Item
            name={NavItems.Participants}
            active={activeItem === NavItems.Participants}
            onClick={this.handleItemClick}
          >
            Participants
          </Menu.Item>
        }

        { this.isLoggedIn() &&
          <Menu.Item
            name={NavItems.Coffees}
            active={activeItem === NavItems.Coffees}
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

export default withRouter<Props>(Navbar)
