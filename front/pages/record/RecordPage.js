/**
 * Created by eatong on 18-2-12.
 */
import React, {Component} from 'react';
import {Calendar, message} from 'antd';
import moment from 'moment';
import DateCell from "./DateCell";
import RecordModal from "./RecordModal";
import {getChannel} from '../channels/channelAction';
import {updateRecord, getRecords} from './recordAction';
import './record.less';
import MonthCell from "./MonthCell";

class RecordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecordModal: false,
      channels: [],
      selectedDate: null,
      calendarType: 'month',
      nowDate: {},
      calendarRecords: {},
      monthSum: {}
    };
  }

  componentWillMount() {
    this.state.nowDate = moment();
  }

  async componentDidMount() {
    const {success, data} = await getChannel();
    success && this.setState({channels: data});
    await this.getRecords();
  }

  onPanelChange(nowDate, calendarType) {
    this.setState({nowDate, calendarType}, () => this.getRecords())
  }

  async getRecords() {
    const startDate = this.state.nowDate.startOf(this.state.calendarType).format('YYYY-MM-DD');
    const endDate = this.state.nowDate.endOf(this.state.calendarType).format('YYYY-MM-DD');
    const calendarType = this.state.calendarType;
    const {success, data} = await getRecords({startDate, endDate, calendarType});
    if (success) {
      if (calendarType === 'month') {
        const calendarRecords = {};
        for (let record of data) {
          calendarRecords[record.date] = calendarRecords[record.date] ? calendarRecords[record.date] : [];
          calendarRecords[record.date].push(record);
        }
        this.setState({calendarRecords});
      } else {
        const monthSum = {};
        for (let monthly of data) {
          // monthSum[record.month] = monthSum[record.month] ? monthSum[record.month] : [];
          monthSum[monthly.month] = monthly;
        }
        this.setState({monthSum});
      }
    }
  }

  toggleRecordModal(selectedDate) {
    this.setState({selectedDate, showRecordModal: !this.state.showRecordModal});
  }

  async onSaveRecord(values) {
    const date = this.state.selectedDate.format('YYYY-MM-DD');
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
    const {success} = await updateRecord({records, date});
    if (success) {
      message.success('数据录入成功！');
      this.toggleRecordModal();
      await this.getRecords();
    }
  }

  render() {
    const {showRecordModal, channels, calendarRecords, selectedDate, nowDate, monthSum} = this.state;
    return (
      <div className="base-layout record-page">
        <Calendar
          disabledDate={currentDate => nowDate.get('month') !== currentDate.get('month')}
          className="content"
          mode="month"
          value={nowDate}
          onPanelChange={this.onPanelChange.bind(this)}
          dateCellRender={val => (
            <DateCell
              now={val}
              onDoubleClick={() => this.toggleRecordModal(val)}
              data={calendarRecords[val.format('YYYY-MM-DD')]}/>
          )}
          monthCellRender={val => (
            <MonthCell data={monthSum[val.get('month') + 1]}/>
          )}
        />
        {showRecordModal && (
          <RecordModal
            formData={selectedDate ? calendarRecords[selectedDate.format('YYYY-MM-DD')] : undefined}
            onCancel={() => this.toggleRecordModal()}
            channels={channels}
            onOk={(data) => this.onSaveRecord(data)}/>)}
      </div>
    );
  }
}

RecordPage.propTypes = {};
export default RecordPage;
