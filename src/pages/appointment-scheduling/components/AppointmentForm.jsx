import React, { useState, useEffect } from 'react';
        import { format, parse } from 'date-fns';
        

        import Button from '../../../components/ui/Button';
        import Input from '../../../components/ui/Input';
        import Select from '../../../components/ui/Select';
        import { cn } from '../../../utils/cn';

        const AppointmentForm = ({
          isOpen,
          selectedTimeSlot,
          selectedAppointment,
          preSelectedPatient,
          patients = [],
          providers = [],
          onSave,
          onCancel,
          loading = false,
          className
        }) => {
          const [formData, setFormData] = useState({
            patientId: '',
            patientName: '',
            patientPhone: '',
            type: 'consulta',
            provider: 'dr-garcia',
            date: '',
            startTime: '',
            duration: 30,
            reason: '',
            notes: ''
          });

          const [patientSearch, setPatientSearch] = useState('');
          const [errors, setErrors] = useState({});

          const appointmentTypes = [
            { value: 'consulta', label: 'Consulta General' },
            { value: 'revision', label: 'Revisión' },
            { value: 'urgencia', label: 'Urgencia' },
            { value: 'seguimiento', label: 'Seguimiento' },
            { value: 'cirugia', label: 'Cirugía' }
          ];

          const durationOptions = [
            { value: 15, label: '15 minutos' },
            { value: 30, label: '30 minutos' },
            { value: 45, label: '45 minutos' },
            { value: 60, label: '1 hora' },
            { value: 90, label: '1h 30min' },
            { value: 120, label: '2 horas' }
          ];

          // Filter patients based on search
          const filteredPatients = patients?.filter(patient =>
            patient?.name?.toLowerCase()?.includes(patientSearch?.toLowerCase()) ||
            patient?.id?.toLowerCase()?.includes(patientSearch?.toLowerCase())
          );

          const patientOptions = filteredPatients?.map(patient => ({
            value: patient?.id,
            label: patient?.name,
            description: patient?.phone
          }));

          useEffect(() => {
            if (selectedAppointment) {
              // Editing existing appointment
              setFormData({
                patientId: selectedAppointment?.patientId || '',
                patientName: selectedAppointment?.patientName || '',
                patientPhone: selectedAppointment?.patientPhone || '',
                type: selectedAppointment?.type || 'consulta',
                provider: selectedAppointment?.provider || 'dr-garcia',
                date: selectedAppointment?.date || '',
                startTime: selectedAppointment?.startTime || '',
                duration: selectedAppointment?.duration || 30,
                reason: selectedAppointment?.reason || '',
                notes: selectedAppointment?.notes || ''
              });
            } else if (selectedTimeSlot) {
              // Creating new appointment with selected time slot
              setFormData(prev => ({
                ...prev,
                date: format(selectedTimeSlot?.date, 'yyyy-MM-dd'),
                startTime: selectedTimeSlot?.time,
                patientId: preSelectedPatient?.id || '',
                patientName: preSelectedPatient?.name || '',
                patientPhone: preSelectedPatient?.phone || ''
              }));
            } else if (preSelectedPatient) {
              // Pre-selected patient from navigation
              setFormData(prev => ({
                ...prev,
                patientId: preSelectedPatient?.id || '',
                patientName: preSelectedPatient?.name || '',
                patientPhone: preSelectedPatient?.phone || ''
              }));
            }
          }, [selectedAppointment, selectedTimeSlot, preSelectedPatient]);

          const handleInputChange = (field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }));
            
            // Clear error when user starts typing
            if (errors?.[field]) {
              setErrors(prev => ({ ...prev, [field]: null }));
            }
          };

          const handlePatientSelect = (patientId) => {
            const patient = patients?.find(p => p?.id === patientId);
            if (patient) {
              setFormData(prev => ({
                ...prev,
                patientId: patient?.id,
                patientName: patient?.name,
                patientPhone: patient?.phone
              }));
            }
            handleInputChange('patientId', patientId);
          };

          const validateForm = () => {
            const newErrors = {};

            if (!formData?.patientId) {
              newErrors.patientId = 'Seleccione un paciente';
            }

            if (!formData?.date) {
              newErrors.date = 'Seleccione una fecha';
            }

            if (!formData?.startTime) {
              newErrors.startTime = 'Seleccione una hora';
            }

            if (!formData?.reason?.trim()) {
              newErrors.reason = 'Ingrese el motivo de la cita';
            }

            setErrors(newErrors);
            return Object.keys(newErrors)?.length === 0;
          };

          const handleSubmit = (e) => {
            e?.preventDefault();
            
            if (!validateForm()) return;

            // Calculate end time based on duration
            const startTime = parse(formData?.startTime, 'HH:mm', new Date());
            const endTime = new Date(startTime?.getTime() + (formData?.duration * 60000));
            const endTimeString = format(endTime, 'HH:mm');

            const appointmentData = {
              ...formData,
              endTime: endTimeString,
              status: selectedAppointment?.status || 'pendiente'
            };

            onSave?.(appointmentData);
          };

          const handleReset = () => {
            setFormData({
              patientId: '',
              patientName: '',
              patientPhone: '',
              type: 'consulta',
              provider: 'dr-garcia',
              date: '',
              startTime: '',
              duration: 30,
              reason: '',
              notes: ''
            });
            setErrors({});
            setPatientSearch('');
          };

          if (!isOpen) return null;

          return (
            <div className={cn(
              "bg-card border border-border rounded-lg shadow-medical p-6 space-y-6",
              className
            )}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  {selectedAppointment ? 'Editar Cita' : 'Nueva Cita'}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCancel}
                  iconName="X"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Patient Selection */}
                <div>
                  <Select
                    label="Paciente *"
                    options={patientOptions}
                    value={formData?.patientId}
                    onChange={handlePatientSelect}
                    placeholder="Buscar paciente..."
                    searchable
                    error={errors?.patientId}
                    required
                  />
                </div>

                {/* Selected Patient Info */}
                {formData?.patientName && (
                  <div className="bg-muted rounded-md p-3">
                    <p className="text-sm font-medium text-text-primary">
                      {formData?.patientName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {formData?.patientPhone}
                    </p>
                  </div>
                )}

                {/* Appointment Type */}
                <div>
                  <Select
                    label="Tipo de Cita"
                    options={appointmentTypes}
                    value={formData?.type}
                    onChange={(value) => handleInputChange('type', value)}
                    required
                  />
                </div>

                {/* Provider */}
                {/* <div>
                  <Select
                    label="Médico"
                    options={providers}
                    value={formData?.provider}
                    onChange={(value) => handleInputChange('provider', value)}
                    required
                  />
                </div> */}

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input
                      type="date"
                      label="Fecha *"
                      value={formData?.date}
                      onChange={(e) => handleInputChange('date', e?.target?.value)}
                      error={errors?.date}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      label="Hora *"
                      value={formData?.startTime}
                      onChange={(e) => handleInputChange('startTime', e?.target?.value)}
                      error={errors?.startTime}
                      required
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <Select
                    label="Duración"
                    options={durationOptions}
                    value={formData?.duration}
                    onChange={(value) => handleInputChange('duration', value)}
                    required
                  />
                </div>

                {/* Reason */}
                <div>
                  <Input
                    label="Motivo de la Cita *"
                    value={formData?.reason}
                    onChange={(e) => handleInputChange('reason', e?.target?.value)}
                    placeholder="Ej: Revisión mensual, dolor abdominal..."
                    error={errors?.reason}
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-text-primary block mb-2">
                    Notas Adicionales
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    rows={3}
                    value={formData?.notes}
                    onChange={(e) => handleInputChange('notes', e?.target?.value)}
                    placeholder="Información adicional sobre la cita..."
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button
                    type="submit"
                    variant="default"
                    loading={loading}
                    disabled={loading}
                    fullWidth
                  >
                    {selectedAppointment ? 'Actualizar Cita' : 'Programar Cita'}
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      disabled={loading}
                      size="sm"
                      fullWidth
                    >
                      Limpiar
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onCancel}
                      disabled={loading}
                      size="sm"
                      fullWidth
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          );
        };

        export default AppointmentForm;