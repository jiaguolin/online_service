var express = require('express');
var router = express.Router();
var index = require('../dao/index');
var kefu = require('../dao/kefu');
var user = require('../dao/user');
var wechat = require('../dao/wechat')

/* GET home page. */
router.use(function (req, res, next) {
  index.use(req, res, next);
})
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  index.login(req, res, next);
});


//客服
router.get('/kefu', function(req, res, next) {
  kefu.getCustomers(req, res, next);
});

router.get('/getmessages', function(req, res, next) {
  kefu.getmessages(req, res, next);
});

router.get('/getmessage', function(req, res, next) {
  kefu.getmessage(req, res, next);
});

//用户
router.get('/userlogin', function(req, res, next) {
  user.userlogin(req, res, next);
});
router.post('/submessage', function(req, res, next) {
  user.submessage(req, res, next);
});

//wechat
router.get('/getWechatMessage',function(req,res,next){
  wechat.getWechatMessage(req,res,next);
});

router.post('/sendMessageToWechatUser',function(req,res,next){
  wechat.customReply(req,res,next);   
});

module.exports = router;
