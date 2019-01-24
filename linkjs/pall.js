// 全部商品界面查询----start
(function(){
  var list = document.querySelector('[data-select="list"]');
  // 类别
  var sort = document.querySelector('[data-click="class"]');
  // 价格
  var dosh = document.querySelector('[data-click="price"]');
  // 查找不到显示这个
  var notbox = document.querySelector('[data-show="not"]');
  var sum = 0;
  // 商品总和
  var shop = [];
  // 点击类别按钮后查找商品
  sort.addEventListener('click',function(e){
    if(e.target.nodeName == "SPAN"){
      if(sum==1){
        sum=0;
        location.href="http://127.0.0.1:3000/product_all.html";
      }
      // 清除类别样式和价钱查询样式
      for(var key of sort.querySelectorAll('span')){
        key.className = '';
      }
      for(var key of dosh.querySelectorAll('span')){
        key.className = '';
      }

      if(e.target.innerHTML!='全部'){
        // 查询单个数据
        e.target.className = 'on';
        var value = e.target.dataset.value;
        var arr = [];
        for(var key of shop){
          if(key.class==value){
            arr[arr.length] = key;
          }
        }
        add(arr);
      }else{
        // 查询全部数据
        e.target.className = 'on';
        add(shop);
      }
    }
  })

  // 点击价格按钮后查找商品
  dosh.addEventListener('click',function(e){
    if(e.target.nodeName == "SPAN"){
      if(sum==1){
        sum=0;
        location.href="http://127.0.0.1:3000/product_all.html";
      }
      for(var key of dosh.querySelectorAll('span')){
        key.className = '';
      }
      var arr = [];
      // 进行价格比较
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
      e.target.className = 'on';
      add(arr);
    }
  });
  // 加载后查找所有数据
  window.addEventListener('load',function load(){
    var search = location.search.split('=')[1];
    ajax({
      url:'/product/only',
      success:function(data){
        shop = data;
        if(search == undefined){
          add(shop);
          window.removeEventListener('load',load);
          //当查询字符串有值时
        }
      }
    });
    if(search != undefined){
      sum = 1;
      ajax({
        url:'/product/dim',
        data:{
          title:search
        },
        success:function(data){
          if(data == '1'){
            list.style.cssText = 'display:none;';
            notbox.style.cssText = 'display:block;';
          }else{
            list.style.cssText = 'display:block;';
            notbox.style.cssText = 'display:none;';
            add(data);
          }
          window.removeEventListener('load',load);
        }
      });
    }
  })

  // 给ul添加商品
  function add(data){
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
  }

  // 购物车是否显示东西
  // function dis(){
  //   var car = document.querySelector('.shopcar>p');
  //   var list = document.querySelector('[data-shop="list"]');
  //   if(list.querySelector('li')!=null){
  //       car.style.cssText = "display:none;";
  //       list.style.cssText = "display:block;";
  //     }else{
  //       car.style.cssText = "display:block;";
  //       list.style.cssText = "display:none;";
  //   }
  // }
  // var shopCar = document.querySelector('[data-shop="list"]');
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
            alert('请先登录');
            return;
          }
          // 调用购物车增加
          shopCarAdd(shop[car.dataset.id-1]);
        }
        // 喜欢按钮点击效果
        like.onclick = function(){
          if(!(localStorage.getItem('name'))){
            alert('请先登录');
            return;
          }
          console.log(1);
        }
    }
  });
  // 给购物车模块添加商品
  function shopCarAdd(data){
      var shopCount = document.querySelector('[data-shop="count"]');
      var shopItem = document.querySelector('[data-shop="list"]');
      var i = parseInt(shopCount.innerHTML);
      shopCount.innerHTML = ++i;
      var li = document.createElement('li');
        li.innerHTML = `<dl>
              <dt>
                  <dd class="car-img"><img src="${data.imgpath}" width="60px" height="60px"></dd>
                  <dd class="shop-name">
                      <span>${data.title}</span>
                  </dd>
                  <dd class="s-price">
                      <span>${data.price}元</span>
                  </dd>
              </dt>
              <span class="s-c-del" data-id="${data.id}">X</span>
          </dl>`;
      shopItem.appendChild(li);
      localStorage.setItem(data.id,data.title);
  }
})();
// 全部商品界面查询----END