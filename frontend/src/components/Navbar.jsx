import React, { useState, useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Your Trips', route: '/trips' },
  { label: 'Payment', route: '/payment' },
  { label: 'Settings', route: '/settings' },
];

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  
  return (
    <nav className="flex items-center bg-white text-gray-900 px-8 py-4 shadow-md border-b border-gray-200 relative z-10">
      <button
        onClick={onMenuClick}
        className="flex flex-col justify-center h-7 w-7 rounded-md transition bg-transparent hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Open menu"
      >
        <span className="block w-5">
          <div className="h-0.5 bg-black my-0.5 rounded transition-all"></div>
          <div className="h-0.5 bg-black my-0.5 rounded transition-all"></div>
          <div className="h-0.5 bg-black my-0.5 rounded transition-all"></div>
        </span>
      </button>
      <div 
        className="pt-8 px-6 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate('/home')}
      >
        <h3 className="font-['Rock_Salt'] text-2xl text-black/80">Zygo</h3>
      </div>
    </nav>
  );
};

const MenuOverlay = ({ open, onClose, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get user name (first + last) or fallback
  const name = user?.fullName?.firstName || user?.fullname?.firstname
    ? `${user.fullName?.firstName || user.fullname?.firstname || ''} ${user.fullName?.lastName || user.fullname?.lastname || ''}`.trim()
    : 'User';
  const email = user?.email || 'user@email.com';
  const initial = name && name[0] ? name[0].toUpperCase() : 'U';

  return (
    <div
      className={`fixed top-0 left-0 w-[340px] h-screen bg-white text-gray-900 z-50 shadow-2xl border-r border-gray-200 flex flex-col transition-transform duration-300 ease-[cubic-bezier(.4,2,.6,1)] ${open ? 'translate-x-0' : '-translate-x-full'} bg-gradient-to-b from-gray-50 via-white to-white`}
    >
      <div className="p-8 border-b border-gray-200 flex items-center bg-gray-100/80">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-3xl text-white font-extrabold mr-6 shadow-lg border-4 border-white">
          {initial}
        </div>
        <div>
          <div className="font-semibold text-xl font-sans text-gray-900 leading-tight">{name}</div>
          <div className="text-gray-500 text-sm mt-1 font-medium">{email}</div>
        </div>
      </div>
      <div className="mt-7 flex-1 px-2">
        <div
          className={`border-l-4 py-3 px-7 font-semibold rounded-r-2xl mb-2 shadow cursor-pointer text-base transition ${location.pathname === '/messages' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-blue-500 border-blue-500 text-white hover:bg-blue-600'}`}
          onClick={() => { navigate('/messages'); onClose(); }}
        >
          Messages
        </div>
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`py-3 px-7 font-medium text-base rounded-r-2xl mb-2 cursor-pointer transition border-l-4 ${location.pathname === item.route ? 'bg-blue-50 border-blue-500 text-blue-700' : 'text-gray-900 border-transparent hover:bg-blue-50'}`}
            onClick={() => { navigate(item.route); onClose(); }}
          >
            {item.label}
          </div>
        ))}
        <div className="my-6 border-t border-gray-200"></div>
      </div>
      <div className="px-8 pb-8 pt-2">
        <div className="text-gray-400 text-xs font-medium tracking-wide">Legal</div>
        <div className="mt-1 text-gray-300 font-normal text-xs">v4.7.0(368)</div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 bg-gray-100 hover:bg-blue-100 border-none text-blue-500 text-3xl cursor-pointer rounded-full w-10 h-10 shadow-md flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Close menu"
      >
        &times;
      </button>
    </div>
  );
};

const NavbarWithMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(UserDataContext);
  return (
    <>
      <Navbar onMenuClick={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} user={user} />
    </>
  );
};

export default NavbarWithMenu; 