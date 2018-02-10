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
      notification.error({content: result.data.message})
    }
    cancelLoading();
    return result.data;
  } catch (ex) {
    console.log(ex);
    notification.error({content: ex.message});
    cancelLoading();
    return {success: false, data: {}, message: ex.message}
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
