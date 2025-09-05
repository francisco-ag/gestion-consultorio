import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PatientModal = ({ patient, isOpen, onClose, onEdit, onScheduleAppointment }) => {
  const [activeTab, setActiveTab] = useState('general');

  if (!isOpen || !patient) return null;

  const tabs = [
    { id: 'general', label: 'Información General', icon: 'User' },
    // { id: 'medical', label: 'Historial Médico', icon: 'Heart' },
    { id: 'appointments', label: 'Citas', icon: 'Calendar' },
    // { id: 'documents', label: 'Documentos', icon: 'FileText' }
  ];

  const medicalHistory = [
    {
      date: '2024-08-15',
      diagnosis: 'Hipertensión arterial',
      doctor: 'Dr. García',
      treatment: 'Medicación antihipertensiva',
      status: 'En tratamiento'
    },
    {
      date: '2024-07-20',
      diagnosis: 'Diabetes tipo 2',
      doctor: 'Dr. Martínez',
      treatment: 'Control dietético y metformina',
      status: 'Controlada'
    },
    {
      date: '2024-06-10',
      diagnosis: 'Revisión general',
      doctor: 'Dr. García',
      treatment: 'Ninguno',
      status: 'Normal'
    }
  ];

  const upcomingAppointments = [
    {
      date: '2024-09-05',
      time: '10:00',
      type: 'Consulta de seguimiento',
      doctor: 'Dr. García',
      status: 'Confirmada'
    },
    {
      date: '2024-09-20',
      time: '15:30',
      type: 'Análisis de laboratorio',
      doctor: 'Dr. Martínez',
      status: 'Pendiente'
    }
  ];

  const documents = [
    {
      name: 'Análisis de sangre - Agosto 2024',
      type: 'Laboratorio',
      date: '2024-08-15',
      size: '2.4 MB'
    },
    {
      name: 'Radiografía de tórax',
      type: 'Imagen',
      date: '2024-07-20',
      size: '5.1 MB'
    },
    {
      name: 'Electrocardiograma',
      type: 'Estudio',
      date: '2024-06-10',
      size: '1.2 MB'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'En tratamiento': { color: 'bg-warning/10 text-warning', icon: 'Clock' },
      'Controlada': { color: 'bg-success/10 text-success', icon: 'CheckCircle' },
      'Normal': { color: 'bg-muted text-text-secondary', icon: 'Check' },
      'Confirmada': { color: 'bg-success/10 text-success', icon: 'CheckCircle' },
      'Pendiente': { color: 'bg-warning/10 text-warning', icon: 'Clock' }
    };

    const config = statusConfig?.[status] || statusConfig?.['Normal'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" />
        {status}
      </span>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Información Personal</label>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Nombre:</span> {patient?.name}</p>
                    <p><span className="font-medium">Edad:</span> {patient?.age} años</p>
                    <p><span className="font-medium">Género:</span> {patient?.gender}</p>
                    <p><span className="font-medium">Fecha de nacimiento:</span> {patient?.birthDate}</p>
                    <p><span className="font-medium">Tipo de sangre:</span> {patient?.bloodType}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Contacto</label>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Teléfono:</span> {patient?.phone}</p>
                    <p><span className="font-medium">Email:</span> {patient?.email}</p>
                    <p><span className="font-medium">Dirección:</span> {patient?.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary">Contacto de Emergencia</label>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Nombre:</span> {patient?.emergencyContact?.name}</p>
                    <p><span className="font-medium">Relación:</span> {patient?.emergencyContact?.relationship}</p>
                    <p><span className="font-medium">Teléfono:</span> {patient?.emergencyContact?.phone}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-text-secondary">Seguro Médico</label>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Compañía:</span> {patient?.insurance?.company}</p>
                    <p><span className="font-medium">Número de póliza:</span> {patient?.insurance?.policyNumber}</p>
                    <p><span className="font-medium">Estado:</span> {getStatusBadge(patient?.insurance?.status)}</p>
                  </div>
                </div>
              </div>
            </div>
            {patient?.allergies && patient?.allergies?.length > 0 && (
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center mb-2">
                  <Icon name="AlertTriangle" size={20} className="text-warning mr-2" />
                  <h4 className="font-medium text-warning">Alergias Conocidas</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {patient?.allergies?.map((allergy, index) => (
                    <span key={index} className="px-2 py-1 bg-warning/20 text-warning rounded text-sm">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        
      case 'medical':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Historial Médico</h4>
            {medicalHistory?.map((record, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-text-primary">{record?.diagnosis}</h5>
                    <p className="text-sm text-text-secondary">Dr. {record?.doctor} • {formatDate(record?.date)}</p>
                  </div>
                  {getStatusBadge(record?.status)}
                </div>
                <p className="text-sm text-text-secondary mt-2">
                  <span className="font-medium">Tratamiento:</span> {record?.treatment}
                </p>
              </div>
            ))}
          </div>
        );
        
      case 'appointments':
        return (
          <div className="space-y-4">
            {/* <h4 className="font-medium text-text-primary">Citas</h4> */}
            {upcomingAppointments?.map((appointment, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-text-primary">{appointment?.type}</h5>
                    <p className="text-sm text-text-secondary">
                      {formatDate(appointment?.date)} a las {appointment?.time}
                    </p>
                    <p className="text-sm text-text-secondary">Dr. {appointment?.doctor}</p>
                  </div>
                  {getStatusBadge(appointment?.status)}
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'documents':
        return (
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">Documentos Médicos</h4>
            {documents?.map((doc, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-text-primary">{doc?.name}</h5>
                      <p className="text-sm text-text-secondary">
                        {doc?.type} • {formatDate(doc?.date)} • {doc?.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card rounded-lg shadow-medical-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={patient?.photo}
              alt={`Foto de ${patient?.name}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-border"
            />
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{patient?.name}</h2>
              <p className="text-text-secondary">ID: {patient?.id} • {patient?.age} años</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => onEdit(patient)}
              iconName="Edit"
              iconPosition="left"
            >
              Editar
            </Button>
            <Button
              variant="default"
              onClick={() => onScheduleAppointment(patient)}
              iconName="Calendar"
              iconPosition="left"
            >
              Programar Cita
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-medical ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PatientModal;