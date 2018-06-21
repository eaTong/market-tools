
/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

  import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';

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

class DemandModal extends Component {
  componentDidMount() {
    if (this.props.operateType === 'edit') {
      this.props.form.setFieldsValue(this.props.formData);
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
      <Modal title={(operateType === 'add' ? '新增' : '编辑') + ''}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(
              <Input/>
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