import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Cumple con normativas de privacidad médica'
    },
    {
      icon: 'Lock',
      title: 'Cifrado SSL',
      description: 'Conexión segura de extremo a extremo'
    },
    {
      icon: 'Eye',
      title: 'Auditoría Completa',
      description: 'Registro de todos los accesos al sistema'
    },
    {
      icon: 'Clock',
      title: 'Sesión Segura',
      description: 'Cierre automático por inactividad'
    }
  ];

  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-text-primary mb-4 text-center">
        Seguridad y Cumplimiento
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-lg"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <h4 className="text-xs font-medium text-text-primary mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-text-secondary leading-tight">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Compliance Badges */}
      <div className="flex justify-center space-x-4 mt-6">
        <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-full">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-xs font-medium text-success">ISO 27001</span>
        </div>
        
        <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-full">
          <Icon name="Shield" size={16} className="text-primary" />
          <span className="text-xs font-medium text-primary">GDPR</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;