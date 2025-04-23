import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  ClipboardList,
  Pizza,
  User,
  Settings,
  PlusCircle,
  LogOut,
  Utensils,
  ChevronDown
} from 'lucide-react';
import { axiosInstance } from '../../config/axisoInstance';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function RestaurantOwnerPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => isMobile && setIsOpen(false);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/resturent/logout", {}, { withCredentials: true });
      if(response.data.success){
        navigate("/owner/login");
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <>
      {/* Mobile Toggle - Modern Design */}
      <button
        className="lg:hidden p-4 text-white bg-amber-600 fixed top-4 left-4 z-50 rounded-lg shadow-lg hover:bg-amber-700 transition-colors duration-200"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Enhanced Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 text-black z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo/Brand Section */}
          <div className="mb-8 flex items-center justify-start">
            <div className="p-3 bg-amber-100 rounded-lg mr-3">
              <Utensils size={24} className="text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-amber-600">My</span> Restaurant
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <ul className="space-y-2">
              <NavItem 
                to="/restaurants/dashboard" 
                icon={<LayoutDashboard size={20} />} 
                label="Dashboard" 
                isActive={location.pathname === '/restaurants/dashboard'}
                badge={null}
              />
              
              <li>
                <button
                  onClick={() => toggleSection('menu')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition duration-200 ${
                    location.pathname.includes('/restaurants/my-menu') || location.pathname.includes('/restaurants/add-dish')
                      ? 'bg-amber-50 text-amber-700'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <MenuBookIcon size={20} className="mr-3 text-current" />
                    <span>Menu Management</span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-200 ${
                      expandedSection === 'menu' ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedSection === 'menu' && (
                  <div className="ml-8 mt-1 space-y-1">
                    <NavItem 
                      to="/restaurants/my-menu" 
                      icon={null}
                      label="My Menu" 
                      isActive={location.pathname.includes('/restaurants/my-menu')}
                      subItem
                    />
                     <NavItem 
                to="/restaurants/orders" 
                icon={<ClipboardList size={20} />} 
                label="Orders" 
                isActive={location.pathname.includes('/restaurants/orders')}
              /> 
                    <NavItem 
                      to="/restaurants/add-dish" 
                      icon={null}
                      label="Add New Dish" 
                      isActive={location.pathname.includes('/restaurants/add-dish')}
                      subItem
                    />
                  </div>
                )}
              </li>

              <NavItem 
                to="/owner/customers" 
                icon={<User size={20} />} 
                label="Customers" 
                isActive={location.pathname.includes('/owner/customers')}
                badge="New"
              />
              
              <NavItem 
                to="/owner/settings" 
                icon={<Settings size={20} />} 
                label="Settings" 
                isActive={location.pathname.includes('/owner/settings')}
              />
            </ul>
          </nav>

          {/* User & Logout Section */}
          <div className="mt-auto space-y-4">
            <div className="p-3 bg-gray-100 rounded-lg flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold mr-3">
                RO
              </div>
              <div>
                <p className="font-medium text-gray-800">Restaurant Owner</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition duration-200 group"
            >
              <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 mr-3 transition-colors">
                <LogOut size={18} className="text-red-500" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const NavItem = ({ to, icon, label, isActive, subItem = false, badge = null }) => (
  <li>
    <Link
      to={to}
      className={`flex items-center p-3 rounded-lg transition duration-200 ease-in-out ${
        isActive
          ? 'bg-amber-100 text-amber-700 font-medium'
          : 'hover:bg-gray-200 text-gray-700'
      } ${subItem ? 'pl-8 text-sm' : ''}`}
    >
      {icon && (
        <span className={`${isActive ? 'text-amber-600' : 'text-gray-500'} ${subItem ? 'mr-0' : 'mr-3'}`}>
          {icon}
        </span>
      )}
      <span>{label}</span>
      {badge && (
        <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  </li>
);