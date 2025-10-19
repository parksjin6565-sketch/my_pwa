// 서비스워커 등록
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// 설치 배너 제어
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener('click', async ()=>{
  installBtn.hidden = true;
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  }
});

// 위치 권한 테스트 (보건소 찾기용)
document.getElementById('locBtn').addEventListener('click', ()=>{
  const out = document.getElementById('out');
  if(!navigator.geolocation){ out.textContent='이 기기에서 위치를 지원하지 않습니다.'; return; }
  navigator.geolocation.getCurrentPosition(
    pos=>{ out.textContent = `위도:${pos.coords.latitude}, 경도:${pos.coords.longitude}`; },
    err=>{ out.textContent = `위치 오류: ${err.message}`; },
    {enableHighAccuracy:true, timeout:8000, maximumAge:0}
  );
});
