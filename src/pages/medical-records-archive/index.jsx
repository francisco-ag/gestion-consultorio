import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import SearchFilters from './components/SearchFilters';
import RecordsList from './components/RecordsList';
import RecordsGrid from './components/RecordsGrid';
import RecordViewer from './components/RecordViewer';
import Sidebar from './components/Sidebar';

const MedicalRecordsArchive = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showViewer, setShowViewer] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for medical records
  const [allRecords] = useState([
    {
      id: 'R-2024-001',
      patientId: 'P-2024-001',
      patientName: 'Ana María Rodríguez',
      patientAge: 34,
      patientGender: 'Femenino',
      patientPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      type: 'consultation',
      typeLabel: 'Consulta Médica',
      title: 'Consulta General - Control de Rutina',
      description: 'Consulta de control general con revisión de signos vitales y evaluación del estado de salud.',
      date: '2024-08-28T10:30:00',
      time: '10:30',
      lastModified: '2024-08-28T11:15:00',
      modifiedBy: 'Dr. María García',
      doctor: 'María García',
      diagnosis: 'Estado de salud general bueno',
      chiefComplaint: 'Control de rutina anual',
      historyOfPresentIllness: 'Paciente acude para control médico anual. No refiere síntomas actuales.',
      physicalExamination: 'Signos vitales normales. Examen físico sin alteraciones.',
      treatmentPlan: 'Continuar con hábitos saludables. Próximo control en 12 meses.',
      hasAttachments: true,
      attachmentCount: 2,
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200',
      fileSize: '2.3 MB',
      isUrgent: false,
      isConfidential: false,
      signedDate: '2024-08-28T11:15:00',
      auditTrail: [
        { action: 'Documento creado', user: 'Dr. María García', date: '2024-08-28T10:30:00' },
        { action: 'Documento firmado', user: 'Dr. María García', date: '2024-08-28T11:15:00' }
      ]
    },

    {
      id: 'R-2024-004',
      patientId: 'P-2024-004',
      patientName: 'José Antonio Ruiz',
      patientAge: 52,
      patientGender: 'Masculino',
      patientPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      type: 'prescriptions',
      typeLabel: 'Receta Médica',
      title: 'Prescripción para Hipertensión Arterial',
      description: 'Medicamentos para control de presión arterial elevada.',
      date: '2024-08-25T11:20:00',
      time: '11:20',
      lastModified: '2024-08-25T11:25:00',
      modifiedBy: 'Dr. María García',
      doctor: 'María García',
      diagnosis: 'Hipertensión arterial esencial',
      hasAttachments: false,
      attachmentCount: 0,
      fileSize: '0.8 MB',
      isUrgent: false,
      isConfidential: true,
      signedDate: '2024-08-25T11:25:00',
      medications: [
        {
          name: 'Enalapril 10mg',
          dosage: '10mg',
          frequency: '1 vez al día',
          duration: '30 días',
          quantity: '30 comprimidos',
          instructions: 'Tomar en ayunas, preferiblemente por la mañana'
        },
        {
          name: 'Amlodipino 5mg',
          dosage: '5mg',
          frequency: '1 vez al día',
          duration: '30 días',
          quantity: '30 comprimidos',
          instructions: 'Tomar por la noche, con o sin alimentos'
        }
      ],
      auditTrail: [
        { action: 'Receta creada', user: 'Dr. María García', date: '2024-08-25T11:20:00' },
        { action: 'Receta firmada', user: 'Dr. María García', date: '2024-08-25T11:25:00' }
      ]
    },
    {
      id: 'R-2024-005',
      patientId: 'P-2024-005',
      patientName: 'Elena Fernández Torres',
      patientAge: 67,
      patientGender: 'Femenino',
      patientPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      type: 'emergency',
      typeLabel: 'Consulta de Emergencia',
      title: 'Atención de Emergencia - Dolor Torácico',
      description: 'Evaluación urgente por dolor torácico agudo.',
      date: '2024-08-24T22:15:00',
      time: '22:15',
      lastModified: '2024-08-25T01:30:00',
      modifiedBy: 'Dr. Carlos Mendoza',
      doctor: 'Carlos Mendoza',
      diagnosis: 'Dolor torácico no cardíaco - Ansiedad',
      hasAttachments: true,
      attachmentCount: 1,
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200',
      fileSize: '3.2 MB',
      isUrgent: true,
      isConfidential: false,
      signedDate: '2024-08-25T01:30:00',
      auditTrail: [
        { action: 'Ingreso a emergencias', user: 'Enf. Patricia López', date: '2024-08-24T22:15:00' },
        { action: 'Evaluación médica', user: 'Dr. Carlos Mendoza', date: '2024-08-24T22:30:00' },
        { action: 'Alta médica', user: 'Dr. Carlos Mendoza', date: '2024-08-25T01:30:00' }
      ]
    },
    {
      id: 'R-2024-006',
      patientId: 'P-2024-006',
      patientName: 'Roberto Silva Moreno',
      patientAge: 41,
      patientGender: 'Masculino',
      patientPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      type: 'vaccination',
      typeLabel: 'Registro de Vacunación',
      title: 'Vacuna Antigripal 2024',
      description: 'Administración de vacuna contra la influenza estacional.',
      date: '2024-08-23T09:00:00',
      time: '09:00',
      lastModified: '2024-08-23T09:15:00',
      modifiedBy: 'Enf. Carmen Jiménez',
      doctor: 'María García',
      diagnosis: 'Vacunación preventiva completada',
      hasAttachments: false,
      attachmentCount: 0,
      fileSize: '0.5 MB',
      isUrgent: false,
      isConfidential: false,
      signedDate: '2024-08-23T09:15:00',
      auditTrail: [
        { action: 'Vacuna administrada', user: 'Enf. Carmen Jiménez', date: '2024-08-23T09:00:00' },
        { action: 'Registro completado', user: 'Enf. Carmen Jiménez', date: '2024-08-23T09:15:00' }
      ]
    }
  ]);

  useEffect(() => {
    setFilteredRecords(allRecords);
  }, [allRecords]);

  const handleSearch = (filters) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = [...allRecords];

      // Apply search term filter
      if (filters?.searchTerm) {
        const searchLower = filters?.searchTerm?.toLowerCase();
        filtered = filtered?.filter(record =>
          record?.patientName?.toLowerCase()?.includes(searchLower) ||
          record?.title?.toLowerCase()?.includes(searchLower) ||
          record?.description?.toLowerCase()?.includes(searchLower) ||
          record?.diagnosis?.toLowerCase()?.includes(searchLower) ||
          record?.patientId?.toLowerCase()?.includes(searchLower)
        );
      }

      // Apply date range filter
      if (filters?.dateFrom) {
        filtered = filtered?.filter(record => 
          new Date(record.date) >= new Date(filters.dateFrom)
        );
      }

      if (filters?.dateTo) {
        filtered = filtered?.filter(record => 
          new Date(record.date) <= new Date(filters.dateTo)
        );
      }

      // Apply record type filter
      if (filters?.recordType) {
        filtered = filtered?.filter(record => record?.type === filters?.recordType);
      }

      // Apply gender filter
      if (filters?.gender) {
        filtered = filtered?.filter(record => 
          record?.patientGender?.toLowerCase() === (filters?.gender === 'male' ? 'masculino' : 
                                                  filters?.gender === 'female' ? 'femenino' : 'otro')
        );
      }

      // Apply age filter (simple range check)
      if (filters?.patientAge) {
        const ageRange = filters?.patientAge?.split('-');
        if (ageRange?.length === 2) {
          const minAge = parseInt(ageRange?.[0]);
          const maxAge = parseInt(ageRange?.[1]);
          filtered = filtered?.filter(record => 
            record?.patientAge >= minAge && record?.patientAge <= maxAge
          );
        }
      }

      setFilteredRecords(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleResetFilters = (resetFilters) => {
    setFilteredRecords(allRecords);
  };

  const handleRecordSelect = (record) => {
    setSelectedRecord(record);
    setShowViewer(true);
  };

  const handleCloseViewer = () => {
    setShowViewer(false);
    setSelectedRecord(null);
  };

  const handleBulkAction = (action, recordIds) => {
    console.log(`Bulk action: ${action} on records:`, recordIds);
    // Implement bulk actions here
  };

  const handleQuickFilter = (type, value) => {
    console.log(`Quick filter: ${type} = ${value}`);
    // Implement quick filters here
    
    let filtered = [...allRecords];
    
    switch (type) {
      case 'today':
        const today = new Date()?.toISOString()?.split('T')?.[0];
        filtered = filtered?.filter(record => 
          record?.date?.split('T')?.[0] === today
        );
        break;
      case 'this_week':
        const weekAgo = new Date();
        weekAgo?.setDate(weekAgo?.getDate() - 7);
        filtered = filtered?.filter(record => 
          new Date(record.date) >= weekAgo
        );
        break;
      case 'urgent':
        filtered = filtered?.filter(record => record?.isUrgent);
        break;
      case 'type':
        filtered = filtered?.filter(record => record?.type === value);
        break;
      default:
        break;
    }
    
    setFilteredRecords(filtered);
  };

  const breadcrumbItems = [
    { name: 'Inicio', path: '/patient-management', isHome: true },
    { name: 'Archivo de Registros Médicos', path: '/medical-records-archive', isLast: true }
  ];

  return (
    <>
      <Helmet>
        <title>Archivo de Registros Médicos - MediConsult Manager</title>
        <meta name="description" content="Sistema integral de archivo y gestión de registros médicos para consultas, laboratorios, imágenes y prescripciones." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
            {/* Page Header */}
            <div className="mb-6">
              <Breadcrumb customItems={breadcrumbItems} className="mb-4" />
              
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">
                    Archivo de Registros Médicos
                  </h1>
                  <p className="text-text-secondary mt-1">
                    Gestiona y consulta el historial completo de registros médicos
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-border rounded-md">
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      iconName="List"
                    />
                    {/* <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      iconName="Grid3X3"
                    /> */}
                  </div>
                  
                  {/* <Button
                    variant="outline"
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Subir Documento
                  </Button> */}
                  
                  <Button
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Nuevo Registro
                  </Button>
                </div>
              </div>
            </div>

            {/* Search Filters */}
            <SearchFilters
              onSearch={handleSearch}
              onReset={handleResetFilters}
              className="mb-6"
            />

            {/* Main Content */}
            <div className="flex gap-6">
              {/* Records Display */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-text-secondary">
                      {isLoading ? 'Buscando...' : `${filteredRecords?.length} registro(s) encontrado(s)`}
                    </p>
                    {filteredRecords?.length !== allRecords?.length && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFilteredRecords(allRecords)}
                        iconName="X"
                        iconPosition="left"
                      >
                        Limpiar Filtros
                      </Button>
                    )}
                  </div>
                </div>

                {/* Records List/Grid */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="text-text-secondary">Cargando registros...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {viewMode === 'list' ? (
                      <RecordsList
                        records={filteredRecords}
                        onRecordSelect={handleRecordSelect}
                        onBulkAction={handleBulkAction}
                      />
                    ) : (
                      <RecordsGrid
                        records={filteredRecords}
                        onRecordSelect={handleRecordSelect}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Sidebar */}
              {/* <Sidebar onQuickFilter={handleQuickFilter} /> */}
            </div>
          </div>
        </main>

        {/* Record Viewer Modal */}
        {showViewer && selectedRecord && (
          <RecordViewer
            record={selectedRecord}
            onClose={handleCloseViewer}
          />
        )}
      </div>
    </>
  );
};

export default MedicalRecordsArchive;