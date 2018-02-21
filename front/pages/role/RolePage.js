/**
 * Created by eatong on 18-2-9.
 */
import React, {Component} from 'react';
import {Button, Table, message} from 'antd';
import {getRole, addRole, deleteRole, updateRole, grantMenus} from './roleAction';
import RoleModal from "./RoleModal";
import GrantMenuModal from "./GrantMenuModal";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
  {title: '备注', dataIndex: 'remark', key: 'remark'},
];

class RolePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      selectedRoles: [],
      showRoleModal: false,
      showGrantModal: false,
      operateType: 'add'
    };
  }

  async componentDidMount() {
    await this.getRoles();
  }

  toggleRoleModal(operateType) {
    this.setState({operateType, showRoleModal: !this.state.showRoleModal});
  }

  toggleGrantModal() {
    this.setState({showGrantModal: !this.state.showGrantModal});
  }

  async getRoles() {
    const {data, success} = await getRole();
    success && this.setState({roles: data});
  }

  async saveGrant(opts) {
    // console.log(data);
    const {success, data} = await grantMenus(opts);
    if (success) {
      this.setState({selectedRoles: []});
      this.toggleGrantModal();
      message.success('授权成功');
      await this.getRoles();
    }

  }

  async saveRole(data) {
    const {operateType, selectedRoles} = this.state;
    if (operateType === 'add') {
      const {success} = await addRole(data);
      if (success) {
        message.success('添加角色成功');
        await this.getRoles();
        this.toggleRoleModal();
      }

    } else {
      const {success} = await updateRole({...data, id: selectedRoles[0].id});
      if (success) {
        message.success('编辑角色成功');
        await this.getRoles();
        this.toggleRoleModal();
      }
    }
  }

  async deleteRole() {
    const {success} = await deleteRole({ids: this.state.selectedRoles.map(role => role.id)});
    if (success) {
      message.success('删除用户成功');
      await this.getRoles();
    }
  }

  render() {
    const {roles, showRoleModal, showGrantModal, operateType, selectedRoles} = this.state;
    return (
      <div className="base-layout">
        <header className="header">
          <div className="label">用户管理</div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.toggleRoleModal('add')}>新建</Button>
            <Button onClick={() => this.toggleRoleModal('edit')} disabled={selectedRoles.length !== 1}>编辑</Button>
            <Button onClick={() => this.deleteRole()} disabled={selectedRoles.length === 0}>删除</Button>
            <Button onClick={() => this.toggleGrantModal()} disabled={selectedRoles.length !== 1}>分配菜单</Button>

          </ButtonGroup>
        </header>
        <div className="content">
          <Table
            columns={columns}
            dataSource={roles}
            rowKey="id"
            pagination={false}
            rowSelection={{
              selectedRowKeys: selectedRoles.map(role => role.id),
              onChange: (selectedKeys, selectedRoles) => {
                this.setState({selectedRoles})
              }
            }}/>
        </div>
        {showRoleModal && (
          <RoleModal
            onCancel={() => this.toggleRoleModal()}
            onOk={(data) => this.saveRole(data)}
            operateType={operateType}
            formData={selectedRoles[0]}
          />
        )}
        {showGrantModal && (
          <GrantMenuModal
            onCancel={() => this.toggleGrantModal()}
            onOk={(data) => this.saveGrant(data)}
            formData={selectedRoles[0]}
          />
        )}
      </div>
    );
  }
}

RolePage.propTypes = {};
export default RolePage;
