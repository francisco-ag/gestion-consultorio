import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PatientContextHeader from '../../components/ui/PatientContextHeader';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import PatientSummaryPanel from './components/PatientSummaryPanel';
import ConsultationForm from './components/ConsultationForm';
import VitalSignsPanel from './components/VitalSignsPanel';
import PrescriptionPanel from './components/PrescriptionPanel';
import SessionTimer from './components/SessionTimer';

const ConsultationSession = () => {
  const navigate = useNavigate();
  const [currentPatient, setCurrentPatient] = useState({
    id: 'P-2024-001',
    name: 'Ana María Rodríguez',
    age: 34,
    gender: 'Femenino',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    allergies: ['Penicilina', 'Mariscos'],
    emergencyContact: {
      name: 'Carlos Rodríguez',
      phone: '+34 612 345 678',
      relationship: 'Esposo'
    },
    bloodType: 'O+',
    lastVisit: '2024-08-15',
    visitReason: 'Control rutinario diabetes tipo 2'
  });

  const [sessionData, setSessionData] = useState({
    sessionId: `CS-${Date.now()}`,
    startTime: null,
    isActive: false,
    consultationData: null,
    vitalSigns: null,
    prescriptions: []
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Auto-start session when component mounts
    setSessionData(prev => ({
      ...prev,
      startTime: new Date(),
      isActive: true
    }));
  }, []);

  const handleConsultationSave = (consultationData) => {
    setSessionData(prev => ({
      ...prev,
      consultationData
    }));
    console.log('Consultation saved:', consultationData);
  };

  const handleConsultationAutoSave = (consultationData) => {
    setSessionData(prev => ({
      ...prev,
      consultationData
    }));
    console.log('Auto-saved consultation data');
  };

  const handleVitalSignsUpdate = (vitalSigns) => {
    setSessionData(prev => ({
      ...prev,
      vitalSigns
    }));
    console.log('Vital signs updated:', vitalSigns);
  };

  const handlePrescriptionAdd = (prescription) => {
    setSessionData(prev => ({
      ...prev,
      prescriptions: [...prev?.prescriptions, prescription]
    }));
    console.log('Prescription added:', prescription);
  };

  const handleSessionEnd = (sessionInfo) => {
    setSessionData(prev => ({
      ...prev,
      isActive: false,
      endTime: new Date()
    }));
    console.log('Session ended:', sessionInfo);
    
    // Navigate to patient profile or management
    navigate('/patient-profile');
  };

  const handlePatientEdit = (patient) => {
    console.log('Edit patient:', patient);
    // Navigate to patient edit form
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const breadcrumbItems = [
    { name: 'Inicio', path: '/patient-management', isHome: true },
    { name: 'Gestión de Pacientes', path: '/patient-management' },
    { name: 'Sesión de Consulta', path: '/consultation-session', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      {/* Patient Context Header */}
      <PatientContextHeader 
        patient={currentPatient}
        onEdit={handlePatientEdit}
        className="mt-16"
      />
      {/* Main Content */}
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb and Actions */}
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb customItems={breadcrumbItems} />
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
            >
              <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={16} />
              <span className="ml-1 hidden sm:inline">
                {isFullscreen ? 'Salir' : 'Pantalla Completa'}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/patient-management')}
            >
              <Icon name="ArrowLeft" size={16} />
              <span className="ml-1 hidden sm:inline">Volver</span>
            </Button>
          </div>
        </div>

        {/* Session Status Bar */}
        {/* <div className="bg-card border border-border rounded-lg shadow-medical p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-text-primary">
                  Sesión Activa
                </span>
              </div>
              <div className="text-sm text-text-secondary">
                Paciente: {currentPatient?.name}
              </div>
              <div className="text-sm text-text-secondary">
                Motivo: {currentPatient?.visitReason}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-text-secondary">
                ID Sesión: {sessionData?.sessionId}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleSessionEnd({ patientName: currentPatient?.name })}
              >
                <Icon name="Square" size={16} />
                <span className="ml-1">Finalizar Sesión</span>
              </Button>
            </div>
          </div>
        </div> */}

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Patient Summary (4 columns) */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <PatientSummaryPanel patient={currentPatient} />
              
              {/* Session Timer */}
              <SessionTimer 
                onSessionEnd={handleSessionEnd}
                patientName={currentPatient?.name}
              />
            </div>
          </div>

          {/* Center Panel - Consultation Form (6 columns) */}
          <div className="lg:col-span-6">
            <ConsultationForm 
              onSave={handleConsultationSave}
              onAutoSave={handleConsultationAutoSave}
            />
          </div>

          {/* Right Panel - Vital Signs & Prescriptions (2 columns) */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* <VitalSignsPanel onVitalSignsUpdate={handleVitalSignsUpdate} /> */}
              <PrescriptionPanel onPrescriptionAdd={handlePrescriptionAdd} />
            </div>
          </div>
        </div>

        {/* Mobile Layout - Tabs for smaller screens */}
        <div className="lg:hidden mt-6">
          <div className="bg-card border border-border rounded-lg shadow-medical">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-4" aria-label="Tabs">
                <button className="border-b-2 border-primary text-primary py-3 px-1 text-sm font-medium">
                  Consulta
                </button>
                <button className="border-b-2 border-transparent text-text-secondary hover:text-text-primary py-3 px-1 text-sm font-medium">
                  Signos Vitales
                </button>
                <button className="border-b-2 border-transparent text-text-secondary hover:text-text-primary py-3 px-1 text-sm font-medium">
                  Receta
                </button>
              </nav>
            </div>
            <div className="p-4">
              {/* Tab content would be rendered here based on active tab */}
              <p className="text-sm text-text-secondary text-center py-8">
                Selecciona una pestaña para ver el contenido
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="fixed bottom-4 right-4 lg:hidden">
          <div className="flex flex-col space-y-2">
            <Button size="icon" className="rounded-full shadow-medical-lg">
              <Icon name="Save" size={20} />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full shadow-medical-lg">
              <Icon name="Mic" size={20} />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full shadow-medical-lg">
              <Icon name="Camera" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSession;