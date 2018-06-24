/**
 * Created by eaTong on 2018/6/24 .
 * Description:
 */
import React, {Component} from 'react';
import {Modal, DatePicker, Form, Input} from 'antd';
import moment from 'moment';
import PropTypes from "prop-types";

const FormItem = Form.Item;
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

class RefuseModal extends Component {

  onSaveData() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.onOk && this.props.onOk(values);
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (<Modal
      title="请输入拒绝原因"
      maskClosable={false}
      visible={true}
      onOk={this.onSaveData.bind(this)}
      onCancel={this.props.onCancel}
    >
      <FormItem
        {...formItemLayout}
        label="拒绝原因"
      >
        {getFieldDecorator('refuseReason')(
          <Input.TextArea autosize={{minRows:2}}/>
        )}
      </FormItem>

    </Modal>);
  }
}

RefuseModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
RefuseModal = Form.create()(RefuseModal);
export default RefuseModal;
