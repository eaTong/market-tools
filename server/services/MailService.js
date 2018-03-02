/**
 * Created by eatong on 18-3-1.
 */
/**
 * Created by 7wingsfish on 2016/3/28.
 */
const nodemailer = require('nodemailer');

const config = {

};
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);


module.exports = transporter;
// 发送邮件

// 创建一个邮件对象
/*
const mail = {
  // 发件人
  from: 'TMY Blog <service@aikesi-soft.com>',
  // 主题
  subject: 'test',
  // 收件人
  to: 'eatongchou@gmail.com',
  // 邮件内容，HTML格式
  text: 'test html mail'
};
transporter.sendMail(mail, function (error, info) {
  if (error) return console.log(error);
  console.log('mail sent:', info.response);
});
*/
