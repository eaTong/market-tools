/**
 * Created by eatong on 18-2-12.
 */
import ajax from '../../util/ajaxUtil';

export async function updateRecord(data) {
  return await ajax({data, url: '/api/record/update'});
}

export async function getRecords(data) {
  return await ajax({data, url: '/api/record/get'});
}
