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

  @observable showAgreeModal = false;
  @observable showRefuseModal = false;
  @observable detail = {};
  @observable queryOption = {
    keywords: '',
    status: 0,
  };

  @action toggleAgreeModal() {
    this.showAgreeModal = !this.showAgreeModal;
  }

  @action onChangeDetail(detail) {
    this.detail = {...detail};
  }

  @action toggleRefuseModal() {
    this.showRefuseModal = !this.showRefuseModal;
  }

  @action
  async searchData() {
    this.pageIndex = 0;
    await this.getDataList();
  }

  @action
  async agree(data) {
    console.log(data);
  }

  @action
  async refuse(data) {
    console.log(data);
  }
}
