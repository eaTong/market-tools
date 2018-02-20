/**
 * Created by eatong on 18-2-14.
 */
import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import {getMonthlyRecord, getChannel} from './dashboardAction';
import {Button, DatePicker, Checkbox, Popover} from 'antd';

const MonthPicker = DatePicker.MonthPicker;
// const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class Monthly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyRecord: [],
      channels: [],
      checkedChannels: [],
      startDate: '',
      endDate: ''
    };
  }

  componentWillMount() {
    this.state.startDate = moment().startOf('month').format('YYYY-MM-DD');
    this.state.endDate = moment().endOf('month').format('YYYY-MM-DD');
  }

  async componentDidMount() {
    const {success, data} = await getChannel();
    success && this.setState({channels: data, checkedChannels: data});
    await this.getMonthlyRecord();
  }

  async getMonthlyRecord() {

    const {startDate, endDate, checkedChannels} = this.state;
    const {success, data} = await getMonthlyRecord({
      startDate,
      endDate,
      channels: checkedChannels.map(channel => channel.id)
    });
    success && this.setState({monthlyRecord: data})
  }

  getOption() {
    const {monthlyRecord} = this.state;
    const seriesData = {
      days: [],
      clue: [],
      yzz: [],
      zztx: [],
      consume: [],
      contract: [],
    };
    for (let record of monthlyRecord) {
      seriesData.days.push(record.day);
      seriesData.clue.push(~~record.clue);
      seriesData.yzz.push(~~record.yzz);
      seriesData.zztx.push(~~record.zztx);
      seriesData.consume.push(~~record.consume);
      seriesData.contract.push(~~record.contract);
    }
    return {
      title: {
        text: `月度统计数据`
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['线索量', '云智装', '智装天下', '消费', '签单'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: seriesData.days
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {name: '线索量', type: 'line', data: seriesData.clue},
        {name: '智装天下', type: 'line', data: seriesData.zztx},
        {name: '云智装', type: 'line', data: seriesData.yzz},
        {name: '消费', type: 'line', data: seriesData.consume},
        {name: '签单', type: 'line', data: seriesData.contract},
      ]
    };
  }

  getChannelLabel() {
    const {channels, checkedChannels} = this.state;
    if (checkedChannels.length === 0) {
      return '请选择'
    } else if (channels.length === checkedChannels.length) {
      return '全部'
    } else {
      return checkedChannels.map(channel => channel.name).join('、')
    }
  }

  render() {
    const {channels, checkedChannels} = this.state;
    return (
      <div className="dashboard-page base-layout">
        <header className="header">
          <div className="search-filter">
            <span>月份选择:</span>
            <MonthPicker onChange={(val) =>
              this.setState({
                startDate: val.startOf('month').format('YYYY-MM-DD'),
                endDate: val.endOf('month').format('YYYY-MM-DD')
              })}/>
            <span>渠道筛选：</span>
            <Popover content={(
              <CheckboxGroup value={checkedChannels}
                             onChange={(checkedChannels) => this.setState({checkedChannels})}>
                {channels.map(channel => (
                  <p key={channel.id}><Checkbox value={channel} data={channel}>{channel.name}</Checkbox></p>
                ))}
              </CheckboxGroup>
            )}>
              <span className="multi-filter-label">{this.getChannelLabel()}</span>
            </Popover>
          </div>
          <div className="buttons"><Button onClick={() => this.getMonthlyRecord()}>查询</Button></div>
        </header>

        <ReactEcharts option={this.getOption()} className="content" style={{height: '100%'}}/>
      </div>
    );
  }
}

Monthly.propTypes = {};
export default Monthly;
