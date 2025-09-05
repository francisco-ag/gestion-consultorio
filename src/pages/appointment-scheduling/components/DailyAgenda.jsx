import React, { useMemo } from 'react';
        import { format } from 'date-fns';
        import { es } from 'date-fns/locale';
        import Button from '../../../components/ui/Button';
        import { cn } from '../../../utils/cn';

        const DailyAgenda = ({
          selectedDate,
          appointments = [],
          onAppointmentClick,
          onPatientNavigation,
          className
        }) => {
          // Sort appointments by time
          const sortedAppointments = useMemo(() => {
            return [...appointments]?.sort((a, b) => {
              return a?.startTime?.localeCompare(b?.startTime);
            });
          }, [appointments]);

          // Group appointments by status
          const appointmentsByStatus = useMemo(() => {
            const grouped = {
              confirmada: [],
              pendiente: [],
              cancelada: []
            };

            sortedAppointments?.forEach(appointment => {
              if (grouped?.[appointment?.status]) {
                grouped?.[appointment?.status]?.push(appointment);
              }
            });

            return grouped;
          }, [sortedAppointments]);

          // Mock waitlist data
          const waitlist = [
            {
              id: 'W-001',
              patientName: 'Laura Fernández',
              patientPhone: '+34 667 890 123',
              waitingSince: '14:30',
              priority: 'alta'
            },
            {
              id: 'W-002',
              patientName: 'Roberto Jiménez',
              patientPhone: '+34 678 901 234',
              waitingSince: '15:15',
              priority: 'media'
            }
          ];

          // Mock cancellations
          const recentCancellations = [
            {
              id: 'C-001',
              patientName: 'Isabel Torres',
              originalTime: '10:00',
              cancelledAt: '09:45',
              reason: 'Emergencia familiar'
            }
          ];

          const getStatusColor = (status) => {
            switch (status) {
              case 'confirmada':
                return 'text-green-600 bg-green-50';
              case 'pendiente':
                return 'text-yellow-600 bg-yellow-50';
              case 'cancelada':
                return 'text-red-600 bg-red-50';
              default:
                return 'text-gray-600 bg-gray-50';
            }
          };

          const getStatusIcon = (status) => {
            switch (status) {
              case 'confirmada':
                return 'CheckCircle';
              case 'pendiente':
                return 'Clock';
              case 'cancelada':
                return 'XCircle';
              default:
                return 'Circle';
            }
          };

          const getTypeColor = (type) => {
            switch (type) {
              case 'consulta':
                return 'bg-blue-500';
              case 'revision':
                return 'bg-green-500';
              case 'urgencia':
                return 'bg-red-500';
              case 'seguimiento':
                return 'bg-purple-500';
              case 'cirugia':
                return 'bg-orange-500';
              default:
                return 'bg-gray-500';
            }
          };

          const getPriorityColor = (priority) => {
            switch (priority) {
              case 'alta':
                return 'bg-red-100 text-red-800';
              case 'media':
                return 'bg-yellow-100 text-yellow-800';
              case 'baja':
                return 'bg-green-100 text-green-800';
              default:
                return 'bg-gray-100 text-gray-800';
            }
          };

          return (
            <div className={cn("space-y-6", className)}>
              {/* Daily Summary Header */}
              <div className="bg-card border border-border rounded-lg shadow-medical p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Agenda del Día
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-50 rounded-md p-2 text-center">
                    <div className="font-semibold text-green-700">
                      {appointmentsByStatus?.confirmada?.length}
                    </div>
                    <div className="text-green-600">Confirmadas</div>
                  </div>
                  <div className="bg-yellow-50 rounded-md p-2 text-center">
                    <div className="font-semibold text-yellow-700">
                      {appointmentsByStatus?.pendiente?.length}
                    </div>
                    <div className="text-yellow-600">Pendientes</div>
                  </div>
                </div>
              </div>

              {/* Appointments List */}
              <div className="bg-card border border-border rounded-lg shadow-medical">
                <div className="p-4 border-b border-border">
                  <h4 className="font-medium text-text-primary">
                    Citas Programadas ({sortedAppointments?.length})
                  </h4>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {sortedAppointments?.length > 0 ? (
                    <div className="divide-y divide-border">
                      {sortedAppointments?.map(appointment => (
                        <div
                          key={appointment?.id}
                          className="p-3 hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => onAppointmentClick?.(appointment)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className={cn(
                                "w-3 h-3 rounded-full",
                                getTypeColor(appointment?.type)
                              )}></div>
                              <span className="text-sm font-medium text-text-primary">
                                {appointment?.startTime}
                              </span>
                              <span className={cn(
                                "text-xs px-2 py-1 rounded-full",
                                getStatusColor(appointment?.status)
                              )}>
                                {appointment?.status}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium text-text-primary">
                              {appointment?.patientName}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {appointment?.type} • {appointment?.duration}min
                            </p>
                            <p className="text-xs text-text-secondary">
                              {appointment?.reason}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <Button
                              variant="ghost"
                              size="xs"
                              onClick={(e) => {
                                e?.stopPropagation();
                                onPatientNavigation?.(appointment?.patientId);
                              }}
                              iconName="User"
                              iconPosition="left"
                            >
                              Ver Paciente
                            </Button>
                            <Button
                              variant="ghost"
                              size="xs"
                              iconName={getStatusIcon(appointment?.status)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-text-secondary">
                      <div className="text-sm">No hay citas programadas</div>
                      <div className="text-xs mt-1">para este día</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Patient Waitlist */}
              {/* <div className="bg-card border border-border rounded-lg shadow-medical">
                <div className="p-4 border-b border-border">
                  <h4 className="font-medium text-text-primary">
                    Lista de Espera ({waitlist?.length})
                  </h4>
                </div>
                
                <div className="max-h-60 overflow-y-auto">
                  {waitlist?.length > 0 ? (
                    <div className="divide-y divide-border">
                      {waitlist?.map(patient => (
                        <div key={patient?.id} className="p-3 hover:bg-accent transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-text-primary">
                              {patient?.patientName}
                            </span>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              getPriorityColor(patient?.priority)
                            )}>
                              {patient?.priority}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-text-secondary">
                              Desde: {patient?.waitingSince}
                            </span>
                            <Button
                              variant="outline"
                              size="xs"
                              iconName="Calendar"
                            >
                              Programar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-text-secondary">
                      <div className="text-sm">Sin lista de espera</div>
                    </div>
                  )}
                </div>
              </div> */}

              {/* Recent Cancellations */}
              {/* {recentCancellations?.length > 0 && (
                <div className="bg-card border border-border rounded-lg shadow-medical">
                  <div className="p-4 border-b border-border">
                    <h4 className="font-medium text-text-primary">
                      Cancelaciones Recientes
                    </h4>
                  </div>
                  
                  <div className="max-h-48 overflow-y-auto">
                    <div className="divide-y divide-border">
                      {recentCancellations?.map(cancellation => (
                        <div key={cancellation?.id} className="p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-4 h-4"
                              iconName="AlertTriangle"
                            />
                            <span className="text-sm font-medium text-text-primary">
                              {cancellation?.patientName}
                            </span>
                          </div>
                          <div className="text-xs text-text-secondary">
                            Cita: {cancellation?.originalTime} • Cancelada: {cancellation?.cancelledAt}
                          </div>
                          {cancellation?.reason && (
                            <div className="text-xs text-text-secondary mt-1">
                              Motivo: {cancellation?.reason}
                            </div>
                          )}
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="xs"
                              iconName="RotateCcw"
                            >
                              Reprogramar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )} */}
            </div>
          );
        };

        export default DailyAgenda;