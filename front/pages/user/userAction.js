/**
 * Created by eatong on 18-2-10.
 */

import ajax from '../../util/ajaxUtil';

export async function getUser() {
  return await ajax({url: '/api/user/get'});
}
