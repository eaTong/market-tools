/**
 * Created by eatong on 18-4-6.
 */
const recordFields = [
  {name: '线索量', key: 'clue'},
  {name: '花费', key: 'consume'},
  {
    name: '云智装', key: 'yzz-group', children: [
      {name: '转单量', key: 'yzz'},
      {name: '签订数量', key: 'contract_count_yzz'},
      {name: '签订金额', key: 'contract_yzz'},
    ]
  },
  {
    name: '智装天下', key: 'zztx-group', children: [
      {name: '转单量', key: 'zztx'},
      {name: '签订数量', key: 'contract_count_zztx'},
      {name: '签订金额', key: 'contract_zztx'},
    ]
  }
];

/**
 *
 * @param parentPrefix boolean if the name shoul use label of parent for parent
 * @returns {Array}
 */
function getFlatFields(parentPrefix) {

  let flatFields = [];
  for (let field of recordFields) {
    const children = parentPrefix ? field.children.map(child => ({
      ...child,
      name: `${field.name}-${child.name}`
    })) : field.children;
    flatFields = flatFields.concat(field.children ? children : field)
  }
  return flatFields;
}


module.exports = {recordFields, getFlatFields};
