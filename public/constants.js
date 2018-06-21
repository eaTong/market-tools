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
  return demandType.filter(item => item.vlaue === val)[0];
}
