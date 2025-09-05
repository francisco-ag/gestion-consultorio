import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserAuthPanel = ({ 
  user = {
    name: 'Dr. María García',
    role: 'Médico General',
    avatar: '/assets/images/doctor-avatar.jpg',
    initials: 'MG',
    sessionTimeout: 30 // minutes
  },
  onLogout,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionTime, setSessionTime] = useState(user?.sessionTimeout * 60); // Convert to seconds
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => {
        if (prev <= 300 && !showTimeoutWarning) { // 5 minutes warning
          setShowTimeoutWarning(true);
        }
        if (prev <= 0) {
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showTimeoutWarning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log('Logging out...');
    }
    setIsOpen(false);
  };

  const extendSession = () => {
    setSessionTime(user?.sessionTimeout * 60);
    setShowTimeoutWarning(false);
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Session Timeout Warning */}
      {showTimeoutWarning && (
        <div className="fixed top-20 right-4 bg-warning text-warning-foreground p-4 rounded-lg shadow-medical-lg z-1200 max-w-sm">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={20} />
            <div className="flex-1">
              <h4 className="font-medium">Sesión por Expirar</h4>
              <p className="text-sm mt-1">
                Su sesión expirará en {formatTime(sessionTime)}
              </p>
              <div className="flex space-x-2 mt-3">
                <Button
                  size="sm"
                  onClick={extendSession}
                  className="bg-white text-warning hover:bg-gray-100"
                >
                  Extender
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-white hover:bg-warning-foreground/10"
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* User Panel Trigger */}
      <Button
        variant="ghost"
        onClick={togglePanel}
        className="flex items-center space-x-2 px-3 py-2 h-auto"
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm">
          {user?.initials}
        </div>
        
        {/* User Info - Hidden on mobile */}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-text-primary leading-tight">
            {user?.name}
          </p>
          <p className="text-xs text-text-secondary leading-tight">
            {user?.role}
          </p>
        </div>
        
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary" 
        />
      </Button>
      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-popover border border-border rounded-lg shadow-medical-lg z-1100">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                {user?.initials}
              </div>
              <div className="flex-1">
                <p className="font-medium text-text-primary">{user?.name}</p>
                <p className="text-sm text-text-secondary">{user?.role}</p>
                <p className="text-xs text-text-secondary mt-1">
                  ID: DOC-2024-001
                </p>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Sesión activa</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-mono ${
                  sessionTime <= 300 ? 'text-warning' : 'text-success'
                }`}>
                  {formatTime(sessionTime)}
                </span>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={extendSession}
                  className="text-xs"
                >
                  Extender
                </Button>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-medical">
              <Icon name="User" size={16} className="mr-3" />
              Mi Perfil
            </button>
            
            <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-medical">
              <Icon name="Settings" size={16} className="mr-3" />
              Configuración
            </button>
            
            <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-medical">
              <Icon name="HelpCircle" size={16} className="mr-3" />
              Ayuda y Soporte
            </button>
            
            <button className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-medical">
              <Icon name="Shield" size={16} className="mr-3" />
              Privacidad
            </button>
          </div>

          {/* Logout Section */}
          <div className="border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm text-error hover:bg-error/10 transition-medical"
            >
              <Icon name="LogOut" size={16} className="mr-3" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserAuthPanel;