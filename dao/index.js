var db = require('../module/index');
var logs = require('./loger').logger;
var crypto = require('crypto');
var secret = 'abcdefg';
var MD5 = function(secret){
		return crypto.createHash('md5')
    .update(secret)
    .digest('hex');
}

module.exports={
  use:function(req, res, next){
		// var url = req.url.split('?')[0];
		// switch(url){
		// 	case '/login': next();break;
		// 	case '/islogin': islogin();break;
		// 	default: auth();break;
		// }
		// function auth() {
		// 	if(req.session.user){
		// 		return next();
		// 	}else{
		// 		res.json({code:50001,msg:'session过期'});
		// 		res.end();
		// 		return
		// 	}
		// }
		// function islogin() {
		// 	if(req.session.user){
		// 		res.json({code:200,msg:req.session.user});
		// 		res.end();
		// 	}else{
		// 		res.json({code:50001,msg:'session过期'});
		// 		res.end();
		// 		return
		// 	}
		// }
		next()
	},
	login:function(req, res, next){
    if(!req.query['username']||!req.query['password']){
      res.json({code:50002,msg:'缺少查询数据'});
      res.end();
			return
    }
    var username = req.query['username'];
    var password = req.query['password'];
		var customer = db.customer;
    customer.find({mobile:username},function(err, docs) {
        if(err){
            res.json({code:50000,msg:'服务器内部错误'});
            res.end();
            return
        }else{
					if (docs.length === 0){
						res.json({code:51001,msg:'用户不存在'});
		        res.end();
					} else{
						if(docs[0].password === MD5(password)){
							req.session.user={uid:docs[0]._id,username:req.query['username'],name:docs[0].name,type:1};
							res.json({code:200,msg:{uid:docs[0]._id,name:docs[0].name}});
			        res.end();
						} else{
							res.json({code:51002,msg:'账号或密码错误'});
			        res.end();
						}
					}
        }
    });
	}
}
