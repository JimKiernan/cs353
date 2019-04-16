import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class TopMenu extends React.Component {
  state = {}
  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <Menu size='massive'>
        <Menu.Item
          as={Link} to="/"
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
         as={Link} to="/dashboard"
          name='dashboard'
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
         as={Link} to="/events"
          name='events'
          active={activeItem === 'events'}
          onClick={this.handleItemClick}
        >
          Events
        </Menu.Item>
      </Menu>
    )
  }
}
export default TopMenu;

