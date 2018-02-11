/**
 * Created by eatong on 18-2-11.
 */
const User = require('../server/models/UserModel');

(async () => {
  await User.sync({alter: true});
})();
