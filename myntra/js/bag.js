
let bagitemsid;
var lsbag_str=localStorage.getItem('bag_item_id');
var bag_item_id=JSON.parse(lsbag_str);
bagitemsid=bag_item_id.map(itemid=>{
  for(var i=0; i<item.length;i++){
    // note item coming from item.js file ok.
    if(itemid==item[i].id){
      return item[i];
    }
  }
});

console.log(bagitemsid)
for(let data of bagitemsid){
  bagitems(data);
  
};


function bagitems(data){
  var main_bag_item_cont=document.querySelector('#bag-items-cont')
  if(!main_bag_item_cont){
    return;
  }
  main_bag_item_cont.innerHTML+=`
       <div id="item-details">
        <div class="img-cont">
        <img src="${data.image}" alt="" width="100%">
      </div>
      <div class="details">
        <span class="item-company">${data.company}</span>
        <div class="item-name">
          ${data.item_name}
        </div>
        <div class="price">
          <span class="current-price">RS${data.current_price}</span>
          <span class="org-price">RS${data.original_price}</span>
        </div>
        <div class="deliver">
          Deliver in 31 oct 2024
        </div>
      </div>
      <div class='remove-bag-item' onclick=removebag(${data.id})>X</div>
      </div>`
}

function removebag(itemId) {
  ids=bag_item_id.filter((id)=>{
    return id!=itemId;
  });
  localStorage.setItem('bag_item_id',JSON.stringify(ids));
  display();
  baglsCount();
  generateSummary();
  
};



function generateSummary(data) {
  let summary_cont=document.querySelector('#summary-container');
  if(!summary_cont){
    return;
  }
  let total_item=bagitemsid.length;
  let total_amount=0;
  let discount_amount = 0;
  let payment=0;
  bagitemsid.map(items=>{
   total_amount+=items.original_price;
   discount_amount+=items.original_price- items.current_price;
  });
  payment=total_amount-discount_amount
  summary_cont.innerHTML=`
          <div class="row m-0"><h4 class="text-center my-2">Total Selected items ${total_item} pcs</h4></div>
        <div class="summary">
          <div class="totalRs">
            <span>Total Amount</span>
            <span>Rs${total_amount}</span>
          </div>
          <div class="discountamt">
            <span>Discount</span>
            <span>Rs${discount_amount}</span>
          </div>
          <div class="vat">
            <span>Vat</span>
            <span>200</span>
          </div>
          <div class="ship">
            <span>shipping</span>
            <span>99</span>
          </div>
        </div>
        <div class="total">Total 
          Rs${payment}
        </div>
    </div>`;
}


generateSummary();


// back btn
let back_btn=document.getElementById('back-btn');
  back_btn.addEventListener('click',() =>{
    if(!back_btn){
  return;
  }
       history.back();
});