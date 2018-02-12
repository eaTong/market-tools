/**
 * Created by eatong on 18-2-12.
 */
import React, {Component} from 'react';
import {Calendar} from 'antd';
import DateCell from "./DateCell";
import RecordModal from "./RecordModal";
import {getChannel} from '../channels/channelAction';
import './record.less';

class RecordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecordModal: false,
      channels: [],
      now: {}
    };
  }

  async componentDidMount() {
    const {success, data} = await getChannel();
    success && this.setState({channels: data});
  }

  toggleRecordModal(now) {
    this.setState({now, showRecordModal: !this.state.showRecordModal});
  }

  onSaveRecord(values) {
    // const data = {date: this.state.now.format('YYYY-MM-DD'), records};
    const now = this.state.now.format('YYYY-MM-DD');
    const data = {};
    for (let key in values) {
      const id = key.match(/\d/)[0];
      data[id] = data[id] || {};
      data[id][key.replace(/\d/, '')] = values[key];
    }
    const recordArray = [];
    for (let key in data) {
      recordArray.push({...data[key], date: now});
    }
    console.log(recordArray);
  }

  render() {
    const {showRecordModal, channels} = this.state;
    return (
      <div className="base-layout">
        <Calendar
          className="content"
          dateCellRender={now => (
            <DateCell now={now} onDoubleClick={() => this.toggleRecordModal(now)}/>
          )}
        />
        {showRecordModal && (
          <RecordModal onCancel={() => this.toggleRecordModal()} channels={channels}
                       onOk={(data) => this.onSaveRecord(data)}/>)}
      </div>
    );
  }
}

RecordPage.propTypes = {};
export default RecordPage;
