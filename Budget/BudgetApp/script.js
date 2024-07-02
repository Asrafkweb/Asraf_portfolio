// getting value

var products=[];
var budget_input=document.querySelector('#budgetAmount');
var p_name=document.querySelector('#products_name');
var p_amt=document.querySelector('#products_amount');
var budget_btn=document.querySelector('#budget_btn');
var budget_ele=document.getElementById('total_budget');
var exp_btn=document.querySelector('#exp_btn');
var list_container=document.getElementById('exp-list-container');
var total_exp_ele=document.querySelector('#total_exp')
var blance_ele=document.querySelector('#blance');
// warnings 
var budget_war=document.querySelector('.warning-budget');
var war_amt=document.querySelector('.warning-amount');
// warning variable 
window.onload=()=>{
  var budget=JSON.parse(localStorage.getItem('BudgetAmount'));
  
  budget_ele.innerText=budget;
  loadproduct();
  DOMlist()
  TotalExp();
}

// budget set coding
budget_btn.addEventListener('click',setbudget);
budget_input.addEventListener('keyup',()=>{
    budget_war.classList.add('d-none');
  })
function setbudget() {
  if(budget_input.value!=''){
  var text_budget=JSON.stringify(budget_input.value);
  
    localStorage.setItem('BudgetAmount',text_budget);
    showbudget();
    TotalExp()
  }
  else {
    budget_war.classList.remove('d-none');
  }
  
}
function showbudget() {
  var budget=JSON.parse(localStorage.getItem('BudgetAmount'));
  budget_ele.innerText=budget;
  budget_input.value='';
  
  
}

// budget set codin end
//---------------------------------
// Set Expenses coding start......
// localStorage products checking
function loadproduct () {
  let local_products=JSON.parse(localStorage.getItem('products'));
if(local_products!=null){
  products=local_products;
  localStorage.setItem('products',JSON.stringify(products));
}
else {
  products=[];
}
}

// end of localastorage code

p_name.addEventListener('keyup',()=>{
  war_amt.classList.add('d-none');

});
p_amt.addEventListener('keyup',()=>{
  war_amt.classList.add('d-none');

})
exp_btn.addEventListener('click',setExp);
function setExp() {
  exp_btn.innerHTML='Set expenses';
  if(p_name.value!='' && p_amt.value!=''){
  products.push({'name':p_name.value,
    'amt':p_amt.value
  });
  localStorage.setItem('products',JSON.stringify(products));
  p_name.value='';
  p_amt.value='';
  list_container.innerHTML='';
  DOMlist()
  TotalExp();
  
  }
  else{

war_amt.classList.remove('d-none');
  }
}

// Dom creating list for products
function DOMlist() {
let local_products=JSON.parse(localStorage.getItem('products'));
console.log(local_products);
local_products.forEach((item)=>{
  list_container.innerHTML+=`
  <div class="row py-3">
  <div class="col-4" style="border-left: 5px solid #0d6efd">${item.name}</div>
  <div class="col-4 text-center"><Span>${item.amt}</Span></div>
  <div class="col-4 text-center">
    <i class="fas fa-edit" onclick="editFunction('${item.name}')"></i>&nbsp;&nbsp;&nbsp;<i class="fas fa-trash" onclick="deleteFunction('${item.name}')"></i>
  </div>
</div>
`
});
}

// total expense calculate 
function TotalExp() {
  let total_exp=0;
  let local_products=JSON.parse(localStorage.getItem('products'));
  
  local_products.forEach((product)=>{
   total_exp+=Number(product.amt);
   
  });
  total_exp_ele.innerHTML=total_exp;
  blance(total_exp)
}



// Blance calculate
  function blance(exp){
    console.log('i am exp',exp);
  let budget_amt=JSON.parse(localStorage.getItem('BudgetAmount'));
  let exp_amt= Number(exp);
  
    blance_ele.innerHTML=Number(budget_amt-exp_amt);
  }
  
  // deleting code strated
  function deleteFunction(pro){
    var del_confirm=window.confirm('Are you sure !\nDo you wanna delete it ?');
    if(del_confirm)
    {
         new_products= products.filter((product_arr)=>{
      if(product_arr.name!=pro){
        return product_arr;
      }
    });
    
    console.log('new products',new_products);
    localStorage.setItem('products',JSON.stringify(new_products));
    list_container.innerHTML='';
  loadproduct();
  DOMlist()
  TotalExp();
    }
 }
  // editing coding
 function editFunction(p) {
   var edit_confirm=window.confirm('Are you sure !\nDo you wanna Edit it ?');
    if(edit_confirm)
    {
   var edit_product= products.filter((product_name)=>{
     if(p==product_name.name){
       return product_name;
     }
   });
   let edit_name=edit_product[0].name;
   let edit_amt=edit_product[0].amt;
   p_name.value=edit_name;
   p_amt.value=edit_amt;
   p_name.focus();
   exp_btn.innerHTML='Update Changes';
   // seting edit
   var local_all_exp=JSON.parse(localStorage.getItem('products'));
   console.log(local_all_exp);
   new_products= local_all_exp.filter((product_arr)=>{
      if(product_arr.name!=p){
        return product_arr;
      }
    });
    
    console.log('new products',new_products);
    products=new_products;
    localStorage.setItem('products',JSON.stringify(new_products));
  }
 }
