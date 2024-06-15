var close_icon=document.querySelector('.close_change');
var select=document.querySelector('#option');
var change_box=document.querySelector('.tool-container');
var tool_btn=document.querySelector('#tool-btn');
var update_change=document.querySelector('#btn_change_update');
var wishes=document.querySelector('#option');
var wish_p=document.querySelector('.wish');
var change_name_element=document.querySelector('#username');
var change_name=document.querySelector('#change_name');
var coustom_wish=document.querySelector('#user_write_wish');
tool_btn.addEventListener('click',()=>{
  change_box.classList.remove('hide');
})

close_icon.onclick=function(){
  change_box.classList.add('hide');
}
update_change.addEventListener('click',()=>{
  if(coustom_wish.value==''){
  if(wishes.value!='Select Wishes'){
  wish_p.innerHTML=wishes.value;
  }
  }
  else{
    wish_p.innerHTML=coustom_wish.value;
  }
  
  if(change_name.value!=''){
    change_name_element.innerHTML=`
            <i class="fa-solid fa-star icon_s animate__animated animate__pulse"></i>${change_name.value}  <i class="fa-solid fa-star icon_s_r animate__animated animate__pulse"></i>`
  }
  change_box.classList.add('hide');
  
})

//footer
document.addEventListener("DOMContentLoaded", function() {
    const currentYearSpan = document.getElementById("current-year");
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
});
