/**
 * Created by eatong on 18-2-8.
 */
import React from 'react';
import {BrowserRouter as Router, Route, Link,} from 'react-router-dom';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import PropTypes from 'prop-types';
import AdminLayout from './components/AdminLayout';
import './app.less';

import HomePage from './pages/HomePage';
import UserPage from './pages/user/UserPage';
import ChannelPage from './pages/channels/ChannelPage';

class App extends React.Component {

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <div className="main-body">
            <Route exact path="/" component={HomePage}/>
            <Route path="/admin" component={(props) => (
              <AdminLayout {...props}>
                <Route path="/admin/user" component={UserPage}/>
                <Route path="/admin/channel" component={ChannelPage}/>
              </AdminLayout>
            )}>
            </Route>
          </div>
        </Router>
      </LocaleProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
};
export default App;
