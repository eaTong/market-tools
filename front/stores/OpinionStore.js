
/**
 * Created by eaTong on 2018-01-08 .
 * Description: auto generated in  2018-01-08
 */

import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore'

export default class OpinionStore extends BaseStore {
  listApi = '/api/opinion/get';
  addApi = '/api/opinion/add';
  updateApi = '/api/opinion/update';
  deleteApi = '/api/opinion/delete';
  detailApi = '/api/opinion/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}