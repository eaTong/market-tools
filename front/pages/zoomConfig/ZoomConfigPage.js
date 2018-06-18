/**
 * Created by eatong on 18-4-6.
 */
import React, {Component} from 'react';
import {Button, Form, InputNumber, message} from 'antd';
import ajax from "~/util/ajaxUtil";
import {getFlatFields} from 'public/recordConfig';

const FormItem = Form.Item;
const flatFields = getFlatFields(true);
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
};

class ZoomConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomMapping: {}
    };
  }

  async componentDidMount() {
    const {success, data} = await ajax({url: '/api/zoomConfig/get'});
    const zoomMapping = {};
    for (let zoom of data) {
      zoomMapping[zoom.key] = zoom.zoom
    }
    this.setState({zoomMapping});
    this.props.form.setFieldsValue(zoomMapping);
  }

  resetData() {
    this.props.form.setFieldsValue(this.state.zoomMapping);
  }

  async onSaveData() {
    this.props.form.validateFields(async (errors, values) => {
      if (errors) {
        return;
      }
      const configs = [];
      for (let key in values) {
        configs.push({key: key, zoom: values[key]});
      }
      const {success} = await ajax({url: '/api/zoomConfig/update', data: configs});
      if (success) {
        message.success('保存成功');
        this.setState({zoomMapping: values})
      }
    });

  }

  renderConfig() {
    const {getFieldDecorator} = this.props.form;
    const {zoomMapping} = this.state;
    return flatFields.map(field => (
      <FormItem
        key={field.key}
        {...formItemLayout}
        label={field.name}>
        {getFieldDecorator(field.key, {
          initialValue: 0,
          rules: [{
            required: true, message: `请填写${field.name}!`,
          }],
        })(
          <InputNumber style={{width: '100%'}}/>
        )}
      </FormItem>
    ))
  }

  render() {
    return (
      <div className="base-layout">
        <div className="content">
          <Form>
            <h2 className="mt-title">数据缩放系数</h2>
            {this.renderConfig()}
          </Form>
        </div>
        <div className="footer">
          <Button type="primary" onClick={() => this.onSaveData()}>提交</Button>
          <Button onClick={() => this.resetData()}>重置</Button>
        </div>
      </div>
    );
  }
}

ZoomConfigPage.propTypes = {};
ZoomConfigPage = Form.create()(ZoomConfigPage);
export default ZoomConfigPage;
