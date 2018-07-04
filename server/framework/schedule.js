/**
 * Created by eaTong on 2018/7/4 .
 * Description:
 */
const schedule = require('node-schedule');
const DemandService = require("../services/DemandService");
// auto send statics info every night in 20:00:00
schedule.scheduleJob('42 00 20 * * *', async function () {
  await DemandService.statics();
});
