/**
 * Created by eatong on 18-2-12.
 */
import React, {Component} from 'react';
import {Calendar, message} from 'antd';
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
    const formData = {};
    for (let key in values) {
      const id = key.match(/\d/)[0];
      formData[id] = formData[id] || {};
      formData[id][key.replace(/\d/, '')] = values[key];
    }
    const records = [];
    for (let key in formData) {
      records.push({...formData[key], channel_id: key});
    }
    const {success, data} = await updateRecord({records, date: now});
    if (success) {
      message.success('数据录入成功！');
      this.toggleRecordModal();
      await this.getRecords();
    }
  }

  render() {
    const {showRecordModal, channels, calendarRecords, now} = this.state;
    return (
      <div className="base-layout record-page">
        <Calendar
          className="content"
          dateCellRender={val => (
            <DateCell
              now={val}
              onDoubleClick={() => this.toggleRecordModal(val)}
              data={calendarRecords[val.format('YYYY-MM-DD')]}/>
          )}
        />
        {showRecordModal && (
          <RecordModal
            formData={now.format ? calendarRecords[now.format('YYYY-MM-DD')] : undefined}
            onCancel={() => this.toggleRecordModal()}
            channels={channels}
            onOk={(data) => this.onSaveRecord(data)}/>)}
      </div>
    );
  }
}

RecordPage.propTypes = {};
export default RecordPage;
