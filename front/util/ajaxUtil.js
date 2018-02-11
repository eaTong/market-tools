/**
 * Created by eatong on 18-2-10.
 */
import axios from 'axios';
import {message, notification} from 'antd';

let loadingCount = 0, hide;

export default async function ajax(config) {
  const {url, data, headers} = config;

  let result;
  loading();
  try {
    result = await axios.post(url, data, {headers: headers});
    if (!result.data.success) {
      notification.error({message: result.data.message})
    }
    cancelLoading();
    return result.data;
  } catch (ex) {
    console.log(ex.response.data.message || ex.message);
    notification.error({message: ex.response.data.message || ex.message});
    cancelLoading();
    return {success: false, data: {}, message: ex.response.data.message}
  }
};

function loading() {
  hide = message.loading('正在加载...');
  loadingCount++;
}

function cancelLoading() {
  loadingCount = Math.min(0, loadingCount - 1);
  hide();
}
