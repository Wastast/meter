//获取用户信息
(function(){
  if(localStorage){
    ajax({
        url:'/user/userinfo',
        type:'post',
        data:{
          name:localStorage.getItem('name'),
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
    var name = document.querySelector('[data-name="name"]');
    var phone = document.querySelector('[data-phone="phone"]');
    var email = document.querySelector('[data-email="email"]');
    name.innerHTML = data.user_name;
    phone.innerHTML = data.user_phone;
    email.innerHTML = data.user_email;
  }
})();