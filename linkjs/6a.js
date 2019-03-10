// 定位的转换---------start
(function(){
  var box = document.querySelector('.phone-body');
  //获取到盒子的在页面中的高度
  var top = box.offsetTop-89; 
  var bon = box.offsetTop+610;
  //获取到盒子元素
  var fix = document.querySelector('[data-fix="fixed"]');
  // var btn = document.querySelector('[data-top="top"]');
  window.addEventListener('scroll',function(){
    var scrollTop = window.scrollY;
    if(scrollTop > top && scrollTop < bon ){
      fix.classList.add('fix');
    }else {
      fix.classList.remove('fix');
    }
    if(scrollTop > bon){
      fix.classList.add('bon');
    }else{
      fix.classList.remove('bon');
    }
  })
  // window.addEventListener('load',function(){
  //   window.scrollTo = 200;
  // })
})();
// 定位的转换---------END

// 6a商品的轮播图------start
(function(){
  // 获取图片和焦点的列表
  var item = document.querySelectorAll('[data-item="iist"]>li');
  var focu = document.querySelectorAll('[data-item="focus"]>li');
  // 获取箭头
  var left = document.querySelector("[data-arrow='arrow-left']");
  var right = document.querySelector("[data-arrow='arrow-right']");
  var img = 0;
  colock();
  // 左箭头点击事件
  left.addEventListener('click',function(){
    img--
    if (img < 0) {
      img = 3;
    }
    change(img)
  });
  //右箭头点击事件
  right.addEventListener('click',function(){
    time();
  });
  function time() {
    img++;
    if (img > 3) {
      img = 0;
    }
    change(img)
  }
  // 改变图片
  function change(index) {
    for(var key of item){
      key.className = '';
    }
    item[index].className = 'active';
    focus(index);
    clearInterval(timer);
    colock();
  }
  // 改变图片下方的焦点
  function focus(index) {
    for(let key of focu){
        key.className = " ";
    }
    focu[index].className = "focu"; //给当前图标下标的list类名变为 on
  }
  // 焦点变动函数 (让5个li都具有onclick事件)
  for (var i = 0, len = focu.length; i < len; i++) {
    (function (i) {
      focu[i].onclick = function () {
            img = i;
            change(img);
        };
    })(i);
  }
  // 定时函数
  function colock() {
    timer = setInterval(() => {
        time();
    }, 3000);
  }
  // 点击颜色后切换图片
  var redmi = document.querySelectorAll('[data-style="color"]>li');
  var list = document.querySelectorAll('[data-item="iist"] img');
  for(var key of redmi){
    key.addEventListener('click',function(){
      var color = this;
      ajax({
        url:'/product/redmi',
        data:{
          ic: color.dataset.value,
        },
        success:function(res){
          for(let i=0;i<list.length;i++){
            list[i].src = res[i].imgpath;
          }
          img=0;
          change(img)
        }
      })
    })
  }
})();
// 6a商品的轮播图------END

// 导航栏固定 ---------start
(function(){
  var fix =document.querySelector('[data-fix="fix"]');
  window.addEventListener('scroll',function(){
    var ftop = fix.getBoundingClientRect().top;
    var scrollTop = window.scrollY;
    if(ftop+150 < scrollTop){
      // fix.style.cssText = "transform: translateY(0);";
      fix.classList.add('t-b-fix','t-b-fix-t');
      // fix.style.cssText = "height: 60px;";
    }else {
      fix.classList.remove('t-b-fix','t-b-fix-t');
    }
  });
})();
// 导航栏固定-----------END

// 选择样式 -----------start
(function(){
  // 获取内存属性
  var ram = document.querySelectorAll('[data-style="ram"]>li');
  // 获取颜色属性
  var color = document.querySelectorAll('[data-style="color"]>li');
  // 获取总计模块的文本
  var ram_s = document.querySelector('[data-style="sum"]>p:nth-child(1)>span:nth-child(1)');
  var color_s = document.querySelector('[data-style="sum"]>p:nth-child(1)>span:nth-child(2)');
  var price_s = document.querySelector('[data-style="sum"]>p:nth-child(2)>span')
  // 获取保护样式
  var protect = document.querySelectorAll('[data-protect="protect"]>div');
  // 内存样式点击事件
  for(let key of ram){
    key.addEventListener('click',function(){
      for(var on of ram){
        on.classList.remove('active');
      }
      var text = this.querySelector('a>span:nth-child(1)').innerHTML;
      var price = this.querySelector('a>span:nth-child(2)').innerHTML;
      ram_s.innerHTML = text;
      price_s.innerHTML = price;
      this.classList.add('active');
      for(let n=0;n<protect.length;n++){
        protect[n].classList.remove('or');
        rm(n);
      }
    });
  }
  // 颜色样式点击事件
  for(let key of color){
    key.addEventListener('click',function(){
      for(var on of color){
        on.classList.remove('active');
      }
      var style = this.querySelector('a').innerText;
      color_s.innerHTML = style;
      this.classList.add('active');
    })
  }
  // 保护方式点击事件
  for(let i=0;i<protect.length;i++){
    (function(i){
      protect[i].addEventListener('click',function(){
        // 保险的金额
        var price = parseInt(protect[i].querySelector('.s-info .s-box-price').innerHTML);
        // 原总计价格
        var p = parseInt(price_s.innerHTML);
        if(protect[i].className=='s-box or'){
          this.classList.remove('or');
          rm(i)
          price_s.innerHTML = p-price+'元';
          return;
        }
        price_s.innerHTML = price+p+'元';
        var one = protect[i].querySelector('.s-info>.info-clause>i');
        var two = protect[i].querySelector('.s-check>i');
        one.classList.add('bg');
        two.classList.add('bg');
        this.classList.add('or');
      })
    })(i);
  }
  function rm(index){
    protect[index].querySelector('.s-info>.info-clause>i').classList.remove('bg');
    protect[index].querySelector('.s-check>i').classList.remove('bg');
  }
})();
// 选择样式------------END

// 添加购物车-------start
(function(){
  var red6a = document.querySelector('[data-id="26"]');
  var shop = shopAll();
  red6a.addEventListener('click', function(){
    if(!(localStorage.getItem('name'))){
      if(confirm('请登录后再操作,点击确定跳转登录界面')){
        location.href = "http://127.0.0.1:3000/user_login.html";
      }
      return;
    }
    var item = shop[25];
    shopCarAdd(item);
    shopCarTab();
  });
  function shopCarAdd(data) {
    let shopCount = document.querySelector('[data-shop="count"]');
    let shopItem = document.querySelector('[data-shop="list"]');
    let i = parseInt(shopCount.innerHTML);
    shopCount.innerHTML = ++i;
    let count = localStorage.getItem(data.id) || 0;
    // 如果添加的商品在缓存中存在，不在增加模板，增加商品数量
    if(!(localStorage.getItem(data.id))){
      localStorage.setItem(data.id,++count);
      let li = document.createElement('li');
      li.innerHTML = `<dl>
            <dt>
                <dd class="car-img"><img src="${data.imgpath}" width="60px" height="60px"></dd>
                <dd class="shop-name">
                    <span>${data.title}</span>
                </dd>
                <dd class="s-price">
                    <span>${data.price}元 X</span>
                    <span data-count="sum">1</span>
                </dd>
            </dt>
            <span class="s-c-del" data-id="${data.id}">X</span>
        </dl>`;
      shopItem.appendChild(li);
    }else{
      // 获取当前点击的这个ID值的元素
      let True = shopItem.querySelector(`[data-id="${data.id}"]`);
      // 根据点击的ID值来获取父元素，进行对值的查找
      let sum = True.parentNode.querySelector('[data-count="sum"]');
      sum.innerHTML = parseInt(sum.innerHTML)+1;
      localStorage.setItem(data.id,++count);
    }
  }
})();
// 添加购物车--------END
