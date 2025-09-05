import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format, addDays, startOfWeek, endOfWeek, isSameDay, parseISO, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AppointmentForm from './components/AppointmentForm';
import CalendarView from './components/CalendarView';
import DailyAgenda from './components/DailyAgenda';
import AppointmentModal from './components/AppointmentModal';
import QuickFilters from './components/QuickFilters';

const AppointmentScheduling = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedPatient = location?.state?.patient;

  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState('week'); // 'week' or 'month'
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    // provider: '',
    appointmentType: '',
    status: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [draggedAppointment, setDraggedAppointment] = useState(null);

  // Mock providers data
  const providers = [
    { value: 'dr-garcia', label: 'Dr. María García' },
    { value: 'dr-rodriguez', label: 'Dr. Carlos Rodríguez' },
    { value: 'dr-lopez', label: 'Dr. Ana López' },
    { value: 'dr-martinez', label: 'Dr. José Martínez' }
  ];

  // Mock patients data
  const mockPatients = [
    {
      id: 'P-2024-001',
      name: 'Ana María Rodríguez',
      phone: '+34 612 345 678',
      email: 'ana.rodriguez@email.com'
    },
    {
      id: 'P-2024-002', 
      name: 'Miguel Santos García',
      phone: '+34 623 456 789',
      email: 'miguel.santos@email.com'
    },
    {
      id: 'P-2024-003',
      name: 'Carmen López Martín', 
      phone: '+34 634 567 890',
      email: 'carmen.lopez@email.com'
    }
  ];

  // Mock appointments data with Spanish content
  const mockAppointments = [
    {
      id: 'APT-2024-001',
      patientName: 'Ana María Rodríguez',
      patientId: 'P-2024-001',
      patientPhone: '+34 612 345 678',
      type: 'consulta',
      provider: 'dr-garcia',
      date: '2024-09-04',
      startTime: '09:00',
      endTime: '09:30',
      duration: 30,
      status: 'confirmada',
      reason: 'Revisión mensual',
      notes: 'Paciente con historial de hipertensión'
    },
    {
      id: 'APT-2024-002',
      patientName: 'Miguel Santos García',
      patientId: 'P-2024-002',
      patientPhone: '+34 623 456 789',
      type: 'revision',
      provider: 'dr-rodriguez',
      date: '2024-09-04',
      startTime: '10:30',
      endTime: '11:00',
      duration: 30,
      status: 'pendiente',
      reason: 'Seguimiento post-cirugía',
      notes: 'Control de herida quirúrgica'
    },
    {
      id: 'APT-2024-003',
      patientName: 'Carmen López Martín',
      patientId: 'P-2024-003',
      patientPhone: '+34 634 567 890',
      type: 'urgencia',
      provider: 'dr-garcia',
      date: '2024-09-05',
      startTime: '14:00',
      endTime: '14:15',
      duration: 15,
      status: 'cancelada',
      reason: 'Dolor abdominal agudo',
      notes: 'Paciente canceló por mejoría'
    }
  ];

  useEffect(() => {
    setAppointments(mockAppointments);
    
    // If there's a preselected patient, open the form
    if (preSelectedPatient) {
      setIsFormOpen(true);
    }
  }, [preSelectedPatient]);

  // Filter appointments based on current filters and date range
  const filteredAppointments = useMemo(() => {
    let filtered = appointments;

    // if (filters?.provider) {
    //   filtered = filtered?.filter(apt => apt?.provider === filters?.provider);
    // }

    if (filters?.appointmentType) {
      filtered = filtered?.filter(apt => apt?.type === filters?.appointmentType);
    }

    if (filters?.status) {
      filtered = filtered?.filter(apt => apt?.status === filters?.status);
    }

    return filtered;
  }, [appointments, filters]);

  // Get appointments for selected date
  const selectedDateAppointments = useMemo(() => {
    return filteredAppointments?.filter(apt => 
      isSameDay(parseISO(apt?.date), selectedDate)
    );
  }, [filteredAppointments, selectedDate]);

  // Handle date navigation
  const handlePreviousPeriod = () => {
    if (viewType === 'week') {
      setCurrentDate(prev => addDays(prev, -7));
    } else {
      setCurrentDate(prev => subMonths(prev, 1));
    }
  };

  const handleNextPeriod = () => {
    if (viewType === 'week') {
      setCurrentDate(prev => addDays(prev, 7));
    } else {
      setCurrentDate(prev => addMonths(prev, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Handle appointment creation/editing
  const handleTimeSlotClick = (date, time) => {
    setSelectedTimeSlot({ date, time });
    setSelectedAppointment(null);
    setIsFormOpen(true);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleAppointmentSave = (appointmentData) => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (selectedAppointment) {
        // Update existing appointment
        setAppointments(prev => prev?.map(apt => 
          apt?.id === selectedAppointment?.id 
            ? { ...apt, ...appointmentData }
            : apt
        ));
      } else {
        // Create new appointment
        const newAppointment = {
          id: `APT-${Date.now()}`,
          ...appointmentData
        };
        setAppointments(prev => [...prev, newAppointment]);
      }
      
      setIsFormOpen(false);
      setSelectedTimeSlot(null);
      setSelectedAppointment(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleAppointmentDelete = (appointmentId) => {
    setAppointments(prev => prev?.filter(apt => apt?.id !== appointmentId));
    setIsModalOpen(false);
  };

  // Handle drag and drop
  const handleDragStart = (appointment) => {
    setDraggedAppointment(appointment);
  };

  const handleDrop = (date, time) => {
    if (draggedAppointment) {
      // Check for conflicts
      const hasConflict = appointments?.some(apt => 
        apt?.id !== draggedAppointment?.id &&
        apt?.date === format(date, 'yyyy-MM-dd') &&
        apt?.startTime === time
      );

      if (hasConflict) {
        alert('Conflicto de horario detectado. La cita no se puede mover a ese horario.');
        setDraggedAppointment(null);
        return;
      }

      // Update appointment time
      setAppointments(prev => prev?.map(apt => 
        apt?.id === draggedAppointment?.id
          ? { 
              ...apt, 
              date: format(date, 'yyyy-MM-dd'),
              startTime: time
            }
          : apt
      ));
      setDraggedAppointment(null);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      // provider: '',
      appointmentType: '',
      status: ''
    });
  };

  const handlePatientNavigation = (patientId) => {
    navigate('/patient-management', { state: { selectedPatientId: patientId } });
  };

  const appointmentStats = {
    today: filteredAppointments?.filter(apt => 
      isSameDay(parseISO(apt?.date), new Date())
    )?.length || 0,
    pending: filteredAppointments?.filter(apt => apt?.status === 'pendiente')?.length || 0,
    confirmed: filteredAppointments?.filter(apt => apt?.status === 'confirmada')?.length || 0,
    cancelled: filteredAppointments?.filter(apt => apt?.status === 'cancelada')?.length || 0
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
                Programación de Citas
              </h1>
              <p className="text-text-secondary">
                Gestiona el calendario y coordina las citas médicas de tu consulta
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {/* <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>Confirmada: {appointmentStats?.confirmed}</span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full ml-3"></span>
                <span>Pendiente: {appointmentStats?.pending}</span>
                <span className="w-3 h-3 bg-red-500 rounded-full ml-3"></span>
                <span>Cancelada: {appointmentStats?.cancelled}</span>
              </div> */}
              <Button
                variant="default"
                onClick={() => setIsFormOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Nueva Cita
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <QuickFilters
            filters={filters}
            // providers={providers}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            className="mb-6"
          />

          {/* Calendar Controls */}
          <div className="bg-card border border-border rounded-lg shadow-medical p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPeriod}
                    iconName="ChevronLeft"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToday}
                  >
                    Hoy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPeriod}
                    iconName="ChevronRight"
                  />
                </div>
                
                <h2 className="text-lg font-semibold text-text-primary">
                  {viewType === 'week' 
                    ? `Semana del ${format(startOfWeek(currentDate, { locale: es }), 'd MMM', { locale: es })} - ${format(endOfWeek(currentDate, { locale: es }), 'd MMM yyyy', { locale: es })}`
                    : format(currentDate, 'MMMM yyyy', { locale: es })
                  }
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewType === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewType('week')}
                >
                  Semana
                </Button>
                <Button
                  variant={viewType === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewType('month')}
                >
                  Mes
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Appointment Form Sidebar */}
            <div className="lg:col-span-3">
              <AppointmentForm
                className=""
                isOpen={isFormOpen}
                selectedTimeSlot={selectedTimeSlot}
                selectedAppointment={selectedAppointment}
                preSelectedPatient={preSelectedPatient}
                patients={mockPatients}
                // providers={providers}
                onSave={handleAppointmentSave}
                onCancel={() => {
                  setIsFormOpen(false);
                  setSelectedTimeSlot(null);
                  setSelectedAppointment(null);
                }}
                loading={isLoading}
              />
            </div>

            {/* Calendar View */}
            <div className="lg:col-span-7">
              <CalendarView
                className=""
                currentDate={currentDate}
                selectedDate={selectedDate}
                viewType={viewType}
                appointments={filteredAppointments}
                onDateSelect={setSelectedDate}
                onTimeSlotClick={handleTimeSlotClick}
                onAppointmentClick={handleAppointmentClick}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                draggedAppointment={draggedAppointment}
              />
            </div>

            {/* Daily Agenda Sidebar */}
            <div className="lg:col-span-2">
              <DailyAgenda
                className=""
                selectedDate={selectedDate}
                appointments={selectedDateAppointments}
                onAppointmentClick={handleAppointmentClick}
                onPatientNavigation={handlePatientNavigation}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details Modal */}
      <AppointmentModal
        className=""
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEdit={(appointment) => {
          setSelectedAppointment(appointment);
          setIsModalOpen(false);
          setIsFormOpen(true);
        }}
        onDelete={handleAppointmentDelete}
        onPatientNavigation={handlePatientNavigation}
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

export default AppointmentScheduling;