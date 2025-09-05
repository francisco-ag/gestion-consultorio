import React, { useState } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const PatientContextHeader = ({ 
  patient = {
    id: 'P-2024-001',
    name: 'Ana María Rodríguez',
    age: 34,
    gender: 'Femenino',
    photo: '/assets/images/patient-avatar.jpg',
    allergies: ['Penicilina', 'Mariscos'],
    emergencyContact: {
      name: 'Carlos Rodríguez',
      phone: '+34 612 345 678',
      relationship: 'Esposo'
    },
    bloodType: 'O+',
    lastVisit: '2024-08-15'
  },
  onEdit,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(patient);
    }
  };

  return (
    <div className={`bg-card border-b border-border shadow-medical ${className}`}>
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        {/* Main Patient Info */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            {/* Patient Photo */}
            <div className="relative">
              <Image
                src={patient?.photo}
                alt={`Foto de ${patient?.name}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-border"
              />
              {patient?.allergies && patient?.allergies?.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={10} color="white" />
                </div>
              )}
            </div>

            {/* Patient Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold text-text-primary truncate">
                  {patient?.name}
                </h2>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-text-secondary">
                  ID: {patient?.id}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-text-secondary">
                  {patient?.age} años • {patient?.gender}
                </span>
                {patient?.bloodType && (
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-error/10 text-error">
                    <Icon name="Droplet" size={12} className="mr-1" />
                    {patient?.bloodType}
                  </span>
                )}
              </div>
            </div>

            {/* Critical Alerts - Mobile Hidden */}
            {patient?.allergies && patient?.allergies?.length > 0 && (
              <div className="hidden sm:flex items-center space-x-2">
                <div className="flex items-center px-3 py-1 bg-warning/10 text-warning rounded-md">
                  <Icon name="AlertTriangle" size={16} className="mr-2" />
                  <span className="text-sm font-medium">
                    Alergias: {patient?.allergies?.join(', ')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="hidden sm:flex"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
              <span className="ml-1">
                {isExpanded ? 'Menos' : 'Más info'}
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
            >
              <Icon name="Edit" size={16} />
              <span className="hidden sm:inline ml-1">Editar</span>
            </Button>
          </div>
        </div>

        {/* Expanded Information */}
        {isExpanded && (
          <div className="pb-4 border-t border-border pt-4 transition-medical">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Emergency Contact */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-primary flex items-center">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Contacto de Emergencia
                </h4>
                <div className="text-sm text-text-secondary">
                  <p className="font-medium">{patient?.emergencyContact?.name}</p>
                  <p>{patient?.emergencyContact?.phone}</p>
                  <p className="text-xs">{patient?.emergencyContact?.relationship}</p>
                </div>
              </div>

              {/* Medical Info */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-text-primary flex items-center">
                  <Icon name="Heart" size={16} className="mr-2" />
                  Información Médica
                </h4>
                <div className="text-sm text-text-secondary">
                  <p>Tipo de sangre: <span className="font-medium">{patient?.bloodType}</span></p>
                  <p>Última visita: <span className="font-medium">{patient?.lastVisit}</span></p>
                </div>
              </div>

              {/* Allergies */}
              {patient?.allergies && patient?.allergies?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-primary flex items-center">
                    <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
                    Alergias
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {patient?.allergies?.map((allergy, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-warning/10 text-warning"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Critical Alerts */}
        {patient?.allergies && patient?.allergies?.length > 0 && (
          <div className="sm:hidden pb-3">
            <div className="flex items-center px-3 py-2 bg-warning/10 text-warning rounded-md">
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              <span className="text-sm font-medium">
                Alergias: {patient?.allergies?.join(', ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientContextHeader;