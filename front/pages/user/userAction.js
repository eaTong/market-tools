/**
 * Created by eatong on 18-2-10.
 */

import ajax from '../../util/ajaxUtil';

export async function getUser() {
  return await ajax({url: '/api/user/get'});
}

export async function addUser(data) {
  return await ajax({data, url: '/api/user/add'});
}

export async function updateUser(data) {
  return await ajax({data, url: '/api/user/update'});
}

export async function deleteUser(data) {
  return await ajax({data, url: '/api/user/delete'});
}
