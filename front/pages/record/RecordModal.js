/**
 * Created by eatong on 18-2-12.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, Divider} from 'antd';

const FormItem = Form.Item;
const InputGroup = Input.Group;

class RecordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.formData) {
      // this.props.form.setFieldsValue(this.props.formData);
      const initialValue = {};
      for (let record of this.props.formData) {
        initialValue[`clue${record.channel_id}`] = record.clue;
        initialValue[`yzz${record.channel_id}`] = record.yzz;
        initialValue[`zztx${record.channel_id}`] = record.zztx;
        initialValue[`consume${record.channel_id}`] = record.consume;
      }
      this.props.form.setFieldsValue(initialValue);

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

  renderChannels() {
    const {getFieldDecorator} = this.props.form;
    return this.props.channels.map(channel => (
      <div key={channel.id} className="record-modal-item">
        <Divider>{channel.name}</Divider>
        <FormItem
          label="线索量"
        >
          {getFieldDecorator(`clue${channel.id}`, {
            rules: [{
              required: true, message: `请填写线索量(${channel.name})!`,
            }],
            initialValue: 0
          })(
            <Input type="number"/>
          )}
        </FormItem>
        <FormItem
          label="智装天下-转单量/签单数/签单金额"
        >
          <InputGroup compact>

            {getFieldDecorator(`zztx${channel.id}`, {
              rules: [{
                required: true, message: `请填写转单-智装天下(${channel.name})!`,
              }],
              initialValue: 0
            })(
              <Input type="number" style={{width: '33%'}}/>
            )}
            {getFieldDecorator(`contract_count_zztx${channel.id}`, {
              rules: [{
                required: true, message: `请填写签单数-智装天下(${channel.name})!`,
              }],
              initialValue: 0
            })(
              <Input type="number" style={{width: '33%'}}/>
            )}

            {getFieldDecorator(`contract_zztx${channel.id}`, {
              rules: [{
                required: true, message: `请填签单金额-智装天下(${channel.name})!`,
              }],
              initialValue: 0
            })(
              <Input type="number" style={{width: '33%'}}/>
            )}
          </InputGroup>
        </FormItem>
        <FormItem
          label="云智装-转单量/签单数/签单金额"
        >
          <InputGroup compact>

            {getFieldDecorator(`yzz${channel.id}`, {
              rules: [{
                required: true, message: `请填写转单-云智装(${channel.name})!`,
              }],
              initialValue: 0
            })(
              <Input type="number" style={{width: '33%'}}/>
            )}

            {getFieldDecorator(`contract_count_yzz${channel.id}`, {
              rules: [{
                required: true, message: `请填写签单数-云智装(${channel.name})!`,
              }],
              initialValue: 0
            })(
              <Input type="number" style={{width: '33%'}}/>
            )}
            {getFieldDecorator(`contract_yzz${channel.id}`, {
              rules: [{
                required: true, message: `请填写签单金额-云智装(${channel.name})!`,
              }],
              initialValue: 0
            })(
              <Input type="number" style={{width: '33%'}}/>
            )}
          </InputGroup>
        </FormItem>
        <FormItem
          label="花费金额"
        >
          {getFieldDecorator(`consume${channel.id}`, {
            rules: [{
              required: true, message: `请填写花费金额(${channel.name})!`,
            }],
            initialValue: 0
          })(
            <Input type="number"/>
          )}
        </FormItem>
        <FormItem
          label="签单金额"
        >
          {getFieldDecorator(`contract${channel.id}`, {
            rules: [{
              required: true, message: `请填写花费金额(${channel.name})!`,
            }],
            initialValue: 0
          })(
            <Input type="number"/>
          )}
        </FormItem>
      </div>
    ))
  }

  render() {
    return (
      <Modal
        className="record-modal"
        maskClosable={false}
        width={document.body.offsetWidth}
        visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <div className="record-modal-list">
            {this.renderChannels()}
          </div>
        </Form>
      </Modal>
    );
  }
}

RecordModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.array
};
RecordModal = Form.create()(RecordModal);
export default RecordModal;
