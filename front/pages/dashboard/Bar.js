/**
 * Created by eatong on 18-2-14.
 */
import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import {getIntervalRecord, getChannel} from './dashboardAction';
import {Button, DatePicker, Checkbox, Popover} from 'antd';

// const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
// const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalRecord: [],
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
    await this.getIntervalRecord();
  }

  async getIntervalRecord() {

    const {startDate, endDate, checkedChannels} = this.state;
    const {success, data} = await getIntervalRecord({
      startDate,
      endDate,
      channels: checkedChannels.map(channel => channel.id)
    });
    success && this.setState({intervalRecord: data})
  }

  getOption() {
    const {intervalRecord} = this.state;
    const seriesData = {
      date: [],
      clue: [],
      yzz: [],
      zztx: [],
      consume: [],
      contract: [],
    };
    for (let record of intervalRecord) {
      seriesData.date.push(record.date);
      seriesData.clue.push(~~record.clue);
      seriesData.yzz.push(~~record.yzz);
      seriesData.zztx.push(~~record.zztx);
      seriesData.consume.push(~~record.consume);
      seriesData.contract.push(~~record.contract);
    }

    return {
      title: {
        text: `折线统计图`
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['线索量', '云智装', '智装天下', '消费', '签单'],
      },
      grid: {
        left: '5%',
        right: '1%',
        bottom: '1%',
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
        data: seriesData.date
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {name: '线索量', type: 'bar', data: seriesData.clue},
        {name: '智装天下', type: 'bar', data: seriesData.zztx},
        {name: '云智装', type: 'bar', data: seriesData.yzz},
        {name: '消费', type: 'bar', data: seriesData.consume},
        {name: '签单', type: 'bar', data: seriesData.contract},
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
            <span>日期选择:</span>
            <RangePicker onChange={(val) =>
              this.setState({
                startDate: val[0].format('YYYY-MM-DD'),
                endDate: val[1].format('YYYY-MM-DD')
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
          <div className="buttons"><Button onClick={() => this.getIntervalRecord()}>查询</Button></div>
        </header>

        <ReactEcharts option={this.getOption()} className="content" style={{height: '100%'}}/>
      </div>
    );
  }
}

Bar.propTypes = {};
export default Bar;
