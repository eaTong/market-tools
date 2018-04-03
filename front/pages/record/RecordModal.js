/**
 * Created by eatong on 18-2-12.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, Divider} from 'antd';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const fields = [
  {name: '线索量', key: 'clue'},
  {name: '花费', key: 'consume'},
  {
    name: '云智装', key: 'yzz-group', children: [
      {name: '转单量', key: 'yzz'},
      {name: '签订数量', key: 'contract_count_yzz'},
      {name: '签订金额', key: 'contract_yzz'},
    ]
  },
  {
    name: '智装天下', key: 'zztx-group', children: [
      {name: '转单量', key: 'zztx'},
      {name: '签订数量', key: 'contract_count_zztx'},
      {name: '签订金额', key: 'contract_zztx'},
    ]
  }
];
let flatFields = [];
for (let field of fields) {
  flatFields = flatFields.concat(field.children ? field.children : field)
}

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

  renderHeader() {
    return (
      <div className="mt-table-header">
        {fields.map(field => {
          const hasChildren = field.children && field.children.length > 1;
          return (
            <div className={`${hasChildren ? 'group-header' : 'mt-table-item'}`}
                 key={field.key}
                 style={{flex: hasChildren ? field.children.length : 1}}
            >
              <div className="mt-table-header-item">{field.name}</div>
              {hasChildren && field.children.map(child => (
                <div className="mt-table-item" key={child.key}>{child.name}</div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  renderLabel() {
    return this.props.channels.map(channel => (
      <div className="label-item" key={channel.id}>
        {channel.name}
      </div>
    ))
  }

  /*  renderChannels() {
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
    }*/

  renderItem(key, name) {
    const {getFieldDecorator} = this.props.form;
    return getFieldDecorator(key, {
      rules: [{
        required: true, message: `请填写${name}!`,
      }],
      initialValue: 0
    })(
      <Input type="number"/>
    )
  }

  renderChannels() {

    return this.props.channels.map(channel => (
      <div className="mt-table-content-row" key={channel.id}>
        {flatFields.map(field => (
          <div className="mt-table-content-item">
            {this.renderItem(`${field.key}${channel.id}`, `${channel.name}${field.name}`)}
          </div>
        ))}
      </div>
    ));
  }

  render() {
    return (
      <Modal
        className="record-modal"
        maskClosable={false}
        width={document.body.offsetWidth}
        visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <div className="record-modal-container">
            <div className="labels">

              {this.renderLabel()}
            </div>
            <div className="content">
              {this.renderHeader()}
              {this.renderChannels()}
            </div>
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
