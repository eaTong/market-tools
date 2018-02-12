/**
 * Created by eatong on 18-2-11.
 */
const User = require('../server/models/UserModel');
const Channel = require('../server/models/ChannelModel');

(async () => {
  await User.sync({alter: true});
  await Channel.sync({alter: true});
})();
