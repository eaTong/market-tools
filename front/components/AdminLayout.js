/**
 * Created by eatong on 18-2-11.
 */
import React from 'react';
import {Layout, Menu, Icon} from 'antd';

const {Header, Content, Sider} = Layout;

const AdminLayout = props => {
  return (
    <Layout className="layout">
      <Sider breakpoint="lg">
        <Menu
          theme="dark"
          selectedKeys={[window.location.pathname]}
          onClick={({key}) => {
            window.localStorage.setItem('lastUrl', key);
            props.history.push(key);
          }}
        >
          <Menu.Item key="/admin/record"> <Icon type="download"/><span>数据录入</span></Menu.Item>
          <Menu.Item key="/admin/dashboard/monthly"> <Icon type="line-chart"/><span>月度统计</span></Menu.Item>
          {/*<Menu.Item key="/admin/dashboard/conversion"> <Icon type="pie-chart"/><span>转单率分析</span></Menu.Item>*/}
          <Menu.Item key="/admin/channel"> <Icon type="share-alt"/><span>渠道管理</span></Menu.Item>
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
