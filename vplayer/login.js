var signup= document.getElementById('go_sign');
signup.onclick=function () {
  document.getElementById('login').style.display='none';
  document.getElementById('signup').style.display='block';
}

var login= document.getElementById('return_login');
login.onclick=function () {
  document.getElementById('login').style.display='block';
  document.getElementById('signup').style.display='none';
}