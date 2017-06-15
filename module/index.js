var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
var config = require('../config/config').mongodb;
var opts = { replSet: {readPreference: 'ReadPreference.NEAREST'} };
var db = mongoose.connect(config, opts);//；连接数据库，只需连接一次
db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log(config)
});

//企业model
var applicant = mongoose.model('o_applicant',{
              name : String,
              position : String,
              members : Number
						},'o_applicant');
//用户model
var customer = mongoose.model('o_customer',{
						  name : String,
						  mobile : String,
						  appid : {type: mongoose.Schema.Types.ObjectId, ref: 'o_applicant'},
						  password : String,
						},'o_customer');
var message = mongoose.model('o_message',{
              from : String,
              to : String,
              name : String,
              mobile : String,
              email : String,
              wechat : String,
              message : String,
              time : String
						},'o_message');

// var wechatMessage = mongoose.model('o_wechatMessage',{
//     ToUserName: { type: String, required: true}, //微信公众号 微信号
//     FromUserName: { type: String, required: true}, //wechat user openid
//     CreateTime: { type: Number, required: true},
//     MsgType: { type: String, required: true},
//     Content: { type: String, required: true},
//     MsgId: { type:String, required: true ,unique: true}, 
//     //add for new message.  0:未处理;1:已处理.
//     status:{type:Number,required:true}
// });

// var wechatUser = mongoose.model('o_wechatUser',{
//     openid: { type:String, required: true ,unique: true},
//     nickename: { type: String, required: true},
//     province: { type: String, default: null },
//     city:  { type: String, default: null}
// });

module.exports={
	applicant : applicant,
  customer : customer,
  message : message
  // wechatMessage: wechatMessage,
  // wechatUse: wechatUser
}
