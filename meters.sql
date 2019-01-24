/*****/
set NAMES UTF8;
/*----判断数据库是否存在-----*/
DROP DATABASE IF EXISTS meters;
CREATE DATABASE meters CHARSET = UTF8;
USE meters;

/*----创建用户表----*/
CREATE TABLE meters_user (
	user_id INT PRIMARY KEY AUTO_INCREMENT,           #用户ID
	user_name VARCHAR(32),														#用户名
	user_pwd VARCHAR(32),															#用户密码
	user_phone VARCHAR(16),														#用户手机
	user_email VARCHAR(64),														#用户邮箱
	user_gender VARCHAR(2),													  #用户性别
	user_img  VARCHAR(128),                           #用户头像
	user_birthday VARCHAR(128)                        #用户生日
);

/*----创建商品表-----*/
/*手机:phone 家电:life_tool 智能:ai 搭配:coordination 配件:parts 周边:derivation*/
CREATE TABLE meters_product (
	product_id INT PRIMARY KEY AUTO_INCREMENT,
	product_name VARCHAR(64),                 #商品名称
	product_title VARCHAR(128),               #商品标题
	product_details VARCHAR(128),             #商品说明
	product_image   VARCHAR(128),             #商品图片路径
	product_price DECIMAL(10,2),              #商品价格
	product_specialprice DECIMAL(10,2),       #特殊价格
	product_class VARCHAR(20),               #商品类别  
	product_evaluate INT                    #商品评价  
);

/*创建商品表*/
CREATE TABLE product (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(64),                  #商品标题
	sdesc VARCHAR(64),                   #商品描述
	imgpath VARCHAR(128),                #图片路径
	price DECIMAL(10,2),                #商品价格
	specialprice DECIMAL(10,2),       	 #特殊价格
	evaluate VARCHAR(64),               #商品评价
	epeople INT,                        #商品评价人数
	class VARCHAR(30)										#商品类别
);

/*创建导航栏下拉菜单表*/
CREATE TABLE menubar (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(64),                  #商品标题
	imgpath VARCHAR(128),                #图片路径
	price DECIMAL(10,2)                #商品价格
);

/*轮播图图片存储*/
CREATE TABLE rotate (
	id INT PRIMARY KEY AUTO_INCREMENT, 
	imgpath VARCHAR(128)                 #图片路径
);

/*红米6a信息存储*/
CREATE TABLE red (
	id INT PRIMARY KEY AUTO_INCREMENT,
	imgpath  VARCHAR(128),               #图片路径
	ic VARCHAR(2)                        #图片类别
);

/*用户商品数据存储*/
CREATE TABLE user_product(
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id VARCHAR(10),                 #用户ID
	product_id  VARCHAR(10),             #商品ID
	title      VARCHAR(124),             #商品标题
	price      VARCHAR(20),              #商品价格
	imgpath VARCHAR(128)                 #图片路径
);
/*插入红米6a 信息数据*/
INSERT INTO red VALUES 
(null,'http://127.0.0.1:3000/6a/pms_1528719461.20891365.jpg',1),
(null,'http://127.0.0.1:3000/6a/pms_1528719461.2688599.jpg',1),
(null,'http://127.0.0.1:3000/6a/pms_1528719460.71656686.jpg',1),
(null,'http://127.0.0.1:3000/6a/pms_1528719461.07717556.jpg',1),
(null,'http://127.0.0.1:3000/6a/pms_1528719468.7328918.jpg',2),
(null,'http://127.0.0.1:3000/6a/pms_1528719468.74863243.jpg',2),
(null,'http://127.0.0.1:3000/6a/pms_1528719468.66298734.jpg',2),
(null,'http://127.0.0.1:3000/6a/pms_1528719468.77651248.jpg',2),
(null,'http://127.0.0.1:3000/6a/pms_1528719455.74358029.jpg',3),
(null,'http://127.0.0.1:3000/6a/pms_1528719455.6772593.jpg',3),
(null,'http://127.0.0.1:3000/6a/pms_1528719455.5757333.jpg',3),
(null,'http://127.0.0.1:3000/6a/pms_1528719455.67991240.jpg',3),
(null,'http://127.0.0.1:3000/6a/pms_1528719476.67789934.jpg',4),
(null,'http://127.0.0.1:3000/6a/pms_1528719475.68838789.jpg',4),
(null,'http://127.0.0.1:3000/6a/pms_1528719477.21139280.jpg',4),
(null,'http://127.0.0.1:3000/6a/pms_1528719476.70966293.jpg',4);

/*插入用户信息数据*/
INSERT INTO meters_user VALUES
(20190001,'Mr.kai','123456','13967084291','276935962@qq.com','m',null,'asdasd');

/*插入轮播图数据*/
INSERT INTO rotate VALUES
(null,'http://127.0.0.1:3000/index/xmad_15445834783594_TAKmg.jpg'),
(null,'http://127.0.0.1:3000/index/l2.jpg'),
(null,'http://127.0.0.1:3000/index/l3.jpg'),
(null,'http://127.0.0.1:3000/index/xmad_15447978785458_LbGnO.jpg'),
(null,'http://127.0.0.1:3000/index/xmad_15451388199604_kOuBa.jpg');

/*插入下拉商品数据*/
INSERT INTO menubar VALUES
(null,'小米8 SE','http://127.0.0.1:3000/index/pc-320-220-mi8se.png',1799),
(null,'红米Note 5','http://127.0.0.1:3000/index/note5-320-220.png',1099),
(null,'小米电视4A 50英寸','http://127.0.0.1:3000/index/50.png',1999),
(null,'小米笔记本 Air 12.5"','http://127.0.0.1:3000/index/bijiben32012.5.jpg',3599),
(null,'米家扫地机器人','http://127.0.0.1:3000/index/saodijiqiren320-220.jpg',1699),
(null,'小米小爱智能闹钟','http://127.0.0.1:3000/index/naozhong.jpg',149),
(null,'小米路由器 3G','http://127.0.0.1:3000/index/3G.png',189),
(null,'小米小爱音箱mini','http://127.0.0.1:3000/index/xiaoaimini.jpg',169);

/*插入商品数据*/
INSERT INTO product VALUES
(null,'小米电视4A 43英寸青春版','全高清屏/人工智能语音','http://127.0.0.1:3000/index/pms_1524883847.49276938!220x220.jpg',1499,1599,'屏幕很大分辨率很清晰',4654,'tool'),
(null,'小米电视4 55英寸','4.9mm 超薄机身/2GB+8GB 大内存','http://127.0.0.1:3000/index/pms_1510111588.69169839!220x220.jpg',3699,3999,'家庭电影院',4396,'tool'),
(null,'13.3"小米笔记本Air 四核i7 8G 256G',null,'http://127.0.0.1:3000/index/pms_1525231579.56571137!220x220.jpg',5999,null,'开机速度很快(来自一个小白的评价)',798,'tool'),
(null,'小米米家空气净化器 2S','OLED显示屏/激光颗粒物传感器','http://127.0.0.1:3000/index/pms_1510020567.64467830!220x220.jpg',799,899,'用了之后感觉能呼吸到火星的空气',6546,'tool'),

(null,'小米体重秤','高精度压力传感/手机管理全家健康','http://127.0.0.1:3000/index/T1sWd_B7VT1RXrhCrK!220x220.jpg',99,null,'减肥的重担压的我喘不过气',987,'ai'),
(null,'米家全景相机套装','2388万有效像素/3.5K视频录制','http://127.0.0.1:3000/index/pms_1491312153.28261682!220x220.jpg',1699,null,'全家桶你值得拥有',354,'ai'),
(null,'小米米家智能摄像机','360度全方位照射','http://127.0.0.1:3000/index/yuntai.jpg',129,null,'我体内的赛亚人血统蠢蠢欲动',6479,'ai'),
(null,'米兔智能故事机','微信远程互动，智能语音交互','http://127.0.0.1:3000/index/pms_1464615180.86261317!220x220.jpg',189,199,'这是我的女朋友小米兔，她会讲故事',4654,'ai'),

(null,'小米WIFI电力猫','有插座的地方 就有WIFI','http://127.0.0.1:3000/index/pms_1491009389.88616921!220x220.jpg',189,249,'皮卡丘式Wifi',9875,'ai'),
(null,'小米无限充电器(通用快充版)',null,'http://127.0.0.1:3000/index/pms_1535440524.10478102.jpg',69,null,'充一次用一年',1257,'coordination'),
(null,'小米双单元半入耳式耳机',null,'http://127.0.0.1:3000/index/pms_1521442671.5222520!220x220.jpg',63,69,'享受演唱会的感觉',4912,'coordination'),
(null,'彩虹5号电池(10粒装)',null,'http://127.0.0.1:3000/index/T1xxVTBghv1RXrhCrK!220x220.jpg',9.9,null,'比彩虹糖还好吃',8765,'coordination'),
(null,'小米USB充电器60W快充版',null,'http://127.0.0.1:3000/index/pms_1517552384.30355703!220x220.jpg',129,null,'漏电后产生初恋的快感',6846,'coordination'),

(null,'小米8 硅胶保护套',null,'http://127.0.0.1:3000/index/pms_1527840795.6763911.jpg',49,null,'重点在硅胶',2552,'parts'),
(null,'红米6 Pro 极简保护壳 红色',null,'http://127.0.0.1:3000/index/pms_1529897883.50894652!220x220.jpg',29,null,'emmm',4651,'parts'),
(null,'小米6X 标准高透贴膜',null,'http://127.0.0.1:3000/index/pms_1524466931.58435208!220x220.jpg',19,null,'比彩虹糖还好吃',2127,'parts'),
(null,'悦米机械键盘',null,'http://127.0.0.1:3000/index/pms_1490702347.3628109!220x220.png',299,null,'不仅能敲还能砸',2556,'parts'),

(null,'小米棒球帽 藏蓝',null,'http://127.0.0.1:3000/index/pms_1522311796.15496400!220x220.jpg',49,null,'打球必备,打人就算了',1991,'derivation'),
(null,'AirPOP 防雾霾口罩 米家定制 黑色',null,'http://127.0.0.1:3000/index/kouzhaofenlei.jpg',69,null,'北京朋友不来一个么',6548,'derivation'),
(null,'8H乳胶弹簧静音床垫',null,'http://127.0.0.1:3000/index/pms_1502097740.52392774!220x220.jpg',1779,1889,'有了它你就可以流浪',1923,'derivation'),
(null,'花花草草监视仪',null,'http://127.0.0.1:3000/index/pms_1465724476.99494960!220x220.jpg',49,null,'养老人士必备',9681,'derivation'),
(null,'米兔拉杆箱 樱花粉',null,'http://127.0.0.1:3000/index/pms_1537928457.45667982!220x220.jpg',309,349,'米兔系列你懂得',9467,'derivation'),

(null,'小米8 屏幕指纹版 8GB+128GB','全球首款压感屏幕指纹，双频GPS','http://127.0.0.1:3000/index/pms_1537356460.6227958!220x220.png',3599,null,'小心被盗',1991,'phone'),
(null,'小米8 青春版 4GB+64GB','潮流镜面渐变色，2400万自拍旗舰','http://127.0.0.1:3000/index/pms_1537323963.1278763!220x220.jpg',1399,null,'会变色的手机',6548,'phone'),
(null,'小米MIX 2S 8GB+256GB','骁龙845 年度旗舰处理器','http://127.0.0.1:3000/index/pms_1522034061.12391230!220x220.jpg',3399,null,'旗舰处理器',1923,'phone'),
(null,'红米6 Pro 3GB+32GB',null,'http://127.0.0.1:3000/index/pms_1529635815.88254264!220x220.jpg',869,null,'红米',9681,'phone'),
(null,'小米6X 6GB+128GB','轻薄美观的拍照手机','http://127.0.0.1:3000/index/pms_1524621350.77238418!220x220.jpg',1649,null,'女性专用',9467,'phone');





/*插入商品的数据*/
INSERT INTO meters_product VALUES
(null,'键盘',"悦米机械键盘",null,'http://127.0.0.1:3000/index/pms_1490702347.3628109!220x220.png',299,null,'life_tool',5527),
(null,'充电器',"小米USB充电器(10W)",null,'http://127.0.0.1:3000/index/pms_1482221011.26064844!220x220.jpg',39,null,'parts',147),
(null,'充电器',"小米USB充电器快充版(18W)",null,'http://127.0.0.1:3000/index/pms_1507877361.06147174!220x220.jpg',49,null,'parts',147),
(null,'护枕',"BH 护颈乳胶枕",null,'http://127.0.0.1:3000/index/pms_1472711253.2453066!220x220.jpg',199,239,'derivation',1654),
(null,'沙发',"8H懒人数时沙发",null,'http://127.0.0.1:3000/index/pms_1502195257.33325849!220x220.jpg',69,null,'derivation',1654),
(null,'箱包',"小米多功能都市休闲胸包",null,'http://127.0.0.1:3000/index/T1FtKgBvZv1RXrhCrK!220x220.jpg',59,null,'coordination','1.3万'),
(null,'台灯',"米家飞利浦智睿台灯二代",'感知环境光，主动优化场景照明','http://127.0.0.1:3000/index/cf6660a3-d424-4248-889f-0eed1e99a342.png',199,null,'ai',6788),
(null,'空气净化器',"车载空气净化器(USB车充版)",'高效净化车内空气','http://127.0.0.1:3000/index/pms_1506733860.3164711!220x220.jpg',499,null,'ai',5923),
(null,'手机',"小米8 青春版 4GB+64GB",'潮流镜面渐变色，2400万自拍旗舰','http://127.0.0.1:3000/index/pms_1537323963.1278763!220x220.jpg',1399,null,'phone',8465),
(null,'手机',"小米8 屏幕指纹版 8GB+128GB",'全球首款压感屏幕指纹，双频GPS','http://127.0.0.1:3000/index/pms_1537356460.6227958!220x220.png',3599,null,'phone',845),
(null,'ai',"花花草草监视仪",null,'http://127.0.0.1:3000/index/pms_1465724476.99494960!220x220.jpg',49,null,'derivation',2849),
(null,'toy',"米兔积木机器人 履带机甲",'履带底盘，智能操控，百变拼插','http://127.0.0.1:3000/index/pms_1499048837.78256911!220x220.jpg',459,null,'ai',8751),
(null,'toy',"米兔智能故事机",'微信远程互动，智能语音交互','http://127.0.0.1:3000/index/pms_1464615180.86261317!220x220.jpg',189,null,'ai',8871),
(null,'toy',"米家儿童电话手表2",'AMOLED高清彩屏，6天超长续航','http://127.0.0.1:3000/index/pms_1498526059.78899603!220x220.jpg',349,null,'ai',8561),
(null,'headset',"小米蓝牙音频接收器",null,'http://127.0.0.1:3000/index/pms_1499161620.42031583!220x220.jpg',99,null,'coordination',7516),
(null,'headset',"小米随身蓝牙音箱",null,'http://127.0.0.1:3000/index/T1IdZgB5hv1RXrhCrK!220x220.jpg',65,null,'coordination',3597),
(null,'headset',"15.6' Pro i5 8G 1050MAX-Q 256G",null,'http://127.0.0.1:3000/index/pms_1533266333.04566853!220x220.jpg',6299,null,'life_tool',8456),
(null,'headset',"小米游戏本15.6' 8代i7 16G 1T+126G固态",null,'http://127.0.0.1:3000/index/pms_1533196142.85059414!220x220.png',8999,null,'life_tool',6547);
