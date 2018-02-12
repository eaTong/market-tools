/**
 * Created by eatong on 18-2-9.
 */
import React, {Component} from 'react';
import {Button, Table, message} from 'antd';
import {getChannel, addChannel, deleteChannel, updateChannel} from './channelAction';
import ChannelModal from "./ChannelModal";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
  {title: '备注', dataIndex: 'remark', key: 'remark'},
];

class ChannelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      selectedChannels: [],
      showChannelModal: false,
      operateType: 'add'
    };
  }

  async componentDidMount() {
    await this.getChannels();
  }

  toggleChannelModal(operateType) {
    this.setState({operateType, showChannelModal: !this.state.showChannelModal});
  }

  async getChannels() {
    const {data, success} = await getChannel();
    success && this.setState({channels: data});
  }

  async saveChannel(data) {
    const {operateType, selectedChannels} = this.state;
    if (operateType === 'add') {
      const {success} = await addChannel(data);
      if (success) {
        message.success('添加用户成功');
        await this.getChannels();
        this.toggleChannelModal();
      }

    } else {
      const {success} = await updateChannel({...data, id: selectedChannels[0].id});
      if (success) {
        message.success('添加用户成功');
        await this.getChannels();
        this.toggleChannelModal();
      }
    }
  }

  async deleteChannel() {
    console.log(this.state.selectedChannels.map(channel => channel.id));
    const {success} = await deleteChannel({ids: this.state.selectedChannels.map(channel => channel.id)});
    if (success) {
      message.success('删除用户成功');
      await this.getChannels();
    }
  }

  render() {
    const {channels, showChannelModal, operateType, selectedChannels} = this.state;
    return (
      <div className="base-layout">
        <header className="header">
          <div className="label">用户管理</div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.toggleChannelModal('add')}>新建</Button>
            <Button onClick={() => this.toggleChannelModal('edit')} disabled={selectedChannels.length !== 1}>编辑</Button>
            <Button onClick={() => this.deleteChannel()} disabled={selectedChannels.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <div className="content">
          <Table
            columns={columns}
            dataSource={channels}
            rowKey="id"
            pagination={false}
            rowSelection={{
              onChange: (selectedKeys, selectedChannels) => {
                // console.log(a, b, c)
                this.setState({selectedChannels})
              }
            }}/>
        </div>
        {showChannelModal && (
          <ChannelModal
            onCancel={() => this.toggleChannelModal()}
            onOk={(data) => this.saveChannel(data)}
            operateType={operateType}
            formData={selectedChannels[0]}
          />
        )}
      </div>
    );
  }
}

ChannelPage.propTypes = {};
export default ChannelPage;
