/**
 * Created by eatong on 18-2-12.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, Divider} from 'antd';
import {recordFields, getFlatFields} from 'public/recordConfig';

const flatFields = getFlatFields();

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
        /*        initialValue[`clue${record.channel_id}`] = record.clue;
                initialValue[`yzz${record.channel_id}`] = record.yzz;
                initialValue[`zztx${record.channel_id}`] = record.zztx;
                initialValue[`consume${record.channel_id}`] = record.consume;*/

        for (let field of flatFields) {
          initialValue[`${field.key}${record.channel_id}`] = record[field.key];
        }

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
        {recordFields.map(field => {
          const hasChildren = field.children && field.children.length > 1;
          return (
            <div className={`${hasChildren ? 'group-header' : 'mt-table-item'}`}
                 key={field.key}
                 style={{flex: hasChildren ? field.children.length : 1}}
            >
              <div className="mt-table-header-item" key={field.key}>{field.name}</div>
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
          <div className="mt-table-content-item" key={field.key}>
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
