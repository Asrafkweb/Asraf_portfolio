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
//footer
document.addEventListener("DOMContentLoaded", function() {
    const currentYearSpan = document.getElementById("current-year");
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
});


const form = document.getElementById('contactForm') || document.querySelector('.my-form');
const button = form.querySelector('button');

form.addEventListener('submit', function(event) {
    // 1. Stop the page from standard reloading so we can handle it smoothly
    event.preventDefault(); 
    
    // 2. Turn the button green and show loading status instantly
    const originalText = button.textContent;
    button.textContent = 'Sending Message...';
    button.style.backgroundColor = '#28a745'; 
    button.disabled = true;

    // 3. Send the data to FormSubmit.co automatically in the background
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // SUCCESS: The email was successfully sent to your inbox!
            alert('Thank you! Your message has been sent successfully.');
            form.reset(); // Clear the text boxes
        } else {
            // ERROR from server
            alert('Oops! There was a problem sending your message.');
        }
    })
    .catch(error => {
        // NETWORK ERROR
        alert('Network error. Please try again.');
    })
    .finally(() => {
        // 4. Reset the button back to normal no matter what happens
        button.textContent = originalText;
        button.style.backgroundColor = ''; 
        button.disabled = false;
    });
});
