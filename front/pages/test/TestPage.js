/**
 * Created by eaTong on 2018/6/30 .
 * Description:
 */
import React, {Component} from 'react';
import {Upload, Icon} from 'antd';
import ImageUploader from '~/components/ImageUploader';

export default class TestPage extends Component {
  state = {
    value: []
  };

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <ImageUploader onChange={(value) => this.setState({value})} value={this.state.value}/>

      </div>
    );
  }
}
