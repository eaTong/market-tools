/**
 * Created by eatong on 18-2-9.
 */
import React, {Component} from 'react';
import {getUser} from './userAction';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const result = await getUser();
    console.log(result);
  }

  render() {
    return (
      <div className="">
        user page....
      </div>
    );
  }
}

UserPage.propTypes = {};
export default UserPage;
