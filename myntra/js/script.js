/*
{
        id: '001',
        image: 'images/1.jpg',
        company: 'Carlton London',
        item_name: 'Rhodium-Plated CZ Floral Studs',
        original_price: 1045,
        current_price: 606,
        discount_percentage: 42,
        return_period: 14,
        delivery_date: '10 Oct 2023',
        rating: {
            stars: 4.5,
            count: 1400,
        },
    }
*/
let bagItems;
window.onload=function fname() 
{
var lsbag_str=localStorage.getItem('bag_item_id');
if(lsbag_str!=null){
  bagItems=JSON.parse(lsbag_str);

}else{
  bagItems=[];
  console.log(lsbag_str);
}
}

let container_main=document.querySelector('.container-main');

item.forEach((item)=>{
  if(!container_main){
    return;
  }
container_main.innerHTML+=`
<div class='container-item'>
<div class ='img-cont'>
   <img class="item-img"  src="${item.image}" alt="item-images"/>
   <div class="rating">
    ${item.rating.stars} <i class="fas fa-star"></i> / ${item.rating.count}
      </div>
</div>   


        <div class="item-brand">
          ${item.company}
        </div>
        <div class="item-name">
          ${item.item_name}
        </div>
        <div class="price">
          <span class="current-prie">RS${item.current_price}</span>
          <span class="old-price">RS ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% off)</span>
        </div>
        <button type="button" class="add-bag-btn" onclick='addToBag(${item.id})'>Add to bag</button>
          </div>`;
  

});


function addToBag(itemsId){
  bagItems.push(itemsId);
  localStorage.setItem('bag_item_id',JSON.stringify(bagItems));
  baglsCount();
  };
 


function baglsCount() {
 var lsbag_str=localStorage.getItem('bag_item_id');
 var bag_count=document.querySelector('#badge-count');
console.log(lsbag_str);
 var len=JSON.parse(lsbag_str);
 
 if(lsbag_str==null){
    bag_count.style.display='none';
 }
 else {
   if(!bag_count){
     return ;
   }// condition html Chek
   bag_count.innerHTML=(len.length);
 }
};
baglsCount();


//.side nav coading 


var side_toggle=document.getElementById('side-nav-toggler');
var side_nav_body=document.getElementById('side-nav');
var main_sction=document.querySelector('#main');
main.addEventListener('click',()=>{
side_nav_body.classList.add('hide');
});

side_toggle.addEventListener('click',()=>{
  side_nav_body.classList.remove('hide');
  
});

side_nav_body.onblur= function alrt(){
}