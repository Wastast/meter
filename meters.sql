/*****/
set NAMES UTF8;
/*----判断数据库是否存在-----*/
DROP DATABASE IF EXISTS meters;
CREATE DATABASE meters CHARSET = UTF8;
USE meters;

/*----创建用户表----*/
CREATE TABLE meters_user (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(32),
	user_pwd VARCHAR(32),
	user_phone VARCHAR(16),
	user_email VARCHAR(64),
	user_gender INT
);

/*----创建商品表-----*/
/*手机:phone 家电:life_tool 智能:ai 搭配:coordination 配件:parts 周边:derivation*/
CREATE TABLE meters_product (
	product_id INT PRIMARY KEY AUTO_INCREMENT,
	product_name VARCHAR(64),                 #商品名称
	product_title VARCHAR(128),               #商品标题
	product_details VARCHAR(128),             #商品说明
	product_image   VARCHAR(128),             #商品图片路径
	product_price DECIMAL(10,2),              #价格
	product_specialprice DECIMAL(10,2),       #特殊价格
	product_class VARCHAR(20)，               #商品类别  
	product_evaluate INT                      #商品评价  
);
