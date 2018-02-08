/**
 * Created by eatong on 18-2-8.
 */
import React from 'react';
import {BrowserRouter as Router, Route, Link,} from 'react-router-dom';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import PropTypes from 'prop-types';

import HomePage from './pages/HomePage';

class App extends React.Component {

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <div className="main-body ag-antd">
            <Route exact path="/" component={HomePage}/>
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
