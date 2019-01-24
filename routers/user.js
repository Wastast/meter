//引入模块
const express = require('express');
const router = express.Router();
const pool = require('../pool')

// 查找用户信息
router.post('/userinfo',(req,res)=>{
	var obj=req.body;
	var sql = "SELECT *FROM meters_user where user_name=?";
	pool.query(sql,[obj.name],(err,result)=>{
		res.send(result);
	})
});


//用户注册模块
router.post('/register', (req, res) => {
	var obj = req.body;
	var sql = 'INSERT INTO meters_user set ?';
	pool.query(sql, [obj], (err, result) => {
		if (err) throw result;
		res.send(result);
	})
});

//用户登陆模块
router.post('/login', (req, res) => {
	var obj = req.body;
	var sql = "SELECT *FROM meters_user where user_name=? and user_pwd=?";
	pool.query(sql, [obj.name,obj.pwd], (err, result) => {
		if (err) throw result;
		if(result.length>0){
			res.send(result);
		}else{
			res.send(result);
		}
	})
})

// 修改用户信息
router.post('/update',(req,res)=>{
	var obj = req.body;
	var sql = 'update meters_user set ? where user_id=?';
	var str = {};
	for(var key in obj){
		if(key != 'user_id'){
			str[key] = obj[key];
		}
	}
	pool.query(sql,[str,obj.user_id],(err,result)=>{
		if(err)  throw result;
		if(result.changedRows>0){
			res.send('1');
		}else{
			console.log(result);
			res.send('2');
		}
	})
});

// 用户商品数据信息
router.get('/addshop',(req,res)=>{
	var obj =req.query;
	var user = obj.user_id;
	var product = JSON.parse(obj.data);
	// for(var key of product){
	// 	console.log(key.id);
	// 	console.log(key.title);
	// 	console.log(key.price);
	// 	console.log(key.imgpath);
	// }
	// console.log(user);
});
//导出模块
module.exports = router;