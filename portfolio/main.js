(function(){
var root=document.documentElement;
document.getElementById("y").textContent=new Date().getFullYear();
document.getElementById("theme").addEventListener("click",function(){
  var dark=getComputedStyle(root).getPropertyValue("--bg").trim()==="#070b16";
  var next=dark?"light":"dark";root.dataset.theme=next;
  try{localStorage.setItem("theme",next)}catch(e){}
  if(window.__redraw)window.__redraw();
});
var menu=document.getElementById("menu"),links=document.getElementById("links");
menu.addEventListener("click",function(){var o=links.classList.toggle("open");menu.setAttribute("aria-expanded",o)});
links.addEventListener("click",function(e){if(e.target.tagName==="A"){links.classList.remove("open");menu.setAttribute("aria-expanded","false")}});
var bar=document.getElementById("progress");
addEventListener("scroll",function(){var h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"},{passive:true});
var els=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.1});els.forEach(function(el){io.observe(el)})}else{els.forEach(function(el){el.classList.add("in")})}
document.getElementById("mailform").addEventListener("submit",function(e){
  e.preventDefault();var f=e.target;
  var body="Hola Danny,\n\n"+f.m.value+"\n\n— "+f.n.value+" ("+f.e.value+")";
  location.href="mailto:sdannyandres@gmail.com?subject="+encodeURIComponent("Consulta desde tu portafolio")+"&body="+encodeURIComponent(body);
});
// Fondo de red de partículas (propio, ligero). Se pausa fuera de pantalla y con reduced-motion.
var c=document.getElementById("bg"),x=c.getContext("2d"),pts=[],W,H,raf,mx=-999,my=-999;
var still=matchMedia("(prefers-reduced-motion: reduce)").matches;
function col(){return getComputedStyle(root).getPropertyValue("--accent").trim()||"#5eead4"}
function size(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;var n=Math.min(70,Math.floor(W*H/18000));pts=[];for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3})}
function draw(){
  x.clearRect(0,0,W,H);var k=col();x.fillStyle=k;x.strokeStyle=k;
  for(var i=0;i<pts.length;i++){var p=pts[i];
    if(!still){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}
    x.globalAlpha=.8;x.beginPath();x.arc(p.x,p.y,1.6,0,6.3);x.fill();
    for(var j=i+1;j<pts.length;j++){var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;
      if(d<14000){x.globalAlpha=.25*(1-d/14000);x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}
    var mdx=p.x-mx,mdy=p.y-my,md=mdx*mdx+mdy*mdy;
    if(md<20000){x.globalAlpha=.5*(1-md/20000);x.beginPath();x.moveTo(p.x,p.y);x.lineTo(mx,my);x.stroke()}}
  if(!still)raf=requestAnimationFrame(draw)}
window.__redraw=function(){if(still)draw()};
c.parentNode.addEventListener("mousemove",function(e){var r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
c.parentNode.addEventListener("mouseleave",function(){mx=my=-999});
addEventListener("resize",function(){size();if(still)draw()});
size();draw();
if("IntersectionObserver"in window&&!still){new IntersectionObserver(function(es){cancelAnimationFrame(raf);if(es[0].isIntersecting)draw()}).observe(c)}
})();
