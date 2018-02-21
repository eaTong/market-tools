/**
 * Created by eatong on 18-2-10.
 */

import ajax from '../../util/ajaxUtil';

export async function getRole() {
  return await ajax({url: '/api/role/get'});
}

export async function addRole(data) {
  return await ajax({data, url: '/api/role/add'});
}

export async function updateRole(data) {
  return await ajax({data, url: '/api/role/update'});
}

export async function deleteRole(data) {
  return await ajax({data, url: '/api/role/delete'});
}

export async function getMenus() {
  return await ajax({url: '/api/menu/get'});
}

export async function grantRoles(data) {
  return await ajax({data, url: '/api/role/grant'});
}
