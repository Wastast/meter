const express= require('express');
const router = express.Router();
const pool = require('../pool');
// 查询推荐商品信息
router.get('/project',(req,res)=>{
  var sql = 'select *from meters_product';
  pool.query(sql,(err,result)=>{
    res.send(result);
  });
});

// 查询所有商品信息
router.get('/only',(req,res)=>{
  var sql = 'select *from product';
  pool.query(sql,(err,result)=>{
    res.send(result);
  });
});

// 轮播图照片获取
router.get('/rotate',(req,res)=>{
  var sql = 'select *from rotate';
  pool.query(sql,(err,result)=>{
    res.send(result);
  });
});

// 查询下拉菜单数据信息
router.get('/menu',(req,res)=>{
  var sql = 'select *from menubar';
  pool.query(sql,(err,result)=>{
    res.send(result);
  });
});

// 查询指定商品信息
router.get('/appoint',(req,res)=>{
  var obj = req.query;
  var sql = 'select *from product where ?';
  pool.query(sql,[obj],(err,result)=>{
    res.send(result);
  });
});

// 搜索框查询商品信息
router.get('/dim',(req,res)=>{
  var obj = req.query;
  var sql = `select *from product where title like '%${obj.title}%'`;
  pool.query(sql,[],(err,result)=>{
    if(result.length>0){
			res.send(result);
		}else{
			res.send('1');
		}
  });
});

// 查询红米6a的图片
router.get('/redmi',(req,res)=>{
  var obj = req.query;
  var sql = 'select *from red where ?';
  pool.query(sql,[obj],(err,result)=>{
    res.send(result);
  });
});
module.exports = router;
