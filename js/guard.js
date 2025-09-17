// js/guard.js
// Cách dùng: trên trang cần chặn, đặt trước khi import file này:
//   <script>window.REQUIRED_ROLES = ['owner'];</script>
//   <script type="module" src="js/guard.js"></script>

import { getAuth } from './auth.js';

(function(){
  const sess = getAuth();
  const need = (window.REQUIRED_ROLES || []).map(r => String(r).toLowerCase());
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  if(!sess){
    if(here !== 'login.html'){ location.replace('login.html'); }
    return;
  }
  if(need.length && !need.includes(String(sess.role).toLowerCase())){
    location.replace('forbidden.html');
    return;
  }
  // export ra window cho UI header nếu cần
  window.__AUTH__ = sess;
})();
