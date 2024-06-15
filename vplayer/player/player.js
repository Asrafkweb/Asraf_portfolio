var video= document.getElementById('video');
var result=document.getElementById('check');
var play_btn=document.getElementById('play');
function play(){
  if(video.paused){
    
    play_btn.className="fas fa-play-circle";
  }
  else{
   play_btn.className="fas fa-pause-circle";
    
  }
  
}
play_btn.onclick=()=>{
  if(video.paused){
    video.play();
    play_btn.className="fas fa-pause-circle";
  }
  else{
    video.pause();
    play_btn.className="fas fa-play-circle"
  }
}

// timing  coading

function time() {
  video.ontimeupdate=()=>{
    play();
  
  var timing=document.getElementById('v_duration');
  var c_time=video.currentTime;
  var total_duration=video.duration;
  var c_min=c_time/60;
  var c_sec=c_time-c_min;
  var t_min=parseInt(total_duration/60);
  var t_sec=parseInt(total_duration-t_min);
  
  timing.innerHTML=parseInt(c_min)+':'+parseInt(c_sec)+' / '+t_min+':'+t_sec;

 
progress();
}

}
time();

// progress bar coding but function call in time();

function progress() {
  
  var percentage =video.currentTime*100/video.duration;
  var bar =document.getElementById('progress_bar');
  bar.style.width=percentage+'%';
  
}

function video_add_box(){
  var add_btn=document.getElementById('add_btn');
  add_btn.onclick=()=>{
    var video_add_box=document.getElementById('video_add_box');
    video_add_box.style.display='block';
    if(add_btn.className=="fas fa-plus-circle"){
   add_btn.className="fa-solid fa-xmark-circle";
   video_add_box.style.display='block';
  }
  else if (add_btn.className=="fa-solid fa-xmark-circle") {
   add_btn.className="fas fa-plus-circle";
   video_add_box.style.display='none';
   
  }
  
  }
  
}

video_add_box();


// options for add local video


var click =document.getElementById('local_video');
var link =document.getElementById('link');
var file=document.getElementById('file');
click.onclick=function(){
  file.style.display='block';
  click.innerHTML=='Add online videos link !';
  link.style.display='none';
  if(click.innerHTML=='Add online videos link !'){
    file.style.display='none';
    link.style.display='block';
    click.innerHTML='Add your local videos';
  }
  else if(click.innerHTML=='Add your local videos'){
    file.style.display='block';
    link.style.display='none';
    click.innerHTML='Add online videos link !';
  }
  
  
}
// file path coding................
var file_path=document.getElementById('file');
file_path.onchange=function (){
  var reader=new FileReader()
  reader.readAsDataURL(file_path.files[0]);
  reader.onload=function(){
    var path=reader.result;
    link=path;
  }
}


// video name and link storing


function store(){
  var video_add_btn=document.getElementById('add_video');
  video_add_btn.onclick=()=>{
    var video_name=document.getElementById('video_name').value;
    
    var object={video_name:video_name,link:link}
    var text_file=JSON.stringify(object);
    localStorage.setItem(video_name+'video',text_file);
  }
  
  
}
store();






// data fetching
function data_fetching(){
  
  var i;
  for(i=0;i<localStorage.length;i++){
    
    var all_keys=localStorage.key(i);
    if(all_keys.match("video")){
     var text_file=localStorage.getItem(all_keys);
     var obj=JSON.parse(text_file);
     
     
     var list_box=document.createElement('DIV');
  list_box.setAttribute('class','list');
      var title=document.createElement('P');
      title.innerHTML=obj.video_name;
      title.setAttribute('id','video_title');
      title.className='video_title';
      var play= document.createElement('BUTTON');
      play.setAttribute('type','button');
      play.setAttribute('id','play_link');
      play.className='video_link_btn';
      
      play.setAttribute('url',obj.link);
      play.innerHTML='Play';
      var delete_btn=document.createElement('BUTTON');
      delete_btn.setAttribute('id','delete');
      delete_btn.className='delete_btn';
      delete_btn.innerHTML='Delete'
      
      list_box.appendChild(title);
      list_box.appendChild(play);
      list_box.appendChild(delete_btn);
      var bottom=document.getElementById('list_box')
      bottom.appendChild(list_box);
      
      
      
    }
  }
}
data_fetching();
// video delete code
function data_delete(){
  var delete_btn=document.getElementsByClassName('delete_btn');
  var i;
  for(i=0;i<delete_btn.length;i++){
 
 delete_btn[i].onclick=function(){
   var parent=this.parentElement;
  var video_name= parent.getElementsByTagName('P')[0].innerHTML;
  
   localStorage.removeItem(video_name+'video');
   parent.remove();
   
 }
  }
}

data_delete();


// function for play button

function play_video(){
  var v_play_btn=document.getElementsByClassName('video_link_btn');
  var i;
  for(i=0;i<v_play_btn.length;i++){
  
  v_play_btn[i].onclick=function(){
    refresh();
    var url_link= this.getAttribute('url');
    video.src=url_link;
    video.play();
    this.innerHTML='Playing..'
  }
  
  }
}
play_video();
function refresh(){
  var v_play_btn=document.getElementsByClassName('video_link_btn');
  var i;
  for(i=0;i<v_play_btn.length;i++){
    
    v_play_btn[i].innerHTML='Play';
  }
}

/// full screen video coding

var expand=document.getElementById('expand');
expand.onclick=()=>{
  
  video.requestFullscreen();
}

// video skipping code

function skip(){
  var progress_box=document.getElementById('progress_box');
  progress_box.onclick=function(event){
    var per =event.offsetX/this.offsetWidth;
    video.currentTime=per*video.duration;
  }
}
skip();

// video searching function 
var search=document.getElementById('search');
search.oninput=function(){
  var all_videos=document.getElementsByClassName('video_title');
  var i;
  for(i=0;i<all_videos.length;i++){
    
    var all=all_videos[i].innerHTML;
    all.toUpperCase;
    if(all.match(search.value.toUpperCase)){
      all_videos[i].parentElement.style.display='block'
    }
    else{
      all_videos[i].parentElement.style.display='none';
    }
    
  }
}


//video next button coading

function next(){
  
  var next_btn=document.getElementById('next');
  next_btn.onclick=function(){
    
  var all_play_btn=document.getElementsByClassName('video_link_btn');
    var i;
    for (var i = 0; i < all_play_btn.length; i++)
    {
      if(all_play_btn[i].innerHTML=='Playing..')
      {
        var parent=all_play_btn[i].parentElement.nextSibling;
        
        
        var btn=parent.getElementsByClassName('video_link_btn')[0];
        btn.click();
        
        
       return false;
      }
      
    }
  }
}
next();

// previous btn coding 
function previous(){
  
  var next_btn=document.getElementById('previous');
  next_btn.onclick=function(){
    
  var all_play_btn=document.getElementsByClassName('video_link_btn');
    var i;
    for (var i = 0; i < all_play_btn.length; i++)
    {
      if(all_play_btn[i].innerHTML=='Playing..')
      {
        var parent=all_play_btn[i].parentElement.previousSibling;
        
        
        var btn=parent.getElementsByClassName('video_link_btn')[0];
        btn.click();
        
        
       return false;
      }
      
    }
  }
}
previous();
/*
function next() {
    var next_btn = document.getElementById('next');
    next_btn.onclick = function() {
        var all_play_btn = document.getElementsByClassName('video_link_btn');
        for (var i = 0; i < all_play_btn.length; i++) {
            if (all_play_btn[i].innerHTML === 'playing..') {
                var nextElement = all_play_btn[i].parentElement.nextElementSibling;
                while (nextElement) {
                    if (nextElement.classList.contains('video_link_btn')) {
                        nextElement.click(); // Trigger the click event
                        alert('Next video clicked!');
                        return false;
                    }
                    nextElement = nextElement.nextElementSibling;
                }
            }
        }
    };
}

next();
*/