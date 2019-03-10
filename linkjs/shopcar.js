// 动态加载界面--------start
(function () {
  ajax({
    url: '/product/only',
    success: function (data) {
      shopweb(data);
    }
  });
  var aduit = document.querySelector('[data-shopcar="audit"]');
  var count = document.querySelector('[data-shopcar="count"]');
  // 动态加载购物车结算界面
  function shopweb(data) {
    var con = 0;
    var price = 0;
    var shopList = document.querySelector('[data-car="shop"]');
    for (let i = 0; i < data.length; i++) {
      if (localStorage.getItem(data[i].id)) {
        var  num = localStorage.getItem(data[i].id);
        con += parseInt(num);
        price += data[i].price*num;
        let li = document.createElement('li');
        li.innerHTML = `<div class="img-box">
                  <img src="${data[i].imgpath}" width="60px" height="60px">
              </div>
              <span class="s-name">${data[i].title}</span>
              <span data-unit="price">${data[i].price}元</span>
              <div  class="s-count">
                  <span class="reduce">-</span>
                  <span class="num">${num}</span>
                  <span class="add">+</span>
              </div>
              <span class="s-price">${num*data[i].price}元</span>
              <span class="del" data-id="${data[i].id}">X</span>`
        li.className = 'shop-box';
        shopList.appendChild(li);
      }
    }
    count.innerHTML = con;
    aduit.innerHTML = price;
  }
})();
// 动态加载界面--------END

(function () {
  var shopList = document.querySelector('[data-car="shop"]');
  // 获取总价
  var sumPrice = document.querySelector('[data-shopcar="audit"]');
  var count = document.querySelector('[data-shopcar="count"]');
  shopList.addEventListener('mouseover', function (e) {
    if (e.target.nodeName == 'LI') {

      // 商品单价
      let unitPrice = parseInt(e.target.querySelector('[data-unit="price"]').innerHTML);

      // 商品信息
      let shopPrice = e.target.querySelector('.s-price');
      let shopCount = e.target.querySelector('.num');
      let i = parseInt(shopCount.innerHTML);

      // 绑定删除事件
      let del = e.target.querySelector('.del');
      del.onclick = function () {
        localStorage.removeItem(this.dataset.id);
        var price = parseInt(shopPrice.innerHTML);
        shopList.removeChild(e.target);
        sumPrice.innerHTML = `${parseInt(sumPrice.innerHTML)-price}元`;
        count.innerHTML = parseInt(count.innerHTML)-i;
      }

      // 绑定增加商品事件
      let add = e.target.querySelector('.add');
      add.onclick = function () {
        i++;
        shopCount.innerHTML = i;
        shopPrice.innerHTML = `${i*unitPrice}元`;
        sumPrice.innerHTML = `${parseInt(sumPrice.innerHTML)+unitPrice}`;
        count.innerHTML = parseInt(count.innerHTML)+1;
        var localNum = parseInt(localStorage.getItem(del.dataset.id));
        localStorage.setItem(del.dataset.id,++localNum);
      }
      
      // 绑定减少商品事件
      let subtract = e.target.querySelector('.reduce');
      subtract.onclick = function () {
        if (i == 1) {
          return;
        }
        i--;
        shopCount.innerHTML = i;
        shopPrice.innerHTML = `${i*unitPrice}元`;
        count.innerHTML = parseInt(count.innerHTML)-1;
        sumPrice.innerHTML = `${parseInt(sumPrice.innerHTML)-unitPrice}`;
        var localNum = parseInt(localStorage.getItem(del.dataset.id));
        localStorage.setItem(del.dataset.id,--localNum);
      }
    }
  })
})();

// //
// (function(){
//   var uname = document.querySelector('[data-user="name"]');
//   uname.innerHTML = localStorage.getItem('name');
// })();