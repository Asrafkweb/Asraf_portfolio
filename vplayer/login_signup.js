
var signup=document.getElementById('signup_frm');
signup.onsubmit=function () {
  var user= btoa(document.getElementById('username').value);
  var email=btoa(document.getElementById('email').value);
  var mobile= btoa(document.getElementById('mobile').value);
  var pass= btoa(document.getElementById('password').value);
  
  //Data storing code start
  
  var object_data={username:user,email:email,mobileN:mobile,password:pass};
  var object_data_text=JSON.stringify(object_data);
  
  

  if(user !='' && email!='' && pass!='' && mobile!=''){
    localStorage.setItem(email,object_data_text);
    
    
    var signup_btn=document.getElementById('signup_btn');
    signup_btn.innerHTML='Sign up Successfully !';
    signup_btn.style.background='green';
    setTimeout(function(){
      location.reload();
    },3000);
    
    
    
    
  }
  
  return false;}
  // Data storing code end 
  
  
  
  /* email checking code start*/
  
  
  var email_check=document.getElementById('email');
  email_check.onchange= function() {
    var email=btoa(this.value);
   if(localStorage.getItem(email)!=null) {
  var signup_btn=document.getElementById('signup_btn');
  signup_btn.disabled=true;
  signup_btn.style.background='#ccc';
  email_check.style.borderBottomColor='red';
  
  
  
    var warning = document.getElementById('warning');
    warning.style.display = 'block';
    warning.style.color='red';
    
    email_check.onclick= function() {
      signup_btn.disabled=false;
  signup_btn.style.background='linear-gradient(90deg, rgba(35,31,105,1) 2%, rgba(255,11,90,1) 37%, rgba(0,212,255,1) 97%)';
  email_check.style.borderBottomColor='#ccc';
  
    var warning = document.getElementById('warning');
    warning.style.display = 'none';
    var email=document.getElementById('email');
    this.value='';
    
    
    }
    
    // Disable the signup button
} 
}
  
  /*Email checking code end;*/
  
  /* login form coding */
  
  
  var login_frm = document.getElementById('login_frm');

login_frm.onsubmit = function() {
  var email =btoa(document.getElementById('login_email').value);
  var password=btoa(document.getElementById('login_password').value);
  var object_text_data= localStorage.getItem(email);
  if(object_text_data==null){
    var login_email_war=document.getElementById('login_email_war');
    var email_input=document.getElementById('login_email');
    login_email_war.style.display='block'
    email_input.style.borderBottomColor='red';
    email_input.onclick=function(){
      email_input.value='';
      login_email_war.style.display='none'
    email_input.style.borderBottomColor='#0affff';
      
    }
    
  }
  else{
  var converted_data=JSON.parse(object_text_data);
  var correct_email=converted_data.email;
  var correct_password=converted_data.password;
  if(email==correct_email){
    if(password==correct_password){
      sessionStorage.setItem("user",email);
      window.location.replace("/profile /profile.html");
    }
    else {
      var login_password_war=document.getElementById('login_password_war');
    var password_input=document.getElementById('login_password');
    login_password_war.style.display='block'
    password_input.style.borderBottomColor='red';
    password_input.onclick=function(){
      password_input.value='';
      login_password_war.style.display='none'
    password_input.style.borderBottomColor='#0affff';
      
    }
    
    }
  }
  
  

}
return false;
}
