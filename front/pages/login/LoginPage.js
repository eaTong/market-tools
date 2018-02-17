/**
 * Created by eatong on 18-2-14.
 */
import React, {Component} from 'react';
import {Form, Input, Button, Icon} from 'antd';
import './login.less';
import ajax from '../../util/ajaxUtil';

const FormItem = Form.Item;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  login() {
    this.props.form.validateFields(async (errors, values) => {
      if (errors) {
        return;
      }
      const {success} = await ajax({data: values, url: '/api/user/login'});
      success && this.props.history.push(window.localStorage.getItem('lastUrl') || '/admin/record');
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login-page">
        <div className="login-frame">
          <Form>
            <FormItem>
              {getFieldDecorator('account', {
                rules: [{required: true, message: '你谁啊你!'}],
              })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '没有密码不让进!'}],
              })(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="密码"
                       placeholder="Password"/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" className="login-button" onClick={() => this.login()}>登录</Button>
            </FormItem>
          </Form>
        </div>

      </div>
    );
  }
}

LoginPage = Form.create()(LoginPage);
export default LoginPage;
