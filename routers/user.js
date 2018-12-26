//引入模块
const express = require('express');
const router = express.Router();


//用户注册模块
router.get('/user_register', (req, res) => {
	console.log('可以访问了');
});
//用户登陆模块

//导出模块
module.exports = router;