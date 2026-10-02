const SERVER_IP='skyop.fun';
const DISPLAY_CAPACITY=2026;
function copyIP(){
  const done=()=>{const m=document.getElementById('copymsg'),t=document.getElementById('toast');if(m){m.textContent='✓ Đã sao chép: '+SERVER_IP;setTimeout(()=>m.textContent='',2400)}if(t){t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}};
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(SERVER_IP).then(done).catch(()=>fallbackCopy(done))}else fallbackCopy(done);
}
function fallbackCopy(done){const x=document.createElement('textarea');x.value=SERVER_IP;x.style.position='fixed';x.style.opacity='0';document.body.appendChild(x);x.select();document.execCommand('copy');x.remove();done()}
function setStatus(online,players,max){
  document.querySelectorAll('.status-dot').forEach(d=>d.classList.toggle('offline',!online));
  const label=online?'SERVER ĐANG ONLINE':'SERVER ĐANG OFFLINE';
  ['serverState','serverState2'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=label});
  const count=online&&Number.isFinite(players)?`${players}/${DISPLAY_CAPACITY} NGƯỜI CHƠI`:'JAVA EDITION';
  const a=document.getElementById('playerCount'),b=document.getElementById('playerCount2');if(a)a.textContent=count;if(b)b.textContent=online&&Number.isFinite(players)?`${players}/${DISPLAY_CAPACITY} online`:'';
  const h=document.getElementById('heroOnline');if(h)h.textContent=online&&Number.isFinite(players)?`${players} / ${DISPLAY_CAPACITY} ONLINE`:'OFFLINE';
}
async function checkServer(){try{const r=await fetch('https://api.mcstatus.io/v2/status/java/'+encodeURIComponent(SERVER_IP),{cache:'no-store'});if(!r.ok)throw 0;const d=await r.json();setStatus(!!d.online,d.players?.online,d.players?.max)}catch(e){const a=document.getElementById('serverState'),b=document.getElementById('serverState2');if(a)a.textContent='SKYOP JAVA SERVER';if(b)b.textContent='SKYOP JAVA SERVER'}}
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
addEventListener('scroll',()=>document.getElementById('nav')?.classList.toggle('scrolled',scrollY>30),{passive:true});
checkServer();setInterval(checkServer,60000);
