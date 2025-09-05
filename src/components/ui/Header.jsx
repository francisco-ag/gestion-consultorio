import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Pacientes', path: '/patient-management', icon: 'Users' },
    { name: 'Citas', path: '/appointment-scheduling', icon: 'Calendar' },
    { name: 'Consultas', path: '/consultation-session', icon: 'Stethoscope' },
    { name: 'Archivo', path: '/medical-records-archive', icon: 'Archive' },
  ];

  const isActivePath = (path) => {
    if (path === '/patient-management') {
      return location?.pathname === '/patient-management' || location?.pathname === '/patient-profile';
    }
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logging out...');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border shadow-medical z-1000">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/patient-management" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">
                Gestión Consultorio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-medical ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {/* <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
            </Button> */}

            {/* User Profile Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 px-3 py-2"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-text-primary">
                  Dr. Mario García
                </span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-medical-lg z-1100">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-text-primary">Dr. María García</p>
                      <p className="text-xs text-text-secondary">Médico General</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-medical"
                    >
                      <Icon name="User" size={16} className="mr-3" />
                      Mi Perfil
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-medical"
                    >
                      <Icon name="Settings" size={16} className="mr-3" />
                      Configuración
                    </Link>
                    <div className="border-t border-border">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error/10 transition-medical"
                      >
                        <Icon name="LogOut" size={16} className="mr-3" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-medical ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      {/* Overlay for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;