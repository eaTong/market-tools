/**
 * Created by eatong on 18-2-14.
 */
import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import {getGroupedIntervalReport, getChannel, getZoomConfigs} from './dashboardAction';
import {Button, DatePicker, Checkbox, Popover} from 'antd';
import {getFlatFields, getFieldsMapping} from 'public/recordConfig';

const flatFields = getFlatFields(true);
const RangePicker = DatePicker.RangePicker;
const CheckboxGroup = Checkbox.Group;

class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalRecord: [],
      channels: [],
      checkedChannels: [],
      startDate: '',
      endDate: '',
      zoomMapping: {}
    };
  }

  componentWillMount() {
    this.state.startDate = moment().startOf('month').format('YYYY-MM-DD');
    this.state.endDate = moment().endOf('month').format('YYYY-MM-DD');
  }

  async componentDidMount() {
    const {success, data} = await getChannel();
    success && this.setState({channels: data, checkedChannels: data});
    await this.getZoomConfigs();
    await this.getIntervalRecord();
  }

  async getZoomConfigs() {

    const {success, data} = await getZoomConfigs();
    const fieldsMapping = getFieldsMapping();
    const zoomMapping = {};
    for (let zoomConfig of data) {
      zoomMapping[fieldsMapping[zoomConfig.key].name] = zoomConfig.zoom;
      zoomMapping[zoomConfig.key] = zoomConfig.zoom;
    }
    success && this.setState({zoomMapping})
  }

  async getIntervalRecord() {

    const {startDate, endDate, checkedChannels} = this.state;
    const {success, data} = await getGroupedIntervalReport({
      autoZoom: false,
      startDate,
      endDate,
      channels: checkedChannels.map(channel => channel.id)
    });
    success && this.setState({intervalRecord: data})
  }

  getOption() {
    const {intervalRecord, zoomMapping} = this.state;
    const seriesData = {
      days: [],
    };
    for (let record of intervalRecord) {
      seriesData.days.push(record.date);
      for (let {key} of flatFields) {
        const value = (~~record[key]) * (zoomMapping[key] || 1);
        seriesData[key] = seriesData[key] ? seriesData[key].concat(value) : [value];
      }
    }
    return {
      tooltip: {
        trigger: 'axis',
        formatter: (series) => {
          return `${series[0].name}<br/>\
            ${series.map(item => {
              const zoom = zoomMapping[item.seriesName];
              return `${item.marker} ${item.seriesName}:${item.value}\
                    ${zoom !== 1 && item.value !== 0 ? `<span style="font-size:10px;color:"#e5e5e5"">(${~~item.value / zoom} * ${zoom})</span>` : ''}`
            }
          ).join('<br/>')
            }`;
        }
      },
      legend: {
        data: flatFields.map(field => field.name),
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
      series: flatFields.map(field => ({
        name: field.name,
        type: 'line',
        data: seriesData[field.key],
        tooltip: {
          formatter: (a, b, c) => {
            console.log(a, b, c);
            return 12;
          }
        }
      }))
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

Line.propTypes = {};
export default Line;
