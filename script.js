/* Main script. Needs projects.js loaded first. */
document.documentElement.classList.add('js');
(function(){var els=document.querySelectorAll('.rv');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15});
els.forEach(function(e){io.observe(e)});})();

(function(){var f=document.getElementById('cf'),l=document.getElementById('sl');
f.addEventListener('submit',function(){l.textContent='Sending…';setTimeout(function(){l.textContent='Sent! Check the new tab';setTimeout(function(){l.textContent='Send Message';f.reset()},3500)},800)});})();

function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function tc(t){var m={html:'#e34f26',css:'#2965f1',javascript:'#f7c600',js:'#f7c600',react:'#22b8d6',bootstrap:'#8b5cf6',tailwind:'#14b8a6','node.js':'#22c55e',node:'#22c55e',php:'#7c8cf8',wordpress:'#3b82f6',python:'#3b82f6',ai:'#ec4899','google ads':'#f59e0b','meta ads':'#3b82f6',seo:'#10b981'},k=String(t).toLowerCase();if(m[k])return m[k];var h=0;for(var i=0;i<k.length;i++)h=(h*31+k.charCodeAt(i))%360;return 'hsl('+h+',70%,55%)'}
function card(p,i,dup){var ok=p.link&&p.link!=='#';
 var link=ok?'<a class="pl" href="'+esc(p.link)+'" target="_blank" rel="noopener"'+(dup?' tabindex="-1"':'')+'>View project <span aria-hidden="true">&rarr;</span></a>':'<span class="pl off">Link coming soon</span>';
 var tags=(p.tags||[]).map(function(t){return '<span class="tg" style="--c:'+tc(t)+'">'+esc(t)+'</span>'}).join('');
 return '<article class="pc" style="--i:'+i+'"'+(dup?' aria-hidden="true"':'')+'><div class="pimg"><img src="'+esc(p.image)+'" alt="'+esc(p.title)+'" loading="lazy"></div><div class="pb"><h3>'+esc(p.title)+'</h3><p>'+esc(p.description)+'</p><div class="tags">'+tags+'</div>'+link+'</div></article>'}
function renderProjects(){
 var car=document.getElementById('car'),tr=document.getElementById('ptrack'),n=projects.length;
 var reps=Math.max(1,Math.ceil(((car.clientWidth||1000)+320)/(Math.max(n,1)*320)));
 var half='',all='';
 for(var r=0;r<reps;r++)half+=projects.map(function(p,i){return card(p,i,r>0)}).join('');
 tr.innerHTML=half+half.replace(/<article class="pc"/g,'<article aria-hidden="true" class="pc"').replace(/<a class="pl"/g,'<a tabindex="-1" class="pl"');
 tr.style.setProperty('--dur',Math.max(20,n*reps*7)+'s');
 document.getElementById('pgrid').innerHTML=projects.map(function(p,i){return card(p,i,false)}).join('');
 document.getElementById('mc').textContent='('+n+')';
 document.getElementById('openAll').textContent='View All Projects ('+n+')';
}
(function(){var m=document.getElementById('modal'),last=null,rt;
 function open(){last=document.activeElement;m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('closeAll').focus()}
 function close(){m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow='';if(last)last.focus()}
 document.getElementById('openAll').addEventListener('click',open);
 document.getElementById('closeAll').addEventListener('click',close);
 m.addEventListener('click',function(e){if(e.target===m)close()});
 document.addEventListener('keydown',function(e){if(!m.classList.contains('open'))return;
  if(e.key==='Escape')close();
  if(e.key==='Tab'){var f=m.querySelectorAll('button,a[href]'),a=f[0],z=f[f.length-1];
   if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
 window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(renderProjects,250)});
 renderProjects();
})();

(function(){var b=document.getElementById('burger'),m=document.getElementById('menu');
function set(o){m.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')}
b.addEventListener('click',function(){set(!m.classList.contains('open'))});
m.addEventListener('click',function(e){if(e.target.tagName==='A')set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
window.addEventListener('resize',function(){if(innerWidth>820)set(false)});})();

(function(){var L={};[].forEach.call(document.querySelectorAll('.menu a[href^="#"]'),function(a){L[a.getAttribute('href').slice(1)]=a});
function on(id){for(var k in L)L[k].classList.toggle('on',k===id);}
if(!('IntersectionObserver' in window))return;
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting)on(e.target.id&&L[e.target.id]?e.target.id:null)})},{rootMargin:'-40% 0px -55% 0px'});
['about','skills','projects','contact'].forEach(function(i){var el=document.getElementById(i);if(el)io.observe(el)});
var h=document.querySelector('.hero-wrap');if(h)io.observe(h);})();

document.addEventListener('touchstart',function(){},{passive:true});


/* Carousel controller: JS auto-scroll that you can also swipe, drag or scroll by hand. */
(function(){
var car=document.getElementById('car'),tr=document.getElementById('ptrack');if(!car||!tr)return;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,SPEED=45;
var pos=1,last=0,hover=false,focus=false,touching=false,down=false,vis=true,lastUser=0,t0=0,sx=0,ss=0,moved=0;
function half(){return tr.scrollWidth/2}
function stamp(){lastUser=performance.now()}
car.scrollLeft=1;last=car.scrollLeft;
car.addEventListener('scroll',function(){
 var sl=car.scrollLeft,h=half();
 if(Math.abs(sl-last)>2){stamp();pos=sl;}
 if(!reduce&&h>car.clientWidth){
  if(sl>=h){car.scrollLeft=sl-h;pos=car.scrollLeft;last=pos}
  else if(sl<=0){car.scrollLeft=sl+h;pos=car.scrollLeft;last=pos}
 }
},{passive:true});
car.addEventListener('touchstart',function(){touching=true;stamp()},{passive:true});
['touchend','touchcancel'].forEach(function(n){car.addEventListener(n,function(){touching=false;stamp()},{passive:true})});
car.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')hover=true});
car.addEventListener('pointerleave',function(){hover=false});
car.addEventListener('focusin',function(){focus=true});
car.addEventListener('focusout',function(){focus=false});
car.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;down=true;moved=0;sx=e.clientX;ss=car.scrollLeft;car.classList.add('drag');stamp()});
window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));car.scrollLeft=ss-dx;pos=car.scrollLeft;stamp()});
window.addEventListener('pointerup',function(){if(!down)return;down=false;car.classList.remove('drag');stamp()});
car.addEventListener('click',function(e){if(moved>5){e.preventDefault();e.stopPropagation();moved=0}},true);
if('IntersectionObserver' in window)new IntersectionObserver(function(en){vis=en[0].isIntersecting},{threshold:0}).observe(car);
function loop(t){
 var dt=Math.min(.05,(t-t0)/1000||0);t0=t;
 if(!reduce&&vis&&!hover&&!focus&&!touching&&!down&&!document.hidden&&performance.now()-lastUser>1500){
  var h=half();
  if(h>car.clientWidth){pos+=SPEED*dt;if(pos>=h)pos-=h;car.scrollLeft=pos;last=car.scrollLeft}
 }
 requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
