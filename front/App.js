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
import LoginPage from './pages/login/LoginPage';
import UserPage from './pages/user/UserPage';
import RolePage from './pages/role/RolePage';
import ChannelPage from './pages/channels/ChannelPage';
import RecordPage from './pages/record/RecordPage';
import Monthly from './pages/dashboard/Monthly';
import Conversion from './pages/dashboard/Conversion';

class App extends React.Component {

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <div className="main-body">
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route path="/admin" component={(props) => (
              <AdminLayout {...props}>
                <Route path="/admin/user" component={UserPage}/>
                <Route path="/admin/role" component={RolePage}/>
                <Route path="/admin/channel" component={ChannelPage}/>
                <Route path="/admin/record" component={RecordPage}/>
                <Route path="/admin/dashboard/monthly" component={Monthly}/>
                <Route path="/admin/dashboard/conversion" component={Conversion}/>
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
