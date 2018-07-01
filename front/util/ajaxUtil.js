/**
 * Created by eatong on 18-2-10.
 */
import axios from 'axios';
import {message, notification} from 'antd';
import store from '~/stores';

export default async function ajax(config) {
  const {url, data, headers} = config;

  let result;
  store.app.ajaxStart(url);
  try {
    result = await axios.post(url, data, {headers: headers});
    store.app.ajaxEnd(url);
    if (!result.data.success) {
      notification.warning({message: result.data.message})
    }
    return JSON.parse(JSON.stringify(result.data).replace(/:null/g, ':""'));
  } catch (ex) {

    store.app.ajaxEnd(url);
    const status = ex.response.status;
    if (status === 401) {
      window.localStorage.setItem('lastUrl', window.location.pathname);
      window.location.href = '/login'
    }

    notification.error({message: ex.response.data.message || ex.message});
    return {success: false, data: {}, message: ex.response.data.message}
  }
};
