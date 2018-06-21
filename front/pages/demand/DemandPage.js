
/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

import React, {Component} from 'react';
import {Button, message , Input} from 'antd';
import AgTable from '~/components/AgTable';
import DemandModal from "./DemandModal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
];

@inject('demand') @observer
class DemandPage extends Component {
  async componentDidMount() {
    await this.props.demand.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected} = this.props.demand;
    return (
      <div className="base-layout">
        <header className="header">
          <div className="label">
            用户管理
            <Input.Search
              className={'search'}
              placeholder={'输入关键字搜索'}
              onSearch={(val) => this.props.demand.searchData(val)}
            />
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.demand.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.demand.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.demand.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <AgTable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="demand-table"
          pagination={this.props.demand.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.demand.onChangeSelection(keys)
          }}/>
        {showModal && (
          <DemandModal
            onCancel={() => this.props.demand.toggleModal()}
            onOk={(data) => this.props.demand.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

DemandPage.propTypes = {};
export default DemandPage;
