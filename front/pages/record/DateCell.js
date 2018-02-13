/**
 * Created by eatong on 18-2-12.
 */
import React from 'react';

const DateCell = props => {
  const data = props.data || [];
  const total = {
    clue: 0,
    yzz: 0,
    zztx: 0,
    consume: 0
  };
  for (let item of data) {
    total.clue += item.clue;
    total.yzz += item.yzz;
    total.zztx += item.zztx;
    total.consume += item.consume;
  }
  if (data.length > 0) {
    return (
      <div className="date-cell" onDoubleClick={props.onDoubleClick}>
        <span className="clue">线索量：{total.clue}</span>
        <span className="zztx">智装天下：{total.zztx}</span>
        <span className="yzz">云智装：{total.yzz}</span>
        <span className="consume">花费：{total.consume}</span>
      </div>
    )

  } else {
    return (<div className="date-cell no-data" onDoubleClick={props.onDoubleClick}>未录入</div>)
  }
};
DateCell.propsType = {};

export default DateCell;
