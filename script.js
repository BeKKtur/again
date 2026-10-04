// ==========================================
// ❤️ НАСТРОЙКИ КЛИЕНТА — МЕНЯТЬ ЗДЕСЬ
// ==========================================
const loveConfig={
  recipientName:"Алина", // ❤️ ИМЯ ПОЛУЧАТЕЛЯ
  senderName:"Бектур", // ✍️ ИМЯ ОТПРАВИТЕЛЯ
  openingTitle:"Для тебя ❤️",
  openingMessage:"У меня есть кое-что, что я давно хотел тебе сказать...",
  heroTitle:"Ты — моя любимая история",
  heroMessage:"Я мог бы сказать тебе это обычным сообщением. Но для особенного человека хочется сделать что-то особенное.", // 📝 ОСНОВНОЙ ТЕКСТ
  mainPhoto:"./images/main.jpg",
  storyTitle:"Наша история",
  secretMessage:`Я не знаю, что ждёт нас впереди.
Но знаю одно — я очень рад, что встретил тебя.

Спасибо за твои улыбки, разговоры, поддержку и все наши маленькие моменты.

Я надеюсь, впереди их будет ещё очень много.

Люблю тебя ❤️`, // 💌 СЕКРЕТНОЕ ПОСЛАНИЕ
  finalMessage:"Я бы снова выбрал тебя.",
  music:"./audio/love-song.mp3", // 🎵 МУЗЫКА
  photos:["./images/photo1.jpg","./images/photo2.jpg","./images/photo3.jpg","./images/photo4.jpg"], // 📸 ФОТОГРАФИИ
  reasons:["За твою улыбку","За то, как ты умеешь делать обычный день особенным","За твой характер","За моменты рядом с тобой","За то, что рядом с тобой я могу быть собой","Просто за то, что ты — это ты"], // ❤️ ПРИЧИНЫ
  memories:[
    {date:"Тогда",title:"Наша первая встреча",text:"Тот самый день, после которого всё стало немного другим."},
    {date:"Потом",title:"Первый особенный момент",text:"Момент, который я до сих пор вспоминаю с улыбкой."},
    {date:"Сегодня",title:"Всё ещё мы",text:"И спустя всё это время я всё ещё рад, что именно ты появилась в моей жизни."}
  ]
};

const $=(s,root=document)=>root.querySelector(s);const $$=(s,root=document)=>[...root.querySelectorAll(s)];
// Убираем случайный текстовый узел до первого экрана, если он появился при сборке.
if($('#main').firstChild?.nodeType===Node.TEXT_NODE) $('#main').firstChild.textContent='';
function fill(selector,value){$$(selector).forEach(el=>el.textContent=value)}
fill('[data-opening-title]',loveConfig.openingTitle);fill('[data-opening-message]',loveConfig.openingMessage);fill('[data-recipient]',loveConfig.recipientName);fill('[data-hero-title]',loveConfig.heroTitle);fill('[data-hero-message]',loveConfig.heroMessage);fill('[data-story-title]',loveConfig.storyTitle);fill('[data-final-message]',loveConfig.finalMessage);fill('[data-sender]',loveConfig.senderName);$('[data-main-photo]').src=loveConfig.mainPhoto;document.title=`Для ${loveConfig.recipientName} ❤️`;
$('#timeline').innerHTML=loveConfig.memories.map(m=>`<article class="memory reveal"><small>${m.date}</small><h3>${m.title}</h3><p>${m.text}</p></article>`).join('');
$('#gallery').innerHTML=loveConfig.photos.map((src,i)=>`<button class="gallery-item reveal" aria-label="Открыть фотографию ${i+1}"><img src="${src}" alt="Любимый момент ${i+1}" loading="lazy"></button>`).join('');
$('#reasons').innerHTML=loveConfig.reasons.map((r,i)=>`<article class="reason reveal"><span>${String(i+1).padStart(2,'0')}</span><p>${r}</p></article>`).join('');
const audio=$('#music');audio.src=loveConfig.music;$('#musicBtn').addEventListener('click',async()=>{if(audio.paused){try{await audio.play();$('#musicBtn').classList.add('playing');$('#musicBtn').setAttribute('aria-label','Поставить музыку на паузу')}catch(e){$('#musicBtn').title='Добавьте файл audio/love-song.mp3'}}else{audio.pause();$('#musicBtn').classList.remove('playing')}});
$('#openBtn').addEventListener('click',()=>{const opening=$('#opening');opening.classList.add('is-opening');for(let i=0;i<16;i++){const s=document.createElement('span');s.className='spark';s.textContent=i%3?'✦':'♥';s.style.left=`${45+Math.random()*10}%`;s.style.top='48%';s.style.setProperty('--x',`${(Math.random()-.5)*300}px`);s.style.setProperty('--y',`${(Math.random()-.7)*260}px`);document.body.append(s);setTimeout(()=>s.remove(),1600)}setTimeout(()=>{opening.classList.add('opened');document.body.classList.remove('locked');document.body.classList.add('site-open');$('#main').setAttribute('aria-hidden','false');observe()},1250)});
let observer;function observe(){observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.14});$$('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${(i%3)*90}ms`;observer.observe(el)})}
$('#heartBtn').addEventListener('click',()=>{const btn=$('#heartBtn');btn.classList.remove('beating');void btn.offsetWidth;btn.classList.add('beating');for(let i=0;i<18;i++){const p=document.createElement('span');p.className='heart-particle';p.textContent=i%2?'♥':'✦';p.style.left=`${42+Math.random()*16}%`;p.style.top='68%';p.style.setProperty('--x',`${(Math.random()-.5)*260}px`);$('#heartParticles').append(p);setTimeout(()=>p.remove(),2300)}setTimeout(()=>$('#heartMessage').textContent='Каждый удар — о тебе ❤️',1200)});
$('#secretBtn').addEventListener('click',e=>{const box=$('#secretText');box.textContent=loveConfig.secretMessage;box.classList.add('visible');e.currentTarget.hidden=true});
$$('.gallery-item').forEach((b,i)=>b.addEventListener('click',()=>{$('#lightboxImg').src=loveConfig.photos[i];$('#lightbox').classList.add('open');document.body.classList.add('locked')}));function closeLightbox(){$('#lightbox').classList.remove('open');document.body.classList.remove('locked')}$('#closeLightbox').addEventListener('click',closeLightbox);$('#lightbox').addEventListener('click',e=>{if(e.target===e.currentTarget)closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
