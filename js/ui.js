// js/ui.js
import { logout } from './auth.js';
export function renderHeader(){
  const root = document.getElementById('app-header');
  if(!root) return;
  const u = window.__AUTH__;
  root.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px">
      <div><strong>Spa Booking</strong> — Dashboard</div>
      <div style="display:flex;align-items:center;gap:8px">
        ${u ? `<span style="padding:6px 10px;border-radius:999px;border:1px solid #e5e7eb">${u.name} · ${u.role}</span>` : ''}
        ${u ? `<button onclick="__LOGOUT__()" style="padding:6px 10px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer">Đăng xuất</button>` : ''}
      </div>
    </div>
  `;
  window.__LOGOUT__ = logout;
}
