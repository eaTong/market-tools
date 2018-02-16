/**
 * Created by eatong on 18-2-9.
 */
import React, {Component} from 'react';
import {Button, Table, message} from 'antd';
import {getUser, addUser, deleteUser, updateUser} from './userAction';
import UserModal from "./UserModal";

const ButtonGroup = Button.Group;
const columns = [
  {title: '姓名', dataIndex: 'name', key: 'name'},
  {title: '账号', dataIndex: 'account', key: 'account'},
];

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUsers: [],
      showUserModal: false,
      operateType: 'add'
    };
  }

  async componentDidMount() {
    await this.getUsers();
  }

  toggleUserModal(operateType) {
    this.setState({operateType, showUserModal: !this.state.showUserModal});
  }

  async getUsers() {
    const {data, success} = await getUser();
    success && this.setState({users: data});
  }

  async saveUser(data) {
    const {operateType, selectedUsers} = this.state;
    if (operateType === 'add') {
      const {success} = await addUser(data);
      if (success) {
        message.success('添加用户成功');
        await this.getUsers();
        this.toggleUserModal();
      }

    } else {
      const {success} = await updateUser({...data, id: selectedUsers[0].id});
      if (success) {
        message.success('添加用户成功');
        await this.getUsers();
        this.toggleUserModal();
      }
    }
  }

  async deleteUser() {
    const {success} = await deleteUser({ids: this.state.selectedUsers.map(user => user.id)});
    if (success) {
      message.success('删除用户成功');
      await this.getUsers();
    }
  }

  render() {
    const {users, showUserModal, operateType, selectedUsers} = this.state;
    return (
      <div className="base-layout">
        <header className="header">
          <div className="label">用户管理</div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.toggleUserModal('add')}>新建</Button>
            <Button onClick={() => this.toggleUserModal('edit')} disabled={selectedUsers.length !== 1}>编辑</Button>
            <Button onClick={() => this.deleteUser()} disabled={selectedUsers.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <div className="content">
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={false}
            rowSelection={{
              onChange: (selectedKeys, selectedUsers) => {
                this.setState({selectedUsers})
              }
            }}/>
        </div>
        {showUserModal && (
          <UserModal
            onCancel={() => this.toggleUserModal()}
            onOk={(data) => this.saveUser(data)}
            operateType={operateType}
            formData={selectedUsers[0]}
          />
        )}
      </div>
    );
  }
}

UserPage.propTypes = {};
export default UserPage;
