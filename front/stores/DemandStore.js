
/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore'

export default class DemandStore extends BaseStore {
  listApi = '/api/demand/get';
  addApi = '/api/demand/add';
  updateApi = '/api/demand/update';
  deleteApi = '/api/demand/delete';
  detailApi = '/api/demand/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}