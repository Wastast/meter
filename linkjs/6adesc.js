
// 6a商品概述界面移动效果
(function(){
    // 获取标题
    var title = document.querySelectorAll('[data-first="one"]');
    // 获取介绍
    var spec = document.querySelectorAll('[data-first="two"]');
    // 获取冒泡信息
    var msg = document.querySelector('[data-b="msg"]');
    var wHeight = window.innerHeight;
    var title_top = [];   //用于保存title数组
    var desc_top = [];
    window.addEventListener('load',function(){
        title[0].style.cssText = 'opacity:1; transform:translateY(0);';
        spec[0].style.cssText = 'opacity:1; transform:translateY(0);';
    });
    window.addEventListener('scroll',function(){
        for(let i=0;i<title.length;i++){
            title_top[i] = title[i].getBoundingClientRect().top;
            if(title_top[i] > 0 && title_top[i] < (wHeight+100)){
                title[i].style.cssText = 'opacity:1; transform:translateY(0);'
            }
        }
        for(let i=0;i<spec.length;i++){
            desc_top[i] = spec[i].getBoundingClientRect().top;
            if(desc_top[i] > 0 && desc_top[i] < (wHeight+100)){
                spec[i].style.cssText = 'opacity:1; transform:translateY(0);'
            }
        }
        if(msg.getBoundingClientRect().top<wHeight){
            let itemTop = msg.querySelectorAll('span');
            for(let i=0;i<itemTop.length;i++){
                itemTop[i].style.cssText = "opacity:1;";
            }
        }
    });
})();
// 无缝轮播图
(function(){
  var left = document.querySelector('[data-arrow="wf-left"]');
  var right = document.querySelector('[data-arrow="wf-right"]');
  var list = document.querySelector('.r-item');
  //获取轮播图下面的焦点
  var wf_focu = document.querySelectorAll('[data-focu="wf"]>li');
  var img = 0;
  //改变图片
//   function change(){

//   }
  function focu(index) {
    for(var key of wf_focu){
        key.className = '';
    }
    wf_focu[index].className = 'on';
  }
  var interval = 1;
  left.onclick= function(){
    if(interval==1){
        interval=0;
        img--;
        list.style.cssText = `transform: translate3d(${(-651.6782*img)-3910.0692}px, 0px, 0px);`;
        if(img < 0){
            img=5;
        list.addEventListener('transitionend',function guo(){
            list.style.cssText = `transform: translate3d(${(-651.6782*5)-3910.0692}px, 0px, 0px);transition-duration: 0s;`;
            list.removeEventListener('transitionend',guo);
        });
        }
        focu(img);    
        setTimeout(function(){
            interval=1;
        },1100);
    }
  }
  right.onclick = function(){
    if(interval==1){
        interval=0;
        img++;
        right.disabled = false;
        list.style.cssText = `transform: translate3d(${(-651.6782*img)+-3910.0692}px, 0px, 0px);`;
        if(img>5){
            img=0;
        list.addEventListener('transitionend',function guo(){
            list.style.cssText = `transform: translate3d(-3910.0692px, 0px, 0px);transition-duration: 0s;`;
            list.removeEventListener('transitionend',guo);
        });
        }
        focu(img);
        setTimeout(function(){
            interval=1;
        },1100);
    }
  }
  for(let i=0;i<wf_focu.length;i++){
      (function(i){
        wf_focu[i].onclick = function(){
        img=i;
        focu(img);
        list.style.cssText = `transform: translate3d(${(-651.6782*img)+-3910.0692}px, 0px, 0px);transition-duration: 1s;`;
      }
      })(i);
  }
})();
// 手机图片切换
(function(){
    // 获取手机图片
    var phone = document.querySelectorAll('[data-phone="tab"]>li');
    // 获取焦点
    var phone_focu = document.querySelectorAll('[data-phone="focu"]>li');
    for(let i=0;i<phone_focu.length;i++){
        (function(i){
            phone_focu[i].onclick = function(){
                for(let n=0;n<phone.length;n++){
                    phone[n].className ='';
                    phone_focu[n].className ='';
                }
                phone[i].className = 'show';
                phone_focu[i].className = 'on';
            }
        })(i)
    }
})();
// 导航栏固定
(function(){
    var fix =document.querySelector('[data-fix="fix"]');
    window.addEventListener('scroll',function(){
        var ftop = fix.getBoundingClientRect().top;
        var scrollTop = window.scrollY;
        if(ftop+150 < scrollTop){
        fix.classList.add('t-b-fix','t-b-fix-t');
        }else {
        fix.classList.remove('t-b-fix','t-b-fix-t');
        }
    });
})();
