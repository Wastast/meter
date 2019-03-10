// 切换div块 ------start
(function(){
  // 获取标题的li
  var li_index = document.querySelectorAll('.t-sel>ul>li');
  // 获取三角形的数据
  var trg = document.querySelectorAll('.trg');
  // 获取div模块
  var divs = document.querySelectorAll('.up-body');
  for(let i = 0;i<li_index.length; i++){
    (function(i){
      li_index[i].onclick = function(){
        for(let n = 0;n<li_index.length;n++){
          li_index[n].className = '';
          trg[n].style.cssText = 'display:none'; 
          divs[n].style.cssText = 'display:none';
        }
        li_index[i].className = 'active';
        trg[i].style.cssText = 'display:blcok'; 
        divs[i].style.cssText = 'display:blcok';
      }
    })(i);
  }
})();
// 切换div块 ------END

//获取用户信息-----start
(function(){
  if(localStorage){
    // console.log(localStorage.getItem('name'));
    ajax({
        url:'/user/userinfo',
        type:'post',
        data:{
          user_name:localStorage.getItem('name'),
        },
        success:function(data){
          update(data[0]);
        }
    })
  }
  function update(data){
    for(var key in data){
      if(data[key]==null){
        data[key]="";
      }
    }
    var level = 1;
    // --------------------------------------------------------
    var value = document.querySelectorAll('[data-user="value"]');
    var uname = document.querySelector('[data-user="name"]');
    var uid = document.querySelector('[data-user="id"]');
    // 获取邮箱和手机文本
    var email = document.querySelector('[data-user="eamil"] .w-info');
    var phone = document.querySelector('[data-user="phone"] .w-info');
    // 判断数据数据是否为空
    if(data.user_email !=''){
      level++;
      email.innerHTML = '用于更换密码，更换手机';
      email.style.cssText = 'color:rgba(51,51,51,0.7)';
    }
    if(data.user_phone !=''){
      level++;
      phone.innerHTML = '安全手机可以用于重置密码或其他安全验证';
      phone.style.cssText = 'color:rgba(51,51,51,0.7)';
    }

    value[0].innerHTML = data.user_name;
    value[1].innerHTML = data.user_birthday;
    value[2].innerHTML = data.user_gender=='m'?'男':'女';
    uname.innerHTML = data.user_name;
    uid.innerHTML = data.user_id;

    // 获取安全等级模块
    var sercity = document.querySelector('[data-user="sercity"]');
    var line = sercity.querySelector('.line');
    sercity.querySelector('.safety-score>span').innerHTML = `${level*25}`

    line.style.cssText = `width: ${level*25*7}px;`
  }
})();
//获取用户信息-----END

// 用户修改信息 ---start
(function(){
  var text = document.querySelectorAll('[data-info="info"]');
  // 获取确认键
  var conFirm = document.querySelectorAll('[data-true="pwd"]');
  var box = document.querySelectorAll('[data-box="box"]');
  // 获取用户的id  因为id是一定的不会变的
  var uid = document.querySelector('[data-user="id"]');
  for(var i=0;i<conFirm.length;i++){
    (function(i){
      conFirm[i].addEventListener('click',function(){
        switch(i){
          case 0:
            upwd(text[i],box[i]);
            break;
          case 1:
            email(text[i],box[i]);
            break;
          case 2:
            phone(text[i],box[i]);
            break;
          case 3:
            question(text[i],box[i]);
            break;
        }
        window.reload();
      })
    })(i);
  }

  // 绑定邮箱函数
  function email(text,box){
    let email = document.getElementsByName('eamil')[0];
    let reg = /^\w{5,}@[a-z0-9]{2,3}\.[a-z]+$|\,$/;
    if(reg.test(email.value)){
      ajax({
        url:'/user/update',
        data:{
          user_id: uid.innerHTML,
          user_email: email.value
        },
        type:'post',
        success:function(result){
          location.reload();
          console.log(result);
        }
      })
      box.style.cssText = "display:none";
    }else{
      text.style.cssText = 'opacity:1';
    }
  }

  //绑定手机函数
  function phone(text,box){
    let phone = document.getElementsByName('phone')[0];
    let reg = /^1[34578]\d{9}$/;
    if(reg.test(phone.value)){
      ajax({
        url:'/user/update',
        data:{
          user_id: uid.innerHTML,
          user_phone: phone.value
        },
        type:'post',
        success:function(result){
          location.reload();
        }
      })
      box.style.cssText = "display:none";
    }else {
      text.style.cssText = 'opacity:1';
    }
  }

  //修改密码函数
  function upwd(text,box){
    var oPwd = document.getElementsByName('onepwd')[0];
    var tPwd = document.getElementsByName('twopwd')[0];
    if(oPwd.value && tPwd.value){
      text.style.cssText = 'opacity:0;'
      if(oPwd.value != tPwd.value){
        text.style.cssText = 'opacity:1;'
      }else{
        ajax({
          url:'/user/update',
          data:{
            user_id: uid.innerHTML,
            user_pwd: tPwd.value
          },
          type:'post',
          success:function(result){
            location.reload();
          }
        })
        text.style.cssText = 'opacity:0;'
        box.style.cssText = "display:none;"
      }
    }else {
      text.innerHTML = '请输入密码';
      text.style.cssText = 'opacity:1;'
    }
  }
  // 绑定密保问题
  function question(text,box){
    var que = document.getElementsByName('que')[0];
    var ans = document.getElementsByName('ans')[0];
    // var res = /^\d$/;
    // if(!(res.test(que))){
    //   console.log(1);
    // }
  }
})();
// 用户修改信息 ---END

// 修改按钮绑定
(function(){
  // 获取当前页面的设定按钮
  var up = document.querySelectorAll('.a-info .update');
  // 获取阴影盒子
  var box = document.querySelectorAll('[data-box="box"]');
  // 获取盒子中的X按钮
  var out = document.querySelectorAll('.box-out');
  // 获取盒子的取消按钮
  var fa = document.querySelectorAll('.p-false');
  for(let i=0;i<box.length;i++){
    if(i>3){
      out[i].addEventListener('click',function(){
        box[i].style.cssText = "display: none;";
      });
      fa[i].addEventListener('click',function(){
        box[i].style.cssText = "display: none;";
      });
      return;
    }
    up[i].addEventListener('click',function(){
      box[i].style.cssText = "display: block;";
    });
    out[i].addEventListener('click',function(){
      box[i].style.cssText = "display: none;";
    });
    fa[i].addEventListener('click',function(){
      box[i].style.cssText = "display: none;";
    });
  }
})();
// 修改按钮绑定

// 资料修改界面
(function(){
  var u_box = document.querySelector('[data-box="user"]');
  var box = document.querySelectorAll('[data-box="box"]');
  // 获取表格中的数据
  var name = document.getElementsByName('user_name')[0];
  var birthday = document.getElementsByName('user_birthday')[0];
  var sex = document.getElementsByName('user_sex')[0];
  // 获取表格中的确定按钮
  var on = document.querySelector('[data-true="user"]');
  var uid = document.querySelector('[data-user="id"]');
  // 绑定事件获取数值
  on.addEventListener('click',function(){
    var gender = ''
    if(sex.value==0){
      gender = 'w';
    }else{
      gender = 'm';
    }
    ajax({
      url:'/user/update',
      data:{
        user_id: uid.innerHTML,
        user_name: name.value,
        user_birthday: birthday.value,
        user_gender: gender,
      },
      type:'post',
      success:function(result){
        box[4].style.cssText = "display:block;";
        localStorage.setItem('name',name.value);
        location.reload();
      }
    });
  })
  u_box.onclick = function(){
    box[4].style.cssText = "display:block;";
  }
})();

// 用户更改头像
(function() {
  var aventOn = document.querySelector('[data-user="avert"]');
  // 更换头像盒子
  var box = document.querySelector('[data-box="avent"]');
  var sure = box.querySelector('.p-true')
  var x = box.querySelector('.box-out')
  var close = box.querySelector('.p-false')
  // 上传文件的input按钮
  var input = box.querySelector('input')
  // input.onchange = function (e) {
  //   let formData = new FormData();
  //   formData.append('file',e.target.files[0]);
  //   var xhr = new XMLHttpRequest()
  //   xhr.onreadystatechange = function () {
  //     if(xhr.readyState == 4 && xhr.status == 200) {
  //       var result = xhr.responseText
  //       console.log(result)
  //     }
  //   }
  //   xhr.open('post',url,true)
  //   xhr.setRequestHeader('Content-Type','multipart/form-data')
  //   xhr.send(formData)

  //   // console.log(e.target.files[0])
  // }
  aventOn.addEventListener('click',()=>{
    box.style.cssText = 'display:block;';
  })
  sure.onclick = () => {
    show()
  }
  x.onclick = () => {
    show()
  }
  close.onclick = () => {
    show()
  }
  function show () {
    box.style.cssText = 'display:none;';
  }
})()