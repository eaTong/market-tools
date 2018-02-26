import ajax from "../../util/ajaxUtil";

/**
 * Created by eatong on 18-2-14.
 */

export async function getIntervalRecord(data) {
  return await ajax({data, url: '/api/record/interval'});
}


export async function getChannel() {
  return await ajax({url: '/api/channel/get'});
}
