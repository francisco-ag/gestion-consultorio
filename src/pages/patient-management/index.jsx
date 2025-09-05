import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PatientSearchFilters from './components/PatientSearchFilters';
import PatientTable from './components/PatientTable';
import PatientStatsPanel from './components/PatientStatsPanel';
import PatientModal from './components/PatientModal';
import BulkActionsBar from './components/BulkActionsBar';

const PatientManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock patient data
  const mockPatients = [
    {
      id: 'P-2024-001',
      name: 'Ana María Rodríguez',
      age: 34,
      gender: 'Femenino',
      phone: '+34 612 345 678',
      email: 'ana.rodriguez@email.com',
      lastVisit: '2024-08-15',
      daysSinceLastVisit: 14,
      status: 'Activo',
      priority: 'Media',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      hasAlerts: true,
      bloodType: 'O+',
      birthDate: '15/03/1990',
      address: 'Calle Mayor 123, Madrid',
      allergies: ['Penicilina', 'Mariscos'],
      emergencyContact: {
        name: 'Carlos Rodríguez',
        relationship: 'Esposo',
        phone: '+34 612 345 679'
      },
      insurance: {
        company: 'Sanitas',
        policyNumber: 'SAN-2024-001',
        status: 'Activo'
      }
    },
    {
      id: 'P-2024-002',
      name: 'Miguel Santos García',
      age: 45,
      gender: 'Masculino',
      phone: '+34 623 456 789',
      email: 'miguel.santos@email.com',
      lastVisit: '2024-08-20',
      daysSinceLastVisit: 9,
      status: 'Activo',
      priority: 'Alta',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      hasAlerts: false,
      bloodType: 'A+',
      birthDate: '22/07/1979',
      address: 'Avenida de la Paz 45, Barcelona',
      allergies: ['Aspirina'],
      emergencyContact: {
        name: 'Elena Santos',
        relationship: 'Esposa',
        phone: '+34 623 456 790'
      },
      insurance: {
        company: 'Adeslas',
        policyNumber: 'ADE-2024-002',
        status: 'Activo'
      }
    },
    {
      id: 'P-2024-003',
      name: 'Carmen López Martín',
      age: 28,
      gender: 'Femenino',
      phone: '+34 634 567 890',
      email: 'carmen.lopez@email.com',
      lastVisit: '2024-07-30',
      daysSinceLastVisit: 30,
      status: 'Inactivo',
      priority: 'Baja',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      hasAlerts: false,
      bloodType: 'B+',
      birthDate: '10/11/1995',
      address: 'Plaza España 12, Valencia',
      allergies: [],
      emergencyContact: {
        name: 'José López',
        relationship: 'Padre',
        phone: '+34 634 567 891'
      },
      insurance: {
        company: 'Mapfre',
        policyNumber: 'MAP-2024-003',
        status: 'Vencido'
      }
    },
    {
      id: 'P-2024-004',
      name: 'José Martín Ruiz',
      age: 52,
      gender: 'Masculino',
      phone: '+34 645 678 901',
      email: 'jose.martin@email.com',
      lastVisit: '2024-08-25',
      daysSinceLastVisit: 4,
      status: 'Crítico',
      priority: 'Alta',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      hasAlerts: true,
      bloodType: 'AB+',
      birthDate: '05/02/1972',
      address: 'Calle Serrano 78, Madrid',
      allergies: ['Penicilina', 'Ibuprofeno', 'Frutos secos'],
      emergencyContact: {
        name: 'María Ruiz',
        relationship: 'Esposa',
        phone: '+34 645 678 902'
      },
      insurance: {
        company: 'DKV',
        policyNumber: 'DKV-2024-004',
        status: 'Activo'
      }
    },
    {
      id: 'P-2024-005',
      name: 'Elena Ruiz Fernández',
      age: 39,
      gender: 'Femenino',
      phone: '+34 656 789 012',
      email: 'elena.ruiz@email.com',
      lastVisit: '2024-08-18',
      daysSinceLastVisit: 11,
      status: 'Activo',
      priority: 'Media',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      hasAlerts: false,
      bloodType: 'O-',
      birthDate: '18/09/1984',
      address: 'Paseo de Gracia 156, Barcelona',
      allergies: ['Látex'],
      emergencyContact: {
        name: 'Pedro Fernández',
        relationship: 'Hermano',
        phone: '+34 656 789 013'
      },
      insurance: {
        company: 'Sanitas',
        policyNumber: 'SAN-2024-005',
        status: 'Activo'
      }
    }
  ];

  // Mock statistics
  const mockStats = {
    totalPatients: 1247,
    activePatients: 1089,
    newThisMonth: 156,
    pendingAppointments: 89
  };

  // Filter and search patients
  const filteredPatients = useMemo(() => {
    let filtered = mockPatients;

    // Apply search term
    if (searchTerm) {
      filtered = filtered?.filter(patient =>
        patient?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        patient?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        patient?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        patient?.phone?.includes(searchTerm)
      );
    }

    // Apply filters
    if (filters?.name) {
      filtered = filtered?.filter(patient =>
        patient?.name?.toLowerCase()?.includes(filters?.name?.toLowerCase())
      );
    }

    if (filters?.patientId) {
      filtered = filtered?.filter(patient =>
        patient?.id?.toLowerCase()?.includes(filters?.patientId?.toLowerCase())
      );
    }

    if (filters?.ageRange) {
      const [minAge, maxAge] = filters?.ageRange?.includes('+') 
        ? [parseInt(filters?.ageRange), 999]
        : filters?.ageRange?.split('-')?.map(age => parseInt(age));
      
      filtered = filtered?.filter(patient =>
        patient?.age >= minAge && patient?.age <= maxAge
      );
    }

    if (filters?.lastVisitDate) {
      filtered = filtered?.filter(patient =>
        patient?.lastVisit === filters?.lastVisitDate
      );
    }

    if (filters?.medicalCondition) {
      // This would filter by medical conditions in a real app
      filtered = filtered?.filter(patient =>
        patient?.allergies?.some(allergy =>
          allergy?.toLowerCase()?.includes(filters?.medicalCondition?.toLowerCase())
        )
      );
    }

    if (filters?.bloodType) {
      filtered = filtered?.filter(patient =>
        patient?.bloodType === filters?.bloodType
      );
    }

    if (filters?.gender) {
      filtered = filtered?.filter(patient =>
        patient?.gender === filters?.gender
      );
    }

    if (filters?.insuranceStatus) {
      filtered = filtered?.filter(patient =>
        patient?.insurance?.status === filters?.insuranceStatus
      );
    }

    return filtered;
  }, [searchTerm, filters]);

  // Sort patients
  const sortedPatients = useMemo(() => {
    const sorted = [...filteredPatients];
    
    sorted?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      // Handle date sorting
      if (sortConfig?.key === 'lastVisit') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Handle numeric sorting
      if (sortConfig?.key === 'age') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [filteredPatients, sortConfig]);

  // Paginate patients
  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * patientsPerPage;
    return sortedPatients?.slice(startIndex, startIndex + patientsPerPage);
  }, [sortedPatients, currentPage, patientsPerPage]);

  const totalPages = Math.ceil(sortedPatients?.length / patientsPerPage);

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePatientSelect = (patientId, isSelected) => {
    if (isSelected) {
      setSelectedPatients([...selectedPatients, patientId]);
    } else {
      setSelectedPatients(selectedPatients?.filter(id => id !== patientId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedPatients(paginatedPatients?.map(patient => patient?.id));
    } else {
      setSelectedPatients([]);
    }
  };

  const handleSort = (column) => {
    setSortConfig(prevConfig => ({
      key: column,
      direction: prevConfig?.key === column && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePatientView = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handlePatientEdit = (patient) => {
    navigate('/patient-profile', { state: { patient, mode: 'edit' } });
  };

  const handleScheduleAppointment = (patient) => {
    navigate('/appointment-scheduling', { state: { patient } });
  };

  const handleNewPatient = () => {
    navigate('/patient-profile', { state: { mode: 'create' } });
  };

  const handleBulkAction = async (action) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`Executing bulk action: ${action} on patients:`, selectedPatients);
    
    // Clear selection after action
    setSelectedPatients([]);
    setIsLoading(false);
  };

  const handleExport = () => {
    console.log('Exporting patient data...');
    // Export logic would go here
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6" />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Gestión de Pacientes
              </h1>
              <p className="text-text-secondary">
                Administra y consulta la información de todos los pacientes registrados
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={handleExport}
                iconName="Download"
                iconPosition="left"
              >
                Exportar
              </Button>
              <Button
                variant="default"
                onClick={handleNewPatient}
                iconName="UserPlus"
                iconPosition="left"
              >
                Nuevo Paciente
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-3">
              <PatientSearchFilters
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-7 space-y-6">
              {/* Search Bar */}
              <div className="bg-card border border-border rounded-lg shadow-medical p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex-1 max-w-md">
                    <Input
                      type="search"
                      placeholder="Buscar pacientes por nombre, ID, email o teléfono..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e?.target?.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>
                      {filteredPatients?.length} de {mockPatients?.length} pacientes
                    </span>
                    {selectedPatients?.length > 0 && (
                      <span className="text-primary font-medium">
                        {selectedPatients?.length} seleccionados
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Patient Table */}
              <PatientTable
                patients={paginatedPatients}
                selectedPatients={selectedPatients}
                onPatientSelect={handlePatientSelect}
                onSelectAll={handleSelectAll}
                onPatientView={handlePatientView}
                onPatientEdit={handlePatientEdit}
                onScheduleAppointment={handleScheduleAppointment}
                sortConfig={sortConfig}
                onSort={handleSort}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-card border border-border rounded-lg shadow-medical p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-text-secondary">
                      Mostrando {((currentPage - 1) * patientsPerPage) + 1} a{' '}
                      {Math.min(currentPage * patientsPerPage, sortedPatients?.length)} de{' '}
                      {sortedPatients?.length} resultados
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        iconName="ChevronLeft"
                        iconPosition="left"
                      >
                        Anterior
                      </Button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "ghost"}
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className="w-8 h-8"
                            >
                              {page}
                            </Button>
                          );
                        })}
                        {totalPages > 5 && (
                          <>
                            <span className="text-text-secondary">...</span>
                            <Button
                              variant={currentPage === totalPages ? "default" : "ghost"}
                              size="sm"
                              onClick={() => handlePageChange(totalPages)}
                              className="w-8 h-8"
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        iconName="ChevronRight"
                        iconPosition="right"
                      >
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Sidebar */}
            <div className="lg:col-span-2">
              <PatientStatsPanel stats={mockStats} />
            </div>
          </div>
        </div>
      </div>
      {/* Patient Modal */}
      <PatientModal
        patient={selectedPatient}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEdit={handlePatientEdit}
        onScheduleAppointment={handleScheduleAppointment}
      />
      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedPatients?.length}
        onClearSelection={() => setSelectedPatients([])}
        onBulkAction={handleBulkAction}
      />
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1300">
          <div className="bg-card rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-text-primary">Procesando...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;