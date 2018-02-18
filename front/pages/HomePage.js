/**
 * Created by eatong on 18-2-8.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="">
        <Link to='/login'>登录</Link>
      </div>
    );
  }
}

HomePage.propTypes = {};
export default HomePage;
