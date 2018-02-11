/**
 * Created by eatong on 18-2-11.
 */
import React from 'react';
import {Layout, Menu, Icon} from 'antd';

const {Header, Content, Sider} = Layout;

const AdminLayout = props => {
  return (
    <Layout className="layout">
      <Sider breakpoint="md">
        <Menu
          theme="dark"
          selectedKeys={[window.location.pathname]}
          onClick={({key}) => {
            props.history.push(key);
          }}
        >
          <Menu.Item key="/admin/user"> <Icon type="user"/><span>用户管理</span></Menu.Item>
        </Menu>
      </Sider>
      <Content>
        {props.children}
      </Content>
    </Layout>
  )
};
AdminLayout.propsType = {};

export default AdminLayout;
