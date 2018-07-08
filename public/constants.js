/**
 * Created by eaTong on 2018/6/21 .
 * Description:
 */

const demandType = [
  {value: 0, label: 'Bug'},
  {value: 1, label: '需求'},
  {value: 2, label: '优化'},
];

function getDemandType(val) {
  return demandType.find(item => item.value === val);
}

const demandStatus = [
  {value: 0, label: '待处理', key: 'initial'},
  {value: 1, label: '已同意', key: 'agree'},
  {value: 2, label: '已拒绝', key: 'refuse'},
  {value: 3, label: '已发布', key: 'published'},
];

function getDemandStatus(val) {
  return demandStatus.find(item => item.value === val);
}

module.exports = {
  demandType, getDemandType, demandStatus, getDemandStatus
};
