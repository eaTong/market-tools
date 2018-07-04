/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

import React, {Component} from 'react';
import {Button, message, Input, Select} from 'antd';
import {AgTable, DataRow, DataGrid, PicList} from '~/components';
import DemandModal from "./DemandModal";
import {inject, observer} from "mobx-react";
import {getDemandType, demandType} from 'public/constants';
import './demand.less'
import AgreeModal from "~/pages/demand/AgreeModal";
import RefuseModal from "~/pages/demand/RefuseModal";
import {getUrlList} from "~/util/util";

const ButtonGroup = Button.Group;
const Option = Select.Option;

const columns = [
  {title: '需求内容', dataIndex: 'content', pinned: true, checkDetail: true},
  {title: '提出人', dataIndex: 'demander'},
  {title: '需求类型', dataIndex: 'type', render: (type) => getDemandType(type).label},
  {title: '提出部门', dataIndex: 'department'},
  {title: '所属客户', dataIndex: 'customerName'},
  {title: '需求背景', dataIndex: 'why'},
  {title: '提出时间', dataIndex: 'date'},
  {
    title: '需求状态', dataIndex: 'status', render: (text, data) => {
      switch (text) {
        case 0:
          return (<span className="status-cell initial">待处理</span>
          );
        case 1:
          return <span className="status-cell agree">同意</span>;
        case 2:
          return <span className="status-cell refuse">拒绝</span>;
      }
    }
  }
];

@inject('demand') @observer
class DemandPage extends Component {
  async componentDidMount() {
    await this.props.demand.getDataList();
  }

  renderDetail() {
    const demand = this.props.demand.detail;
    return (
      <DataGrid>
        <DataRow label="提出人">{demand.demander}</DataRow>
        <DataRow label="需求类型">{getDemandType(~~demand.type).label}</DataRow>
        <DataRow label="提出部门">{demand.department}</DataRow>
        <DataRow label="所属客户">{demand.customerName}</DataRow>
        <DataRow label="需求内容">{demand.content}</DataRow>
        <DataRow label="需求背景">{demand.why}</DataRow>
        <DataRow label="提出时间">{demand.date}</DataRow>
        <DataRow label="相关照片">
          <PicList urlList={getUrlList(demand.images)}/>
        </DataRow>
        <DataRow label='状态'>
          {demand.status === 0 && <span className="info-text">待决定</span>}
          {demand.status === 1 && <div>
            <p className="status">

              <span className="success-text">已同意</span>
              <span className="info-text">{`(预计发布：${demand.expectedPublish})`}</span>
            </p>
            <p>{`备注：${demand.comments}`}</p>
          </div>}
          {demand.status === 2 && <span>
            <span className="error-text">已拒绝</span>
            <span className="info-text">{`(拒绝原因：${demand.refuseReason})`}</span>
          </span>
          }
          {demand.status === 3 && <span>
            <span className="error-text">已发布</span>
            <span className="info-text">{`(发布日期：${demand.actualPublish})`}</span>
          </span>
          }
        </DataRow>
      </DataGrid>
    )
  }

  renderAdditionalTool() {
    const demand = this.props.demand.detail;

    if (demand.status === 0) {

      return [(
        <Button key="agree" type="primary" onClick={() => this.props.demand.toggleAgreeModal()}>同意</Button>),
        (<Button key="refuse" type="danger" onClick={() => this.props.demand.toggleRefuseModal()}>拒绝</Button>)
      ];
    }
  }

  render() {
    const {dataList, operateType, showModal, selectedKeys, rowSelection, firstSelected, queryOption, showAgreeModal, showRefuseModal} = this.props.demand;
    return (
      <div className="base-layout demand-page">
        <header className="header">
          <div className="label">
            需求管理
          </div>
          <div className="search-filter">
            <Input.Search
              placeholder={'输入关键字搜索'}
              onChange={(event) => this.props.demand.onChangeQueryOption('status', event.target.value)}
            />
            <Select
              value={queryOption.status}
              onChange={(value) => this.props.demand.onChangeQueryOption('status', value)}
            >
              <Option value={-1} key={-1}>全部</Option>
              <Option value={0} key={0}>未处理</Option>
              <Option value={1} key={1}>已同意</Option>
              <Option value={2} key={2}>已拒绝</Option>
            </Select>
            <Button onClick={() => this.props.demand.searchData()} className="search">查询</Button>
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
          renderDetail={(detail, index) => this.renderDetail(detail, index)}
          renderAdditionalTool={(detail, index) => this.renderAdditionalTool(detail, index)}
          pagination={this.props.demand.pagination}

          onChangeDetail={(detail) => this.props.demand.onChangeDetail(detail)}
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
        {showAgreeModal && (
          <AgreeModal
            onCancel={() => this.props.demand.toggleAgreeModal()}
            onOk={(data) => this.props.demand.agree(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
        {showRefuseModal && (
          <RefuseModal
            onCancel={() => this.props.demand.toggleRefuseModal()}
            onOk={(data) => this.props.demand.refuse(data)}
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
