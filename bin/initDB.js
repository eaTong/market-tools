/**
 * Created by eatong on 18-2-11.
 */
const User = require('../server/models/UserModel');
const Channel = require('../server/models/ChannelModel');
const Record = require('../server/models/RecordModel');

(async () => {
  await User.sync({alter: true});
  await Channel.sync({alter: true});
  await Record.sync({alter: true});
})();
