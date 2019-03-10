//获取用户信息
(function(){
  if(localStorage){
    ajax({
        url:'/user/userinfo',
        type:'post',
        data:{
          user_name:localStorage.getItem('name'),
        },
        success:function(data){
          update(data[0]);
        }
    });
  }
  function update(data){
    for(var key in data){
      if(data[key]==null){
        data[key]="";
      }
    }
    var name = document.querySelector('[data-name="name"]');
    var phone = document.querySelector('[data-phone="phone"]');
    var email = document.querySelector('[data-email="email"]');
    var time = document.querySelector('.time');
    var date = new Date();
    var now = date.getHours();
    var str = '';

    if(now < 12 && now  > 5){ 
      str = '早上好';
    }else if(now<18 && now>12) {
      str = "中午好";
    }else {
      str = "晚上好";
    }
    
    time.innerHTML = str;
    name.innerHTML = data.user_name;
    phone.innerHTML = data.user_phone;
    email.innerHTML = data.user_email;
  }
})();