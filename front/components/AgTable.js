/**
 * Created by eaTong on 2018/6/17 .
 * Description:
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Pagination, Button, Modal, Switch, Checkbox, Tooltip, Radio, Icon} from 'antd';
import {AgGridReact} from "ag-grid-react";
import {sortable} from 'react-sortable';
import {v4} from 'uuid';
import agLocal from '~/util/agLocal';

const defaultColumn = {
  minWidth: 50,
  width: 100
};

class AgTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [],
      showSortModal: false,
      selectedCount: 0,
      showDetail: false,
      detailIndex: -1
    };
    this.columnIndexMap = {};
    this.selectedKeys = [];
    this.unionKey = v4();
    this.multipleSelectRow = {
      headerName: "　",
      field: '__checked',
      colId: '__checked',
      width: 30,
      minWidth: 30,
      pinned: true,
      cellRendererFramework: (item) => {
        const key = this.getKey(item.data);
        const checked = this.selectedKeys.indexOf(key) !== -1;

        return (
          <Checkbox
            key={key + JSON.stringify(checked)}
            disabled={(this.props.disabledKeys || []).indexOf(key) !== -1}
            defaultChecked={checked}
            onChange={this.onSelectionChange.bind(this, item)}
          />
        )
      }
    };
    this.singleSelectRow = {
      headerName: "　",
      field: '__radio',
      colId: '__radio',
      width: 30,
      minWidth: 30,
      pinned: true,
      cellRendererFramework: (item) => {
        const key = this.getKey(item.data);
        const checked = this.selectedKeys.indexOf(key) !== -1 && item.data.__radio;
        return (
          <Radio
            name={this.unionKey}
            key={key + JSON.stringify(checked)}
            disabled={(this.props.disabledKeys || []).indexOf(key) !== -1}
            checked={checked}
            onChange={this.onSelectionChange.bind(this, item)}
          />
        )
      }
    };
  }

  componentWillMount() {

    const {props} = this;
    const {rowSelection} = props;
    //如果有数据，且可选择，需要处理数据选择的问题。
    if (props.dataSource.length > 0 && rowSelection) {
      if (rowSelection.defaultCheckedKey && rowSelection.defaultCheckedKey.length > 0) {
        this.resetSelection(rowSelection.defaultCheckedKey);
      } else if (rowSelection.selectedRowKeys && rowSelection.selectedRowKeys.length > 0) {
        this.resetSelection(rowSelection.selectedRowKeys);
      }
    }
    this.initColumns(this.props);
  }

  componentWillReceiveProps(nextProp) {
    const defChanged = this.props.columnDefs && this.props.columnDefs.length !== nextProp.columnDefs.length;
    const columnChanged = this.props.columns && this.props.columns.length !== nextProp.columns.length;
    if (defChanged || columnChanged) {
      this.initColumns(nextProp);
    }

    const {selectedRowKeys} = this.getSelected();
    const propsHasSelection = nextProp.rowSelection && nextProp.rowSelection.selectedRowKeys;
    const selectionChanged = propsHasSelection && JSON.stringify(nextProp.rowSelection.selectedRowKeys) !== JSON.stringify(selectedRowKeys);
    const dataChanged = this.props.dataSource.length !== nextProp.dataSource.length ||
      this.getKeys(this.props.dataSource).toString() !== this.getKeys(nextProp.dataSource).toString();

    if (propsHasSelection && (selectionChanged || dataChanged)) {
      this.resetSelection(nextProp.rowSelection.selectedRowKeys, nextProp.dataSource);
      this.columnApi && this.columnApi.resetColumnState();
    }

  }

  resetSelection(keys, dataSource) {
    this.selectedKeys = [];
    this.getDataSource(dataSource).forEach((item, index) => {
      const key = this.getKey(item);
      if (keys.indexOf(key) !== -1) {
        this.selectedKeys.push(key);
      }
    });
    this.setState({selectedCount: this.selectedKeys.length});
    this.columnApi && this.columnApi.resetColumnState();
  }

  initColumns(props) {
    //预处理 ColumnDefs
    let columnDefs = this.state.columnDefs;
    if (props.columnDefs) {
      columnDefs = this.getRowColumns(props, props.columnDefs);
    } else if (props.columns) {
      const columns = props.columns.map((column) => {
        return {
          headerName: column.title,
          pinned: column.pinned,
          field: column.children ? undefined : column.dataIndex,
          colId: column.key || column.field || column.colId || column.dataIndex,
          hide: column.hide,
          width: column.children ? undefined : (parseInt(column.width) || defaultColumn.width),
          cellRendererFramework: AgTable.getCellRenderer.bind(this, column.render, column.checkDetail),
          children: !column.children ? undefined : column.children.map(child => {
            return {
              headerName: child.title,
              field: child.dataIndex,
              colId: child.key || child.field || child.dataIndex,
              pinned: child.pinned,
              width: child.width || defaultColumn.width,
              hide: column.hide,
              cellRendererFramework: AgTable.getCellRenderer.bind(this, child.render, column.checkDetail)
            }
          })
        }
      });
      columnDefs = this.getRowColumns(props, columns);
    }
    this.setState({columnDefs}, this.initMap);
  }

  getRowColumns(props, columns) {
    return props.rowSelection ? [props.rowSelection.type === 'radio' ? this.singleSelectRow : this.multipleSelectRow, ...columns] : columns;
  }

  initMap() {
    this.columnIndexMap = {};
    for (let index in this.state.columnDefs) {
      const column = this.state.columnDefs[index];
      if (this.columnIndexMap[column.colId]) {
        console.error('colId(key ) should be union , but you passed more then one colId(key):' + column.colId);
      }
      this.columnIndexMap[column.colId] = [~~index];
      if (column.children) {
        for (let childIndex in column.children) {
          if (this.columnIndexMap[column.children[childIndex].colId]) {
            console.error('colId(key ) should be union , but you passed more then one colId(key):' + column.children[childIndex].colId);
          }
          this.columnIndexMap[column.children[childIndex].colId] = [~~index, ~~childIndex];
        }
      }
    }
  }

  getDataSource(data) {
    return (data || this.props.dataSource || this.props.rowData || []).map((item, index) => {
      return {...item, __index: index}
    })
  }

  getKeys(data) {
    return (data || []).map(item => this.getKey(item));
  }

  getKey(data) {
    return this.props.rowKey ?
      (typeof this.props.rowKey === 'string' ? data[this.props.rowKey] : this.props.rowKey(data)) :
      data.key || data.id;

  }

  static getCellRenderer(func, checkDetail, item) {
    let result;
    if (func) {
      result = func(item.value, item.data, item.data.__index);
      result = result === 0 ? ('' + result) : result;
      result = typeof result === 'object' ? result : (<Tooltip title={result} trigger="click">{result}</Tooltip>)
    } else {
      result = (item.value === 0 ? item.value + '' : item.value) || '';

    }

    return (
      <Tooltip placement="topLeft" title={result} trigger={checkDetail ? "hover" : "click"}>
        <span
          className={checkDetail ? 'check-detail' : ''}
          onClick={checkDetail ? () => {
            const isCurrent = item.data.__index === this.state.detailIndex;
            this.onChangeDetail(!isCurrent, isCurrent ? -1 : item.data.__index);
          } : null}
        >
          {result}
          </span>
      </Tooltip>);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.props.onGridReady && this.props.onGridReady(params);
    if (this.props.tableId) {
      const config = window.localStorage.getItem(this.props.tableId + 'table-config');
      this.updateColumns(config ? JSON.parse(config) : undefined);
    }
  }

  onChangeDetail(value, detailIndex) {
    this.setState({detailIndex, showDetail: typeof value === 'undefined' ? !this.state.showDetail : value});
    this.props.onChangeDetail && this.props.onChangeDetail(this.getDataSource()[detailIndex], detailIndex);
  }

  onSelectionChange(item, event) {
    const checked = event.target.checked;
    if (this.props.rowSelection.type === 'radio') {

      const {selectedRows} = this.getSelected();

      if (this.selectedKeys.length > 0) {
        this.gridApi.getRowNode(this.selectedKeys[0]).setData({
          ... selectedRows[0],
          __radio: false
        });
      }
      this.selectedKeys.splice(0, 1, this.getKey(item.data));
      this.gridApi.getRowNode(this.getKey(item.data)).setData({...item.data, __radio: true});
    } else {
      if (checked) {
        this.selectedKeys.push(this.getKey(item.data));
      } else {
        this.selectedKeys = this.selectedKeys.filter(key => this.getKey(item.data) !== key);
      }
    }

    this.setState({selectedCount: this.selectedKeys.length});

    const {selectedRowKeys, selectedRows} = this.getSelected();
    const {rowSelection} = this.props;
    rowSelection.onChange && rowSelection.onChange(selectedRowKeys, selectedRows);
    rowSelection.onSelect && rowSelection.onSelect(item.data, checked, selectedRows);
  }

  selectAll(event) {
    if (event.target.checked) {
      this.selectedKeys = this.getKeys(this.getDataSource());
    } else {
      this.selectedKeys = [];
    }
    this.setState({selectedCount: this.selectedKeys.length});
    this.columnApi.resetColumnState();

    //回调onChange
    const {selectedRowKeys, selectedRows} = this.getSelected();
    this.props.rowSelection.onChange && this.props.rowSelection.onChange(selectedRowKeys, selectedRows);

  }

  getSelected() {
    const selectedRows = this.getDataSource().filter((item, index) => this.selectedKeys.indexOf(this.getKey(item)) !== -1);
    const selectedRowKeys = this.selectedKeys;
    return {selectedRowKeys, selectedRows};
  }

  onColumnResized(event) {
    if (event && event.type && event.type === 'columnResized' && event.finished) {
      const column = event.column;
      const columnDefs = this.state.columnDefs;
      const indexMap = this.columnIndexMap[column.colId];
      if (indexMap.length === 1) {
        columnDefs[indexMap].width = column.actualWidth;
      }
      this.setState({columnDefs});
      this.updateCache();
    }
  }

  onChangeSort(sortItems, hiddenItems, pinnedItems) {
    const columnDefs = [...pinnedItems, ...sortItems, ...hiddenItems];
    this.setState({columnDefs});
    this.gridApi.setColumnDefs(columnDefs);
    this.toggleSortModal();
    this.updateCache(this.initMap.bind(this));
  }

  updateColumns(config) {
    if (config) {
      let columnDefs = this.state.columnDefs;
      columnDefs.forEach((item, index) => {
        const key = item.colId;
        columnDefs[index] = {
          ...item,
          ...config[key],
          __sort: (config[key] && config[key].__sort) ? config[key].__sort : index,
          children: item.children ? item.children.map(child => {
            return {...child, ...config[key].children[child.colId]}
          }) : undefined
        }
      });
      columnDefs = columnDefs.sort((a, b) => a.__sort - b.__sort);
      this.gridApi && this.gridApi.setColumnDefs(columnDefs);
      this.setState({columnDefs, fetchedData: true});
    }
    this.initMap();
  }

  updateCache(callback) {
    if (!this.props.tableId) {
      return;
    }
    setTimeout(() => {
      const minimalConfig = {};
      this.state.columnDefs.forEach((item, index) => {
        minimalConfig[item.colId] = {
          width: item.width,
          hide: item.hide,
          __sort: index,
        };
        if (item.children) {
          minimalConfig[item.colId].children = {};
          item.children.forEach(child => {
            minimalConfig[item.colId].children[child.colId] = {
              width: child.width,
              hide: child.hide,
            }
          })
        }
      });
      const configStr = JSON.stringify(minimalConfig);
      window.localStorage.setItem(this.props.tableId + 'table-config', configStr);
    }, 100);
  }


  toggleSortModal() {
    this.setState({showSortModal: !this.state.showSortModal});
  }

  render() {
    const {pagination, rowSelection, detailContainerWidth, renderDetail, renderAdditionalTool} = this.props;
    const {showDetail, detailIndex, selectedCount, showSortModal, columnDefs} = this.state;
    const dataSource = this.getDataSource();
    const containerWidth = showDetail ? (detailContainerWidth || 300) : 0;

    const currentDetail = dataSource[detailIndex];
    return (
      <div className="content ag-grid-container ag-antd " style={this.props.style || {}}>
        {!!renderDetail && showDetail && (
          <Icon
            type="caret-right"
            className="toggle-detail"
            style={{right: Math.max(containerWidth, 12) - 12}}
            onClick={() => this.onChangeDetail()}/>
        )}
        <div className={`detail-container `} style={{width: containerWidth}}>
          {renderDetail && showDetail && currentDetail && renderDetail(currentDetail, detailIndex,)}
          {currentDetail && (
            <div className="toolbar">
              <Button
                icon="arrow-left"
                shape="circle"
                size="small"
                disabled={detailIndex === 0}
                onClick={() => this.onChangeDetail(true, detailIndex - 1)}/>

              {renderAdditionalTool && renderAdditionalTool(currentDetail, detailIndex)}

              <Button
                icon="arrow-right"
                shape="circle"
                size="small"
                disabled={detailIndex === dataSource.length - 1}
                onClick={() => this.onChangeDetail(true, detailIndex + 1)}/>
            </div>
          )}

        </div>
        <div className="ag-grid">
          <AgGridReact
            ref={grid => this.grid = grid}
            rowHeight={this.props.rowHeight || 48}
            headerHeight={37}
            enableColResize
            enableSorting
            autoGroupColumnDef
            suppressMovableColumns
            suppressCellSelection
            suppressClickEdit
            enableCellChangeFlash
            defaultColDef={defaultColumn}
            localeText={agLocal}
            rowSelection='multiple'
            onColumnResized={this.onColumnResized.bind(this)}
            onGridReady={this.onGridReady.bind(this)}
            getRowNodeId={data => this.getKey(data)}
            columnDefs={this.state.columnDefs}
            rowData={dataSource}
            style={{width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%'}}
          />
        </div>
        <div className="header-setting">
          <Button icon="setting" type="primary" onClick={this.toggleSortModal.bind(this)}/>
        </div>
        {!!rowSelection && rowSelection.onChange && rowSelection.type !== 'radio' && (
          <div className="select-all">
            <Checkbox
              onClick={this.selectAll.bind(this)}
              checked={selectedCount === dataSource.length && dataSource.length !== 0}
              indeterminate={this.selectedKeys.length > 0 && this.selectedKeys.length !== dataSource.length}
            />
          </div>
        )}
        {!!pagination && (
          <Pagination
            className="ag-pagination"
            {...pagination}
            onChange={(a, b, c) => {
              //切换页码的时候清除所有选中信息
              this.selectedKeys = [];
              rowSelection && rowSelection.onSelect && rowSelection.onSelect([], []);
              rowSelection && rowSelection.onChange && rowSelection.onChange([], []);

              pagination.onChange && pagination.onChange(a, b, c);
            }}
          />
        )}
        {showSortModal && (
          <SortModal
            columns={columnDefs}
            onChangeSort={this.onChangeSort.bind(this)}
            onCancel={this.toggleSortModal.bind(this)}
          />
        )}
      </div>
    );
  }
}


AgTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array,
  disabledKeys: PropTypes.array,
  tableId: PropTypes.string,
  rowSelection: PropTypes.object,
  detailContainerWidth: PropTypes.number,
  renderDetail: PropTypes.func,
  renderAdditionalTool: PropTypes.func,
  onChangeDetail: PropTypes.func,
};
export default AgTable;


class SortModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortItems: [],
      hiddenItems: [],
      pinnedItems: []
    };
  }

  componentWillMount() {
    let sortItems = [], hiddenItems = [], pinnedItems = [];
    this.props.columns.map(item => {
      if (!item.pinned && item.hide !== true) {
        sortItems.push(item);
      } else if (item.pinned) {
        pinnedItems.push(item);
      } else {
        hiddenItems.push(item);
      }
    });
    this.setState({sortItems, hiddenItems, pinnedItems});
  }


  onOk() {
    this.props.onChangeSort && this.props.onChangeSort(this.state.sortItems, this.state.hiddenItems, this.state.pinnedItems);
  }

  onSortItems(sortItems) {
    this.setState({sortItems});
  }

  onChangeItemVisible(item, index, visible) {
    if (visible) {
      const hiddenItems = this.state.hiddenItems;
      hiddenItems.splice(index, 1);
      this.setState({
        hiddenItems,
        sortItems: [...this.state.sortItems, {
          ...item, hide: !visible, children: item.children && item.children.map(child => {
            return {...child, hide: !visible}
          })
        }]
      });
    } else {
      const sortItems = this.state.sortItems;
      sortItems.splice(index, 1);
      this.setState({
        sortItems, hiddenItems: [...this.state.hiddenItems, {
          ...item, hide: !visible, children: item.children && item.children.map(child => {
            return {...child, hide: !visible}
          })
        }]
      });
    }
  }

  renderItems() {
    return (
      <div className="sort-list">
        {this.state.sortItems.map((item, i) => (
          <SortableItem
            key={i}
            onSortItems={this.onSortItems.bind(this)}
            items={this.state.sortItems}
            draggingIndex={this.state.draggingIndex}
            sortId={i}
            outline="list">
            <div className="label">
              {item.headerName}
            </div>
            <div className="operate">
              <Switch checked checkedChildren="显示" unCheckedChildren="隐藏"
                      onChange={this.onChangeItemVisible.bind(this, item, i)}/>
            </div>
          </SortableItem>
        ))}
      </div>
    )
  }

  renderHiddenItems() {
    return (<div className="hidden-items">
      <p className="title">隐藏字段</p>
      {this.state.hiddenItems.map((item, i) => (
        <ColumnItem
          key={i}
          items={this.state.sortItems}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="list">
          <div className="label">
            {item.headerName}
          </div>
          <div className="operate">
            <Switch checked={false} checkedChildren="显示" unCheckedChildren="隐藏"
                    onChange={this.onChangeItemVisible.bind(this, item, i)}/>
          </div>
        </ColumnItem>
      ))}
    </div>);
  }

  render() {
    return (
      <Modal
        title="显示字段管理"
        className="ag-sort-modal"
        visible
        onOk={this.onOk.bind(this)}
        maskCloseable={false}
        onCancel={this.props.onCancel}>
        {this.renderItems()}
        {this.renderHiddenItems()}
      </Modal>
    )
  }
}

class ColumnItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div {...this.props} className="sort-item">
        {this.props.children}
      </div>
    )

  }
}

const SortableItem = sortable(ColumnItem);
