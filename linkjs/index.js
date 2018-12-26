// 轮播图--------start 
// 获取轮播图的图片数组
var list = document.querySelector('.consoule').getElementsByTagName('li');
var left = document.querySelector('.arrow-left');
var right = document.querySelector('.arrow-right');
// 获取div下的li
var rotate = document.querySelector('.rotate-b').getElementsByTagName('li');
// 当加载页面时启动计时器
window.onload = function() {
    round_colock();
    buying_colok();
};

var image = 0;
//单击左箭头时触发函数
left.onclick = function() {
    image--;
    if (image < 0) {
        image = 4;
    }
    // 清除类并更换类
    for(let i = 0;i<list.length; i++)
    {
        list[i].className = " ";
    }
    list[image].className = 'show';
    // 清除定时器并更换焦点
    clearInterval(timer);
    round_focu();
    round_colock();
};


//单击右箭头时触发函数
right.onclick = function() {
    image++;
    if (image > 4) {
        image = 0;
    }
    // 清除类并更换类
    for(let i = 0;i<list.length; i++)
    {
        list[i].className = " ";
    }
    list[image].className = 'show';
    // 清除定时器并更换焦点
    clearInterval(timer);
    round_focu();
    round_colock();
};

// 切换到下一张图 
function time() {
    image++;
    if (image > 4) {
        image = 0;
    }
    for(let i = 0;i<list.length; i++)
    {
        list[i].className = " ";
    }
    list[image].className = 'show';
    round_focu(); //调用焦点切换函数
}

// 定义轮播图计时器
function round_colock() {
    timer = setInterval(() => {
        time();
    }, 5000);
}

// 轮播图的焦点进行切换
function round_focu() {
    for (var i = 0, len = rotate.length; i < len; i++) {
        rotate[i].className = " "; //清空所有list的类名
    }
    rotate[image].className = "on"; //给当前图标下标的list类名变为 on
}

// 焦点变动函数 (让5个li都具有onclick事件)
for (var i = 0, len = rotate.length; i < len; i++) {
    (function(i) {
        rotate[i].onclick = function() {
            clearInterval(timer);
            var ul = i * -1226;
            list.style.marginLeft = ul + 'px';
            image = i;
            round_focu();
            round_colock();
        };
    })(i);
}
//轮播图--------END


// 主体模块商品导航----start
function shop(nav,body) {
    for (var index = 0; index < nav.length; index++) {
        (function(index) {
            nav[index].onmouseover = function() {
                // 清除类名
                for (let i = 0; i < nav.length; i++) {
                    nav[i].className = '';
                    body[i].className = '';
                }
                // 更换类名
                nav[index].className = 'shop-nav-item';
                body[index].className = 'module-r-show';
            };
        })(index);
    }
}
// 家电导航模块
var life_tool = document.querySelector('.life-tool').getElementsByTagName('li');
var life_tools = document.querySelector('.life-tools').getElementsByTagName('ul');
shop(life_tool,life_tools);

// 智能导航模块
var ai = document.querySelector('.ai').getElementsByTagName('li');
var ais = document.querySelector('.ais').getElementsByTagName('ul');
shop(ai,ais);

//搭配导航模块
var coordination = document.querySelector('.coordination').getElementsByTagName('li');
var coordinations = document.querySelector('.coordinations').getElementsByTagName('ul');
shop(coordination,coordinations);

// 配件模块导航
var parts = document.querySelector('.parts').getElementsByTagName('li');
var partss = document.querySelector('.partss').getElementsByTagName('ul');
shop(parts,partss);

//周边模块导航
var derivation = document.querySelector('.derivation').getElementsByTagName('li');
var derivations = document.querySelector('.derivations').getElementsByTagName('ul');
shop(derivation,derivations);
// 主体商品模块导航------END


// 内容模块主题导航------start
// 焦点切换
function matter_focu(index, item) {
    for (let i = 0; i < item.length; i++) {
        item[i].className = ' ';
    }
    item[index].className = 'matter-nav-active';
}

// 主题导航下的焦点导航
function matter_nav(module, item) {
    var item = module.querySelector('.matter-nav').getElementsByTagName('li');
    for (let index = 0; index < item.length; index++) {
        (function(index) {
            item[index].onclick = function() {
                var i = index * -296;
                module.style.marginLeft = i + 'px';
                matter_focu(index, item);
            };
        })(index);
    }
}

// 内容轮播图箭头函数统一
function matter_arrow(module) {
    var i = module.querySelector('.matter-nav').getElementsByTagName('li').length - 1;
    // 获取左侧箭头a标签
    var left = module.querySelector('.matter-arrow-left');
    // 获取右侧箭头a标签
    var right = module.querySelector('.matter-arrow-right');
    // 左侧箭头点击事件
    left.onclick = function() {
        var l = parseInt(module.style.marginLeft);
        if (l == 0) {
            return;
        } else {
            module.style.marginLeft = l + 296 + 'px';
            var index = (l + 296) / 296;
            var item = module.querySelector('.matter-nav').getElementsByTagName('li');
            matter_focu(Math.abs(index), item);
        }
    };
    // 右侧箭头点击事件
    right.onclick = function() {
        var r = parseInt(module.style.marginLeft);
        if (r == (i * -296)) {
            return;
        } else {
            module.style.marginLeft = r - 296 + 'px';
            var index = (r - 296) / 296;
            var item = module.querySelector('.matter-nav').getElementsByTagName('li');
            matter_focu(Math.abs(index), item);
        }
    }
}
// 图书导航
var book = document.querySelector('.matter-book');
matter_arrow(book);
matter_nav(book);

// MIUI主题导航
var miui = document.querySelector('.matter-miui');
matter_arrow(miui);
matter_nav(miui);

// 游戏主题导航
var game = document.querySelector('.matter-game');
matter_arrow(game);
matter_nav(game);

// APP主题导航
var app = document.querySelector('.matter-app');
matter_arrow(app);
matter_nav(app);
// 内容模块主题导航------END


// 小米闪购计时模块
// 获取在HMTL中的时分秒标签
var hours = document.querySelector('#hours');
var minutes = document.querySelector('#minutes');
var seconds = document.querySelector('#seconds');
// 获取目标时间
var target = new Date('2018-12-27 00:00:00');
var now = new Date();     
var times = Math.floor((target-now)/1000);
function buying_colok() {
    var timer2 = setInterval(()=>{
        times--;
        // 距离小时数
        var hour = Math.floor(times/(60*60));
        // 距离分钟数
        var minute = Math.floor(times%(60*60)/60)
        // 距离秒数
        var second = Math.floor(times%60);
        if(hour<10){
            hour = '0' + hour; 
        }
        if(minute<10){
            minute = '0' + minute;
        }
        if(second<10){
            second = '0' + second;
        }
        hours.innerHTML = hour;
        minutes.innerHTML = minute;
        seconds.innerHTML = second;
    },1000)
}