/**
 * Created by eatong on 18-2-14.
 */
import React, {Component} from 'react';
import {Form, Input, Button, Icon} from 'antd';
import './login.less';
import ajax from '~/util/ajaxUtil';
import {inject , observer} from 'mobx-react';

const FormItem = Form.Item;

@inject('app') @observer
class LoginPage extends Component {

  login() {
    this.props.form.validateFields(async (errors, values) => {
      if (errors) {
        return;
      }
      const {success, data} = await this.props.app.login(values);
      success && this.props.history.push(window.localStorage.getItem('lastUrl') || '/admin/member');
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
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                       placeholder="密码"/>
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
