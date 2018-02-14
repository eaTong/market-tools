/**
 * Created by eatong on 18-2-14.
 */
import React from 'react';

const MonthCell = props => {
  const data = props.data || {};
  if (Object.keys(data).length === 0) {
    return (<div className="month-cell no-data">当月无数据</div>);
  } else {

    return (
      <div className="month-cell">
        <span className="label">当月统计：</span>
        <span className="clue">线索量：{data.clue}</span>
        <span className="zztx">智装天下：{data.zztx}</span>
        <span className="yzz">云智装：{data.yzz}</span>
        <span className="consume">花费：{data.consume}</span>
      </div>
    )
  }
};
MonthCell.propsType = {};

export default MonthCell;
