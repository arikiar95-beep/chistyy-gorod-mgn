const menu=document.querySelector('.menu');const nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');nav.classList.toggle('open',open);menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');menu.textContent='☰'}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open'))menu.click()});

// Respect motion preferences, and keep all content readable without JavaScript.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const ticker=document.querySelector('.ticker');
if(ticker){const track=document.createElement('div');track.className='ticker-track';while(ticker.firstChild)track.append(ticker.firstChild);ticker.append(track,track.cloneNode(true));}
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}},{threshold:.12});
 document.querySelectorAll('.section-head,.service,.service-note,.steps article,.faq>div,.contacts>div,.map-art').forEach((el,index)=>{el.classList.add('reveal');if(el.matches('.service,.steps article'))el.style.setProperty('--reveal-delay',`${Array.from(el.parentElement.children).indexOf(el)*110}ms`);observer.observe(el);});
 document.documentElement.classList.add('motion-ready');
 // Keyboard focus reveals its container immediately, including offscreen anchor navigation.
 document.addEventListener('focusin',event=>{const el=event.target.closest('.reveal');if(el)el.classList.add('in-view');});
 reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)document.documentElement.classList.remove('motion-ready')});
}
const sections=Array.from(document.querySelectorAll('main section[id]'));
let scrollQueued=false;
function paintScroll(){const height=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform=`scaleX(${height>0?Math.min(1,Math.max(0,window.scrollY/height)):0})`;document.querySelector('header').classList.toggle('scrolled',window.scrollY>20);let active='';for(const section of sections)if(section.getBoundingClientRect().top<180)active=section.id;nav.querySelectorAll('a').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${active}`));scrollQueued=false;}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(paintScroll)}},{passive:true});window.addEventListener('resize',paintScroll);paintScroll();

const motionToggle=document.createElement('button');motionToggle.className='motion-toggle';motionToggle.type='button';document.body.append(motionToggle);
let motionEnabled=true;
try{const saved=sessionStorage.getItem('cg-motion');if(saved!==null)motionEnabled=saved==='on'}catch{}
function setMotion(enabled){motionEnabled=enabled;document.documentElement.classList.toggle('motion-off',!enabled);document.documentElement.classList.toggle('motion-on',enabled);document.documentElement.classList.toggle('motion-ready',enabled);motionToggle.setAttribute('aria-pressed',String(enabled));motionToggle.textContent=enabled?'Анимация: вкл ✳':'Включить анимацию ✳';}
setMotion(motionEnabled);motionToggle.addEventListener('click',()=>{setMotion(!motionEnabled);try{sessionStorage.setItem('cg-motion',motionEnabled?'on':'off')}catch{}});

