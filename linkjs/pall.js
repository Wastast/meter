// 全部商品界面查询----start
(function(){
  var list = document.querySelector('[data-select="list"]');
  // 类别
  var sort = document.querySelector('[data-click="class"]');
  // 价格
  var dosh = document.querySelector('[data-click="price"]');
  // 查找不到显示这个
  var notbox = document.querySelector('[data-show="not"]');
  // 修改面包屑导航
  var shopNav = document.querySelector('[data-class="shop"]');
  var sum = 0;
  // 商品总和
  var shop = shopAll();
  // 点击类别按钮后查找商品
  sort.addEventListener('click',function(e){
    if(e.target.nodeName == "SPAN"){
      if(sum==1){
        sum=0;
        location.href="http://127.0.0.1:3000/product_all.html";
      }
      // 清除类别样式和价钱查询样式
      for(let key of sort.querySelectorAll('span')){
        key.className = '';
      }
      for(let key of dosh.querySelectorAll('span')){
        key.className = '';
      }
      // 
      if(e.target.innerHTML!='全部'){
        // 查询单个数据
        e.target.className = 'on';
        var value = e.target.dataset.value;
        shopNav.innerHTML= e.target.innerHTML;
        var arr = [];
        for(let key of shop){
          // 当点击的类型和数据的类名一样时，存入数据
          if(key.class==value){
            arr[arr.length] = key;
          }
        }
        add(arr);
      }else{
        // 查询全部数据
        e.target.className = 'on';
        shopNav.innerHTML= e.target.innerHTML;
        add(shop);
      }
    }
  });

  // 点击价格按钮后查找商品
  dosh.addEventListener('click',function(e){
    if(e.target.nodeName == "SPAN"){
      var categoryAll = sort.querySelectorAll('span');
      // 找到类别，根据类别进行价格判断
      var category = '';
      for(let c of categoryAll){
        if(c.className == 'on'){
          category = c.dataset.value;
        }
      }
      // 如果重新点击价格查询刷新页面并默认全部商品查询
      if(sum==1){
        sum=0;
        location.href="http://127.0.0.1:3000/product_all.html";
      }
      for(var key of dosh.querySelectorAll('span')){
        key.className = '';
      }
      var arr = [];
      // 根据价格和类名进行比较
      if(category!='all'){
        for(let key of shop){
          if(e.target.dataset.value==3000){
            if(key.price>3000 && key.class == category ){
              arr[arr.length] = key;
            }
          }else if(e.target.dataset.value==2000){
            if(key.price>1000 && key.price<3000 && key.class == category){
              arr[arr.length] = key;
            }
          }else{
            if(key.price<1000 && key.class == category){
              arr[arr.length] = key;
            }
          }
        }
      }else{
        for(var key of shop){ 
          if(e.target.dataset.value==3000){
            if(key.price>3000){
              arr[arr.length] = key;
            }
          }else if(e.target.dataset.value==2000){
            if(key.price>1000 && key.price<3000){
              arr[arr.length] = key;
            }
          }else {
            if(key.price<1000){
              arr[arr.length] = key;
            }
          }
        }
      }    
      e.target.className = 'on';
      add(arr);
    }
  });

  // 加载后查找所有数据
  window.addEventListener('load',function load(){
    var search = location.search.split('=')[1];
    // 判断字符串是否有值
    if(search == undefined){
      add(shop);
      window.removeEventListener('load',load);
    }else{
      sum = 1;
      ajax({
        url:'/product/dim',
        data:{
          title:search
        },
        success:function(data){
          add(data);
          window.removeEventListener('load',load);
        }
      });
    }
  });

  // 给ul添加商品
  function add(data){
    if(data.length>0){
      list.style.cssText = 'display:block;';
      notbox.style.cssText = 'display:none;';
      var ul = document.querySelector('[data-select="list"]');
      var html = '';
      for( let i=0;i<data.length;i++){
        html += `<li class="li-shadow item">
              <div class="shop-img"><a href="javascript:;">
                <img src="${data[i].imgpath}" width="160px" height="160px"></a>
              </div>
              <h3 class="shop-title">${data[i].title}</h3>
              <p class="shop-desc">${data[i].sdesc==null?'':data[i].sdesc}</p>
              <p class="shop-price">
                <span>${data[i].price}元</span>
              </p>
              <div class="shop-car" data-id="${data[i].id}">
                <i class="iconfont icon-tianjiagouwuche s-c-i"></i>
              </div>
              <div class="shop-like" data-id="${data[i].id}">
                <i class="iconfont icon-aixin s-c-i"></i>
              </div>
          </li>`
      }
      ul.innerHTML = html;
    }else{
      list.style.cssText = 'display:none;';
      notbox.style.cssText = 'display:block;';
    }
  };

  // 当鼠标移入到ul中生成所有的li数据
  list.addEventListener('mouseover',function(e){
    //判断鼠标移入的是否是li
    if(e.target.nodeName=='LI'){
      // 移入的是商品数据模块的话 获取商品数据顶部的购物车和喜欢按钮
      var car = e.target.querySelector('.shop-car');
      var like = e.target.querySelector('.shop-like');
      // 购物点击效果
      car.onclick = function(){
        if(!(localStorage.getItem('name'))){
          if(confirm('请登录后再操作,点击确定跳转登录界面')){
            location.href = "http://127.0.0.1:3000/user_login.html";
          }
          return;
        }
        // 调用购物车增加
        shopCarAdd.call(this,shop[car.dataset.id-1]);
        shopCarTab();
      }
      // 喜欢按钮点击效果
      like.onclick = function(){
        if(!(localStorage.getItem('name'))){
          if(confirm('请登录后再操作,点击确定跳转登录界面')){
            location.href = "http://127.0.0.1:3000/user_login.html";
          }
          return;
        }
      }
    }
  });
  // 给购物车模块添加商品
  function shopCarAdd(data){
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
      alert('商品已添加至购物车')
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
// 全部商品界面查询----END