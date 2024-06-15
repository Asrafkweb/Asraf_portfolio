$(document).ready(function(){
  $(".p_bar").animate({width:'80%'},1000,function () {
    $('.p_bar-css').animate({width:'80%'},1000,function () {
      $(".p_bar-c3").animate({width:'60%'},1000,function(){
        $('.p_bar-js').animate({width:'75%'},1000,function(){
          $('.p_bar-jquery').animate({width:'85%'},1000);
        });
      });
    });
  });
});
var projects_parent=document.querySelector('#parent');

projects.forEach((data)=>{
  projects_parent.innerHTML+=`
              <div class="col-sm-4 ">
                  <div class="card project-content">
                  <div class=" project-img">
                      <img src="${data.image}" class="card-img-top" alt="Project 1">
                      </div>
                    <div class="card-body">
                    <h5 class="card-title">${data.project_name}</h5>
                    <p class="card-text">${data.project_discription}</p>
              <div class="using">

             </div>
                    <a href="${data.link}" class="btn btn-primary">View Project</a>
                      </div>
                  </div>
              </div>
             
  `
  
})
projects.forEach((data, index) => {
  // Select the specific .using div for the current project
  var parent = projects_parent.querySelectorAll('.using')[index];
  lang(data.using, parent);
});



function lang(all_lang,parent) {

all_lang.forEach((lang)=>{
  var span =document.createElement('span');
  span.innerHTML=lang;
  parent.appendChild(span);
})

}



alert("checking js work");
