// FE-only auth dùng localStorage (sau có thể thay bằng OAuth2/OpenID Connect).

const KEY = 'auth';

const demoUsers = [
  { id: 1, name: 'Owner Demo',  email: 'owner@demo.test',  role: 'owner',  password: 'owner'  },
  { id: 2, name: 'Admin Demo',  email: 'admin@demo.test',  role: 'admin',  password: 'admin'  },
  { id: 3, name: 'Alice',       email: 'alice@demo.test',  role: 'customer', password: '123456' },
];

export function login(email, password, requestedRole){
  const u = demoUsers.find(x => x.email===email && x.password===password && (!requestedRole || x.role===requestedRole));
  if(!u) throw new Error('Sai tài khoản hoặc mật khẩu');
  const sess = { userId:u.id, name:u.name, email:u.email, role:u.role, at:new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(sess));
  return sess;
}

export function getAuth(){
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
  catch(e){ return null; }
}

export function logout(){
  localStorage.removeItem(KEY);
  location.href = 'login.html';
}

export function redirectByRole(role){
  if(role==='owner') location.href='owner_dashboard.html';
  else if(role==='admin') location.href='admin_dashboard.html';
  else location.href='index.html'; // customer/others
}
