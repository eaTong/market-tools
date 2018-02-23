/**
 * Created by eatong on 18-2-11.
 */
import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd'
import ajax from '../util/ajaxUtil';

const {Content, Sider} = Layout;

class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: []
    };
  }

  async componentWillMount() {
    const {success, data} = await ajax({url: '/api/menu/authorised'});
    success && this.setState({menus: data})
  }

  onSelectMenu({key}) {
    window.localStorage.setItem('lastUrl', key);
    this.props.history.push(key);
  }

  renderMenus() {
    return this.state.menus.map(menu => (
      <Menu.Item key={menu.path}>
        <Icon type={menu.icon}/>
        <span>{menu.name}</span>
      </Menu.Item>
    ))
  }

  render() {
    return (
      <Layout className="layout">
        <Sider breakpoint="lg">
          <Menu
            theme="dark"
            selectedKeys={[window.location.pathname]}
            onClick={this.onSelectMenu.bind(this)}
          >
            {this.renderMenus()}
          </Menu>
          <div className='personal-info'>
            <span className="welcom">欢迎您：</span>
            <span className="user">{}</span>
          </div>
        </Sider>
        <Content>
          {this.props.children}
        </Content>
      </Layout>
    )
  }
}

AdminLayout.propsType = {};

export default AdminLayout;
