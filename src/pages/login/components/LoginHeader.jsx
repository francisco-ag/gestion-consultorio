import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-medical">
          <Icon name="Heart" size={32} color="white" />
        </div>
      </div>
      {/* Title and Subtitle */}
      <h1 className="text-2xl font-bold text-text-primary mb-2">
        MediConsult Manager
      </h1>
      <p className="text-text-secondary mb-6">
        Sistema de Gestión para Consultas Médicas
      </p>
      {/* Welcome Message */}
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-text-primary mb-2">
          Bienvenido de Nuevo
        </h2>
        <p className="text-sm text-text-secondary">
          Ingrese sus credenciales para acceder al sistema de gestión médica
        </p>
      </div>
      {/* Current Date and Time */}
      <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary mb-4">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span>{new Date()?.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span>{new Date()?.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;