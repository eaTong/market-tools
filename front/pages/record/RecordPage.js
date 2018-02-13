/**
 * Created by eatong on 18-2-12.
 */
import React, {Component} from 'react';
import {Calendar} from 'antd';
import DateCell from "./DateCell";
import RecordModal from "./RecordModal";
import {getChannel} from '../channels/channelAction';
import {updateRecord, getRecords} from './recordAction';
import './record.less';

class RecordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecordModal: false,
      channels: [],
      now: {},
      calendarRecords: {}
    };
  }

  async componentDidMount() {
    const {success, data} = await getChannel();
    success && this.setState({channels: data});
    // const recordResult = await getRecords();
    await this.getRecords();
  }

  async getRecords() {
    const {success, data} = await getRecords();
    // success && this.setState({records: data});
    if (success) {
      const calendarRecords = {};
      for (let record of data) {
        calendarRecords[record.date] = calendarRecords[record.date] ? calendarRecords[record.date] : [];
        calendarRecords[record.date].push(record);
      }
      this.setState({calendarRecords});
    }
  }

  toggleRecordModal(now) {
    this.setState({now, showRecordModal: !this.state.showRecordModal});
  }

  async onSaveRecord(values) {
    // const data = {date: this.state.now.format('YYYY-MM-DD'), records};
    const now = this.state.now.format('YYYY-MM-DD');
    const data = {};
    for (let key in values) {
      const id = key.match(/\d/)[0];
      data[id] = data[id] || {};
      data[id][key.replace(/\d/, '')] = values[key];
    }
    const records = [];
    for (let key in data) {
      records.push({...data[key], channel_id: key});
    }
    await updateRecord({records, date: now});
  }

  render() {
    const {showRecordModal, channels, calendarRecords} = this.state;
    console.log(calendarRecords);
    return (
      <div className="base-layout record-page">
        <Calendar
          className="content"
          dateCellRender={now => (
            <DateCell now={now}
                      onDoubleClick={() => this.toggleRecordModal(now)}
                      data={calendarRecords[now.format('YYYY-MM-DD')]}/>
          )}
        />
        {showRecordModal && (
          <RecordModal onCancel={() => this.toggleRecordModal()}
                       channels={channels}
                       onOk={(data) => this.onSaveRecord(data)}/>)}
      </div>
    );
  }
}

RecordPage.propTypes = {};
export default RecordPage;
