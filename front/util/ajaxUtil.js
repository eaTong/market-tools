/**
 * Created by eatong on 18-2-10.
 */
import axios from 'axios';
import {message, notification} from 'antd';

const {createBrowserHistory} = require('history');

let loadingCount = 0, hide;
const history = createBrowserHistory();

export default async function ajax(config) {
  const {url, data, headers} = config;

  let result;
  loading();
  try {
    result = await axios.post(url, data, {headers: headers});
    if (!result.data.success) {
      notification.warning({message: result.data.message})
    }
    cancelLoading();
    return result.data;
  } catch (ex) {
    console.log(ex.response.status);
    const status = ex.response.status;
    if (status === 401) {
      // history.push('/login')
      // window.history.pushState({}, '/login')
      // window.history.
      window.location.href = '/login'
    }
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
