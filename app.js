//引入模块
const express= require('express');              //服务器创建模块
const app = express();
const bodyParser = require('body-parser');     //post解析模块
const userRouter = require('./routers/user');  //引入用户路由
const Product = require('./routers/product');  //引入商品路由
app.listen(3000,(err)=>{
	console.log('服务器创建成功');
});
//挂载静态文件
app.use(express.static('public'));
app.use(express.static('image'));
app.use(express.static('linkcss'));
app.use(express.static('linkjs'));

//使用bodyparser解析post请求
app.use(bodyParser.urlencoded({
	extended: false //不使用扩展的模块，而是使用nodejs提供的querystring模块解析为对象 true为使用扩展模块
}));

//挂载路由
app.use('/user',userRouter);
app.use('/product',Product);