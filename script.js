const envelope=document.getElementById('openEnvelope');
const letter=document.getElementById('letter');
const music=document.getElementById('music');
const musicToggle=document.getElementById('musicToggle');

envelope.addEventListener('click',()=>{
  envelope.classList.add('open');
  setTimeout(()=>{
    letter.classList.remove('hidden');
    letter.scrollIntoView({behavior:'smooth',block:'start'});
    revealVisible();
  },650);
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -8% 0px'});

function revealVisible(){
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
revealVisible();

musicToggle.addEventListener('click',async()=>{
  if(music.paused){
    try{
      await music.play();
      musicToggle.setAttribute('aria-pressed','true');
      musicToggle.querySelector('.music-text').textContent='Pause';
    }catch(e){
      musicToggle.querySelector('.music-text').textContent='Add music.mp3';
    }
  }else{
    music.pause();
    musicToggle.setAttribute('aria-pressed','false');
    musicToggle.querySelector('.music-text').textContent='Music';
  }
});
