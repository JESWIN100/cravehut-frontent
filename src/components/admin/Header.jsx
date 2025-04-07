import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  Utensils,
  Settings,
  Star,
  LogOut,
  Users,
  Pizza,
  ClipboardList
} from 'lucide-react';

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar when clicking outside (for mobile)
  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        className="lg:hidden p-4 text-black bg-white fixed top-0 left-0 z-50 shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r text-black z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="mb-8 mt-4 flex items-center justify-center">
            <Utensils size={28} className="text-amber-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Restaurant Panel</h1>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-1">
              <NavItem 
                to="/admin" 
                icon={<LayoutDashboard size={20} />} 
                label="Dashboard" 
                isActive={location.pathname === '/admin'}
              />
              <NavItem 
                to="/admin/restaurants" 
                icon={<Users size={20} />} 
                label="Restaurants" 
                isActive={location.pathname.includes('/admin/restaurants')}
              />
              <NavItem 
                to="/admin/foods" 
                icon={<Pizza size={20} />} 
                label="Food Menu" 
                isActive={location.pathname.includes('/admin/foods')}
              />
              <NavItem 
                to="/admin/orders" 
                icon={<ClipboardList size={20} />} 
                label="Orders" 
                isActive={location.pathname.includes('/admin/orders')}
              />
              <NavItem 
                to="/admin/reviews" 
                icon={<Star size={20} />} 
                label="Reviews" 
                isActive={location.pathname.includes('/admin/reviews')}
              />
              <NavItem 
                to="/admin/settings" 
                icon={<Settings size={20} />} 
                label="Settings" 
                isActive={location.pathname.includes('/admin/settings')}
              />
            </ul>
          </nav>
          
          <div className="mt-auto mb-4">
            <NavItem 
              to="/logout" 
              icon={<LogOut size={20} />} 
              label="Logout" 
              isActive={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const NavItem = ({ to, icon, label, isActive }) => (
  <li>
    <Link
      to={to}
      className={`flex items-center p-3 rounded transition duration-200 ease-in-out ${
        isActive 
          ? 'bg-amber-100 text-amber-700 font-medium' 
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      <span className={isActive ? 'text-amber-600' : 'text-gray-500'}>
        {icon}
      </span>
      <span className="ml-3">{label}</span>
    </Link>
  </li>
);