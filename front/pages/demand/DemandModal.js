/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, DatePicker, Select} from 'antd';
import {demandType} from 'public/constants';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
  },
};

class DemandModal extends Component {
  componentDidMount() {
    if (this.props.operateType === 'edit') {
      const data = this.props.formData;
      this.props.form.setFieldsValue({...data, date: moment(data.date), type: '' + data.type});
    }
  }

  onSaveData() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.onOk && this.props.onOk(values);
    });
  }

  render() {
    const {operateType} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal title={(operateType === 'add' ? '新增' : '编辑') + '需求'}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="需求类型"
          >
            {getFieldDecorator('type', {
              rules: [{
                required: true, message: '请填写需求类型!',
              }],
            })(
              <Select>{demandType.map(item => <Option key={item.value}> {item.label}</Option>)}</Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="提出人"
          >
            {getFieldDecorator('demander', {
              rules: [{
                required: true, message: '请填写提出人!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="提出部门"
          >
            {getFieldDecorator('department', {
              rules: [{
                required: true, message: '请填写提出部门!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="所属客户"
          >
            {getFieldDecorator('customerName', {
              rules: [{
                required: true, message: '请填写所属客户!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="提出日期"
          >
            {getFieldDecorator('date')(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="需求背景"
          >
            {getFieldDecorator('why')(
              <Input.TextArea/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="需求内容"
          >
            {getFieldDecorator('content')(
              <Input.TextArea/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

DemandModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
DemandModal = Form.create()(DemandModal);
export default DemandModal;
