/**
 * Created by eatong on 18-2-10.
 */

import ajax from '../../util/ajaxUtil';

export async function getChannel() {
  return await ajax({url: '/api/channel/get'});
}

export async function addChannel(data) {
  return await ajax({data, url: '/api/channel/add'});
}

export async function updateChannel(data) {
  return await ajax({data, url: '/api/channel/update'});
}

export async function deleteChannel(data) {
  return await ajax({data, url: '/api/channel/delete'});
}
