(()=>{'use strict';
const menu=document.getElementById('menuToggle');const mobile=document.getElementById('mobileNav');menu?.addEventListener('click',()=>{const show=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(show));menu.setAttribute('aria-label',show?'Закрыть меню':'Открыть меню');mobile.hidden=!show});mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню')}));
const form=document.getElementById('projectForm');if(!form)return;

/* Показываем реальные публикации Telegram по клику. Ссылка работает и без JavaScript. */
const videoDialog=document.getElementById('videoDialog'),videoFrame=document.getElementById('videoFrame'),videoLink=document.getElementById('videoLink'),videoTitle=document.getElementById('videoDialogTitle');let videoInvoker=null;
document.querySelectorAll('[data-video-post]').forEach(card=>card.addEventListener('click',event=>{
 if(!videoDialog||typeof videoDialog.showModal!=='function')return;
 event.preventDefault();videoInvoker=card;
 const post=card.dataset.videoPost;const href='https://t.me/mushkachev/'+post;
 videoTitle.textContent=card.querySelector('h3')?.textContent||'Работа Михаила';
 videoLink.href=href;videoFrame.src=href+'?embed=1';videoDialog.showModal();
}));
function closeVideoDialog(){if(videoDialog?.open)videoDialog.close()}
document.getElementById('closeVideo')?.addEventListener('click',closeVideoDialog);
videoDialog?.addEventListener('click',ev=>{if(ev.target===videoDialog)closeVideoDialog()});
videoDialog?.addEventListener('close',()=>{videoFrame.removeAttribute('src');videoInvoker?.focus();videoInvoker=null});
const steps=[...form.querySelectorAll('.form-step')];const back=document.getElementById('backStep'),next=document.getElementById('nextStep'),send=document.getElementById('sendBrief'),counter=document.getElementById('stepCount'),fill=document.getElementById('progressFill');let current=0;
function showStep(n){document.getElementById('briefReady')?.setAttribute('hidden','');current=Math.max(0,Math.min(steps.length-1,n));steps.forEach((el,i)=>el.classList.toggle('active',i===current));back.hidden=current===0;next.hidden=current===steps.length-1;send.hidden=current!==steps.length-1;counter.textContent=String(current+1).padStart(2,'0')+' / 04';fill.style.width=((current+1)/steps.length*100)+'%';}
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{const v=a.getAttribute('data-service');const input=[...form.querySelectorAll('input[name="kind"]')].find(x=>x.value===v);if(input)input.checked=true;showStep(0)}));
next.addEventListener('click',()=>showStep(current+1));back.addEventListener('click',()=>showStep(current-1));showStep(0);
const briefReady=document.getElementById('briefReady'),briefText=document.getElementById('briefText'),copyBrief=document.getElementById('copyBrief'),copyStatus=document.getElementById('copyStatus');
form.addEventListener('submit',(ev)=>{ev.preventDefault();const d=new FormData(form);const safe=v=>String(v||'Не указано').trim()||'Не указано';const msg=['Здравствуйте, Михаил! Хочу обсудить съёмку через сайт MSHK.FILM.','','Что снимаем: '+safe(d.get('kind')),'Подготовка: '+safe(d.get('help')),'Где: '+safe(d.get('city')),'Когда: '+safe(d.get('date')),'Длительность: '+safe(d.get('length')),'Результат: '+safe(d.get('result'))];if(safe(d.get('notes'))!=='Не указано')msg.push('Пожелания: '+safe(d.get('notes')));briefText.value=msg.join('\\n');briefReady.hidden=false;copyStatus.textContent='';briefReady.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});});
copyBrief?.addEventListener('click',async()=>{if(!briefText.value)return;try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(briefText.value);copyStatus.textContent='Текст скопирован. Откройте Telegram и вставьте его в переписку.';}catch{briefText.focus();briefText.select();copyStatus.textContent='Автоматическое копирование недоступно. Выделенный текст можно скопировать сочетанием Ctrl+C (на Mac — Cmd+C).';}});
})();
