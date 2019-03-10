//引入模块
const express = require('express');
const router = express.Router();
const pool = require('../pool')

// 查找用户信息
router.post('/userinfo',(req,res)=>{
	var obj= req.body;
	var sql = "SELECT *FROM meters_user where user_name=?";
	pool.query(sql,[obj.user_name],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
});

//用户注册模块
router.post('/register', (req, res) => {
	var obj = req.body;
	var sql = 'INSERT INTO meters_user set ?';
	pool.query(sql, [obj], (err, result) => {
		if (err) throw err;
		res.send(result);
	})
});

// //用户注册模块
// router.post('/register', (req, res) => {
// 	var obj = req.body;
// 	var sql = 'INSERT INTO meters_user set ?';
// 	pool.query(sql, [obj], (err, result) => {
// 		if (err) throw err;
// 		res.send(result);
// 	})
// });

//用户登陆模块
router.post('/login', (req, res) => {
	var obj = req.body;
	var pwd = {};
	var user = {};
	for(var key in obj){
		if(key=='user_pwd'){
			pwd[key] = obj[key];
		}else{
			user[key] = obj[key];
		}
	}
	var sql = "SELECT *FROM meters_user where ? and ?";
	pool.query(sql, [user,pwd], (err, result) => {
		if (err) throw err;
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
		if(err)  throw err;
		if(result.changedRows>0){
			res.send('1');
		}else{
			res.send('2');
		}
	})
});

// 用户商品数据信息
router.get('/addshop',(req,res)=>{
	var obj =req.query;
	var product = JSON.parse(obj.user);
	let sql = "delete from user_product where user_id = ?"
	pool.query(sql,[product[0].user_id],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>=0){
			let sql = "INSERT INTO user_product set ?"
			for(var key of product){
				pool.query(sql,[key],(err,result)=>{
					if(err) throw err;
				});
			}
		}
	});
});

// 获取用户商品信息
router.get('/usershop',(req,res)=>{
	var obj = req.query;
	var sql = "select *from user_product where ?";
	pool.query(sql,[obj],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
//导出模块
module.exports = router;