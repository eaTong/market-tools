/**
 * Created by eatong on 18-2-14.
 */
import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {getMonthlyRecord, getChannel} from './dashboardAction';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyRecord: [],
      channels: []
    };
  }

  async componentDidMount() {
    const {success, data} = await getChannel();
    success && this.setState({channels: data});
    await this.getMonthlyRecord();
  }

  async getMonthlyRecord() {

    const startDate = '2018-02-01', endDate = '2018-02-28';
    const {success, data} = await getMonthlyRecord({startDate, endDate});
    success && this.setState({monthlyRecord: data})
  }

  getOption() {
    const {channels, monthlyRecord} = this.state;
    const seriesData = {
      days: [],
      clue: [],
      yzz: [],
      zztx: [],
      consume: []
    };
    for (let record of monthlyRecord) {
      seriesData.days.push(record.day);
      seriesData.clue.push(record.clue);
      seriesData.yzz.push(record.yzz);
      seriesData.zztx.push(record.zztx);
      seriesData.consume.push(record.consume);
    }
    return {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['线索量', '云智装', '智装天下', '消费',],
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
        // data: ['周一']
        data: seriesData.days
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {name: '线索量', type: 'line', stack: '总量', data: seriesData.clue},
        {name: '智装天下', type: 'line', stack: '总量', data: seriesData.zztx},
        {name: '云智装', type: 'line', stack: '总量', data: seriesData.yzz},
        {name: '消费', type: 'line', stack: '总量', data: seriesData.consume},
      ]
    };
  }

  render() {
    console.log(this.getOption());
    return (
      <div className="dashboard-page base-layout">

        <ReactEcharts option={this.getOption()} className="content" style={{height: '100%'}}/>
      </div>
    );
  }
}

DashboardPage.propTypes = {};
export default DashboardPage;
