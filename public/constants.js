/**
 * Created by eaTong on 2018/6/21 .
 * Description:
 */

export const demandType = [
  {value: 0, label: 'Bug'},
  {value: 1, label: '需求'},
  {value: 2, label: '优化'},
];

export function getDemandType(val) {
  return demandType.find(item => item.value === val);
}

export const demandStatus = [
  {value: 0, label: '待处理'},
  {value: 1, label: '已同意'},
  {value: 2, label: '已拒绝'},
  {value: 3, label: '已发布'},
];

export function getDemandStatus(val){
  return demandStatus.find(item => item.value === val);
}
