// 轮播图--------start 
(function () {
    // 获取轮播图的图片数组
    var list = document.querySelectorAll('.consoule>li');
    var left = document.querySelector("[data-arrow='arrow-left']");
    var right = document.querySelector("[data-arrow='arrow-right']");
    // 获取div下的li
    var rotate = document.querySelectorAll('[data-li="focu"]>ul>li');
    ajax({
        url:'/product/rotate',
        success:function(data){
            alt(data);
        }
    });
    var imgs = [];
    function alt(data){
        var bool = typeof data === typeof 1;
        if(bool){
            list[data].getElementsByTagName('img')[0].src = imgs[data].imgpath;
        }else{
            imgs = JSON.parse(JSON.stringify(data));
            list[0].getElementsByTagName('img')[0].src = imgs[0].imgpath;
        }
    }
    // 启动定时器+
    round_colock();
    var image = 0;
    // 改变图片的类名
    function change(image) {
        // 清除类并更换类
        for(let key of list){
            key.className = " ";
        }
        alt(image);
        list[image].className = 'show';
        // 清除定时并更换焦点
        clearInterval(timer);
        round_focu();
        round_colock();
    }
    //单击左箭头时触发函数
    left.onclick = function () {
        image--;
        if (image < 0) {
            image = 4;
        }
        change(image);
    };
    //单击右箭头时触发函数
    right.onclick = function () {
        time();
    };
    // 切换到下一张图 
    function time() {
        image++;
        if (image > 4) {
            image = 0;
        }
        change(image);
    }

    // 定义轮播图计时器
    function round_colock() {
        timer = setInterval(() => {
            time();
        }, 5000);
    }

    // 轮播图的焦点进行切换
    function round_focu() {
        for(let key of rotate){
            key.className = " ";
        }
        rotate[image].className = "on"; //给当前图标下标的list类名变为 on
    }
    
    // 焦点变动函数 (让5个li都具有onclick事件)
    for (var i = 0, len = rotate.length; i < len; i++) {
        (function (i) {
            rotate[i].onclick = function () {
                image = i;
                change(image);
            };
        })(i);
    }
})();
// 轮播图--------END

// 主体模块商品导航----start
(function(){
    function shop(nav, body,data) {
        var $nav = document.querySelectorAll(nav+'>ul>li');
        var $body = document.querySelectorAll(body+'>ul');
        if(nav==".life-tool" || nav == '.ai'){
            var t = true;
        }else{
            var t = false;
        }
        for (var index = 0; index < $nav.length; index++) {
          (function (index) {
              if(index==0){
                if(t){
                    add2($body[index],data[index]);
                }else {
                    add1($body[index],data[index]);
                }
              }
              $nav[index].onmouseover = function () {
                for (let i = 0; i < $nav.length; i++) {
                    $nav[i].className = ' ';
                    $body[i].className = '';
                }
                if($body[index].children.length === 0){
                    if(t){
                        add2($body[index],data[index]);
                    }else {
                        add1($body[index],data[index]);
                    }
                }
                this.className = 'shop-nav-item';
                $body[index].className = 'module-r-show';            
              };
          })(index);
        }
    }
    // 添加模块
    function add1(item,data){
        var html = '';
        for(var key in data){
            if(data[key]== null){
                data[key] = "";
            }
        }
        for(let i=0;i<7;i++){
            html += `<li class="li-shadow item">
                        <div class="shop-img"><a href="javascript:;">
                                <img src="${data.imgpath}" width="160px" height="160px">
                            </a></div>
                        <h3 class="shop-title">${data.title}</h3>
                        <p class="shop-price">
                            <span>${data.price}元<span class="del">${data.specialprice && data.specialprice+'元'}</span></span>
                        </p>
                        <p class="shop-p-evaluate">${data.epeople}人评价</p>
                        <div class="evaluate"><a href="javascript:;">${data.evaluate}</a><span>来自神秘人的评价...</span></div>
                    </li>`;
        }
        html += `<li class="item last">
                    <div class="li-shadow item-div">
                        <div class="item-div-img">
                            <a href="javascript:;">
                                <img src="${data.imgpath}" width="80px" height="80px">
                            </a>
                        </div>
                        <h3 class="shop-title"><a href="javascript:;">${data.title}</a></h3>
                        <p class="shop-price"><span>${data.price}元</span></p>
                    </div>
                    <div class="li-shadow item-div">
                        <div class="item-more-icon">
                            <a href="javascript:;"><i class="iconfont icon-xiayibu"></i></a>
                        </div>
                        <a href="javascript:;" class="item-more">浏览更多<small>热门</small></a>
                    </div>
                </li>`
        item.innerHTML  =  html;
    }
    function add2(item,data){
        var html = '';
        for(var key in data){
            if(data[key]== null){
                data[key] = "";
            }
        }
        for(let i=0;i<7;i++){
            html += `<li class="li-shadow item">
                        <div class="shop-img"><a href="javascript:;">
                                <img src="${data.imgpath}" width="160px" height="160px"></a>
                        </div>
                        <h3 class="shop-title">${data.title}</h3>
                        <p class="shop-desc">${data.sdesc}</p>
                        <p class="shop-price">
                            <span>${data.price}元<span class="del">${data.specialprice&&data.specialprice+'元'}</span></span>
                        </p>
                        <div class="evaluate"><a href="javascript:;">${data.evaluate}</a><span>来自神秘人的评价...</span></div>
                    </li>`
        }
        html += `<li class="item last">
                    <div class="li-shadow item-div">
                        <div class="item-div-img">
                            <a href="javascript:;">
                                <img src="${data.imgpath}" width="80px" height="80px">
                            </a>
                        </div>
                        <h3 class="shop-title"><a href="javascript:;">${data.title}</a></h3>
                        <p class="shop-price"><span>${data.price}元</span></p>
                    </div>
                    <div class="li-shadow item-div">
                        <div class="item-more-icon">
                            <a href="javascript:;"><i class="iconfont icon-xiayibu"></i></a>
                        </div>
                        <a href="javascript:;" class="item-more">浏览更多<small>热门</small></a>
                    </div>
                </li>`
        item.innerHTML=html;
    }
    ajax({
        url:'/product/only',
        success:function(data){
            var a = ['tool','ai','coordination','parts','derivation'];
            var b = [
                "shop('.life-tool','.life-tools',arr)",
                "shop('.ai','.ais',arr)",
                "shop('.coordination','.coordinations',arr)",
                "shop('.parts','.partss',arr)",
                "shop('.derivation','.derivations',arr)"
            ];
            for(let n=0;n<a.length;n++){
                let arr = [];
                for(var item of data){
                    for(var key in item){
                        if(item[key] == a[n]){
                            arr[arr.length] = item;
                        }
                    }
                }
                eval(b[n]);
            }
        }
    });
})();
// 主体商品模块导航------END

// 内容模块主题导航------start
(function () {
    // 焦点切换
    function matter_focu(index, item) {
        for(var key of item){
            key.className = " ";
        }
        item[index].className = 'matter-nav-active';
    }

    // 主题导航下的焦点导航
    function matter_nav(module) {
        var item = module.querySelectorAll('.matter-nav>li');
        for (let index = 0; index < item.length; index++) {
            (function (index) {
                item[index].onclick = function () {
                    var i = index * -296;
                    module.style.marginLeft = i + 'px';
                    matter_focu(index, item);
                };
            })(index);
        }
    }

    // 内容轮播图箭头函数统一
    function matter_arrow(module,img) {
        var i = module.querySelectorAll('.matter-nav>li').length - 1;
        // 获取左侧箭头a标签
        var left = module.querySelector('.matter-arrow-left');
        // 获取右侧箭头a标签
        var right = module.querySelector('.matter-arrow-right');
        // 左侧箭头点击事件
        left.onclick = function () {
            var l = parseInt(module.style.marginLeft);
            if (l != 0) {
                module.style.marginLeft = l + 296 + 'px';
                var index = Math.abs((l + 296) / 296);
                img[index].src = img[index].dataset.matter;
                var item = module.querySelector('.matter-nav').getElementsByTagName('li');
                matter_focu(index, item);
            }
        };
        // 右侧箭头点击事件
        right.onclick = function () {
            var r = parseInt(module.style.marginLeft);
            if (r != (i * -296)) {
                module.style.marginLeft = r - 296 + 'px';
                var index = Math.abs((r - 296) / 296);
                img[index].src = img[index].dataset.matter;
                var item = module.querySelector('.matter-nav').getElementsByTagName('li');
                matter_focu(index, item);
            } 
        }
    }
    // 内容模块懒加载
    var m_img  = document.querySelectorAll('.matter-list>li');
    var img = [];
    for(let i=0;i<m_img.length;i++){
        img[i] = [];
        var temp = m_img[i].querySelectorAll('[data-matter*=http]');
        for(let n=0;n<temp.length;n++){
            img[i][n] = temp[n];
        }
    }
    // 图书导航
    var book = document.querySelector('.matter-book');
    matter_arrow(book,img[0]);
    matter_nav(book);

    // MIUI主题导航
    var miui = document.querySelector('.matter-miui');
    matter_arrow(miui,img[1]);
    matter_nav(miui);

    // 游戏主题导航
    var game = document.querySelector('.matter-game');
    matter_arrow(game,img[2]);
    matter_nav(game);

    // APP主题导航
    var app = document.querySelector('.matter-app');
    matter_arrow(app,img[3]);
    matter_nav(app);
})();
// 内容模块主题导航------END

// 小米闪购计时模块------start
(function () {
    var clock = document.querySelector('[data-time="time"]');
    var hours = document.querySelector('[data-time="hours"]');
    var minutes = document.querySelector('[data-time="minutes"]');
    var seconds = document.querySelector('[data-time="seconds"]');
    // 获取目标时间
    function date(){
        let i = null;
        let target = new Date('2019-1-1 00:00:00');
        let now = new Date();
        let date = now.getDate();
        let Hour = now.getHours();
        if(Hour<12){
            i=12;
            target.setHours(12);
            target.setDate(date);
        }else if(Hour<20){
            i=20;
            target.setHours(20);
            target.setDate(date);
        }else if(Hour<22){
            i=22;
            target.setHours(22);
            target.setDate(date);
        }else{
            i='00';
            target.setDate(date+1);
        }
        clock.innerHTML = `${i}:00`;
        let times = parseInt((target - now) / 1000);
        return times;
    }
    // 定时器
    (function(){
        var times = date();
        var timer2 = setInterval(() => {
            times--;
            // 距离小时数
            let hour = parseInt(times / (60 * 60));
            // 距离分钟数
            let minute = parseInt(times % (60 * 60) / 60);
            // 距离秒数
            let second = parseInt(times % 60);
            // 当时间小于10的话 加上 0
            hour = hour<10?'0' + hour:hour;
            minute = minute<10?'0' + minute:minute;
            second = second<10?'0' + second:second;
            // 给文档中添加数值
            hours.innerHTML = hour;
            minutes.innerHTML = minute;
            seconds.innerHTML = second;
            if(times==0){
                times = date();
            }
        }, 1000);
    })();
})();
// 小米闪购计时模块------end

// 推荐模块替换商品------start
(function () {
    var change = document.querySelector("[data-replace='replace']");
    var temp = [];
    change.onclick = function () {
        replace(temp);
    }
    window.addEventListener('load',function load(){
        ajax({
            url:'/product/project',
            success:function(data){
                temp = data;
                replace(data);
            }
        });
        window.removeEventListener('load',load);
    })

    function replace(data){
        var item = document.querySelectorAll("[data-recommend-item='item']");
        var arr = [];
        var rod = 0;
        // 添加5个随机数字
        while(rod<5){
            let temp = parseInt(Math.random()*data.length);
            if(arr.indexOf(temp)==-1){
            arr[arr.length] = temp;
                rod++;
            }
        }
        // 采用随机数给商品添加数据
        for (let i = 0; i < item.length; i++) {
            let img = item[i].querySelector('img');
            let title = item[i].querySelector('.dd-title > a');
            let price = item[i].querySelector('span');
            let evaluate = item[i].querySelector('.dd-rank');
            img.src = data[arr[i]].product_image;
            title.innerHTML = data[arr[i]].product_title;
            price.innerHTML = data[arr[i]].product_price + '元';
            evaluate.innerHTML = data[arr[i]].product_evaluate + '人评价';
        }
    }
})();
// 推荐模块替换商品------end

// 商品页面懒加载-----start
(function(){
    var lazy = document.querySelectorAll("[data-lazy^='http']");
    var wHeight = window.innerHeight;
    var img = [];

    // 当网页宽度或高度改变后触发事件
    window.onresize = function(){
        wHeight = window.innerHeight;
        loadImg();
    }

    // 滚轮事件
    window.addEventListener('scroll',function(){
        loadImg();
    })

    // 当页面加载时，加载在显示窗口中的图片
    window.addEventListener('load',function load(){
        loadImg();
        window.removeEventListener('load',load);
    })

    function loadImg(){
        for(let i=0;i<lazy.length;i++){
            // 动态获取当前元素的高度
            img[i] = lazy[i].getBoundingClientRect().top;
            if(img[i]+300 > 0 && img[i] < wHeight){
                lazy[i].src = lazy[i].dataset.lazy;
            }
        }
    }
})();
// 商品页面懒加载-----END

// 回到顶部按钮-------start
(function(){
    var top = document.querySelector('[data-back="top"]');
    if(top!=null){
        top.addEventListener('click',function(){
            document.documentElement.scrollTop = 0;
        });
    }
})();
// 回到顶部按钮--------END
