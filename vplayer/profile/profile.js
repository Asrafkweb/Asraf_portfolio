
// username code strat
var user=sessionStorage.getItem('user');

window.onload=function() {
  
var profile_name= document.getElementById('profile_name');
    
    var user_profile_text_data=localStorage.getItem(user);
    user_profile_converted_data=JSON.parse(user_profile_text_data);
    var username=user_profile_converted_data.username;
    profile_name.innerHTML=atob(username);
    //second page main profile ;
    document.getElementById('profile_username').innerHTML=atob(username);
    var user_profile_picture=document.getElementById('profile_picture');
    var profile_pic_path=localStorage.getItem(user+'image');
    user_profile_picture.style.backgroundImage="url("+profile_pic_path+")";
    
    
}
// end of username coding



// uploading of user image

if(sessionStorage.getItem('user')==null){
  window.location.replace('/login or Signup /Login.Html');
  
} 

else {
  // code for already pic upload
  if(localStorage.getItem(user+'image')!=null)
  {// code for second page
    var page=document.getElementById('page');
      page.style.display='none';
    var main_page=document.getElementById('main_profile_page');
    
    main_page.style.display='block';
    
  }
    
  
  
 
  var pic_path = document.getElementById('file');
pic_path.onchange = function() {
  
  var reader = new FileReader();
  reader.readAsDataURL(pic_path.files[0]); // Access the file from the files array
  reader.onload = function() {
    var result = reader.result;
    var profile_pic = document.getElementById('profile_pic');
    
    
    profile_pic.style.backgroundImage = "url(" + result + ")";
    document.getElementById('user_icon').style.display='none';
    var next_btn=document.getElementById('next');
    next_btn.style.display='block';
    
    next_btn.onclick=function(){
      localStorage.setItem(user+"image",result);
      var page=document.getElementById('page');
      page.style.display='none';
      window.location=location.href;
    }
  }
  
}

}

//
var signout =document.getElementById("signout");

signout.onclick=function(){
  sessionStorage.clear();
  var signout_text=document.getElementById('signout_text');
  signout_text.innerHTML='Please wait...'
  signout_text.style.fontSize=15+'px';
  setTimeout(function(){
    location.replace('/login or Signup /Login.Html')
  },2000);
}
// contact coding
var contact=document.getElementById('contact');
contact.onclick=function(){
  window.location.replace('/contact /contact.html');
}


var palyer=document.getElementById('player');
player.onclick=function(){
  window.location.replace('/player/player.html');
}