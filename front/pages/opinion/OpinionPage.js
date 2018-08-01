
/**
 * Created by eaTong on 2018-01-08 .
 * Description: auto generated in  2018-01-08
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import AgTable from '~/components/AgTable';
import OpinionModal from "./OpinionModal";
import {inject, observer} from "mobx-react";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', dataIndex: 'name', key: 'name'},
];

@inject('opinion') @observer
class OpinionPage extends Component {
  async componentDidMount() {
    await this.props.opinion.getDataList();
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected} = this.props.opinion;
    return (
      <div className="base-layout opinion-page">
        <header className="header">
          <div className="label">
            用户管理
            <Input.Search
              className={'search'}
              placeholder={'输入关键字搜索'}
              onSearch={(val) => this.props.opinion.searchData(val)}
            />
          </div>
          <ButtonGroup className="buttons">
            <Button onClick={() => this.props.opinion.toggleModal('add')}>新建</Button>
            <Button onClick={() => this.props.opinion.toggleModal('edit')}
                    disabled={selectedKeys.length !== 1}>编辑</Button>
            <Button onClick={() => this.props.opinion.deleteData()} disabled={selectedKeys.length === 0}>删除</Button>
          </ButtonGroup>
        </header>
        <AgTable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="opinion-table"
          pagination={this.props.opinion.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => this.props.opinion.onChangeSelection(keys)
          }}/>
        {showModal && (
          <OpinionModal
            onCancel={() => this.props.opinion.toggleModal()}
            onOk={(data) => this.props.opinion.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

OpinionPage.propTypes = {};
export default OpinionPage;
  