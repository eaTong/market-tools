/**
 * Created by eaTong on 2018-21-06 .
 * Description: auto generated in  2018-21-06
 */

import {observable, action} from 'mobx';
import ajax from "~/util/ajaxUtil";
import BaseStore from '~/stores/BaseStore';
import {message} from 'antd';

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
    const {success} = await ajax({data: {...data, id: this.detail.id}, url: '/api/demand/agree'});
    if (success) {

      this.detail = {...this.detail, publishDate: data.publishDate.format('YYYY-MM-DD'), status: 1};
      message.success('操作成功');
      this.toggleAgreeModal();

    }
  }

  @action
  async refuse(data) {
    const {success} = await ajax({data: {...data, id: this.detail.id}, url: '/api/demand/refuse'});
    if (success) {
      this.detail = {...this.detail, ...data, status: 2}
      message.success('操作成功');
      this.toggleRefuseModal();
    }
  }
}
