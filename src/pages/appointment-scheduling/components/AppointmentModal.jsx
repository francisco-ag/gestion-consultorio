import React from 'react';
        import { format, parseISO } from 'date-fns';
        import { es } from 'date-fns/locale';
        import Button from '../../../components/ui/Button';
        import { cn } from '../../../utils/cn';

        const AppointmentModal = ({
          appointment,
          isOpen,
          onClose,
          onEdit,
          onDelete,
          onPatientNavigation,
          className
        }) => {
          if (!isOpen || !appointment) return null;

          const getStatusColor = (status) => {
            switch (status) {
              case 'confirmada':
                return 'text-green-600 bg-green-50 border-green-200';
              case 'pendiente':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
              case 'cancelada':
                return 'text-red-600 bg-red-50 border-red-200';
              default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
            }
          };

          const getTypeColor = (type) => {
            switch (type) {
              case 'consulta':
                return 'bg-blue-100 text-blue-800';
              case 'revision':
                return 'bg-green-100 text-green-800';
              case 'urgencia':
                return 'bg-red-100 text-red-800';
              case 'seguimiento':
                return 'bg-purple-100 text-purple-800';
              case 'cirugia':
                return 'bg-orange-100 text-orange-800';
              default:
                return 'bg-gray-100 text-gray-800';
            }
          };

          const getStatusLabel = (status) => {
            switch (status) {
              case 'confirmada':
                return 'Confirmada';
              case 'pendiente':
                return 'Pendiente';
              case 'cancelada':
                return 'Cancelada';
              default:
                return status;
            }
          };

          const getTypeLabel = (type) => {
            switch (type) {
              case 'consulta':
                return 'Consulta General';
              case 'revision':
                return 'Revisión';
              case 'urgencia':
                return 'Urgencia';
              case 'seguimiento':
                return 'Seguimiento';
              case 'cirugia':
                return 'Cirugía';
              default:
                return type;
            }
          };

          const handleDeleteConfirm = () => {
            if (window?.confirm('¿Está seguro de que desea eliminar esta cita?')) {
              onDelete?.(appointment?.id);
            }
          };

          return (
            <>
              {/* Overlay */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
              ></div>

              {/* Modal */}
              <div className={cn(
                "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-lg shadow-medical-lg z-1300",
                className
              )}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Detalles de la Cita
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    iconName="X"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Status and Type */}
                  <div className="flex items-center space-x-3">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium border",
                      getStatusColor(appointment?.status)
                    )}>
                      {getStatusLabel(appointment?.status)}
                    </span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      getTypeColor(appointment?.type)
                    )}>
                      {getTypeLabel(appointment?.type)}
                    </span>
                  </div>

                  {/* Patient Information */}
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-2">Información del Paciente</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Nombre:</span>
                        <span className="text-sm font-medium text-text-primary">
                          {appointment?.patientName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">ID:</span>
                        <span className="text-sm text-text-primary">
                          {appointment?.patientId}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Teléfono:</span>
                        <span className="text-sm text-text-primary">
                          {appointment?.patientPhone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium text-text-primary mb-2">Detalles de la Cita</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Fecha:</span>
                        <span className="text-sm text-text-primary">
                          {format(parseISO(appointment?.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Hora:</span>
                        <span className="text-sm text-text-primary">
                          {appointment?.startTime} - {appointment?.endTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Duración:</span>
                        <span className="text-sm text-text-primary">
                          {appointment?.duration} minutos
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">Médico:</span>
                        <span className="text-sm text-text-primary">
                          {appointment?.provider === 'dr-garcia' ? 'Dr. María García' :
                           appointment?.provider === 'dr-rodriguez' ? 'Dr. Carlos Rodríguez' :
                           appointment?.provider === 'dr-lopez'? 'Dr. Ana López' : 'Dr. José Martínez'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reason and Notes */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">Motivo de la Cita</h4>
                      <p className="text-sm text-text-secondary bg-muted rounded-md p-3">
                        {appointment?.reason || 'No especificado'}
                      </p>
                    </div>
                    
                    {appointment?.notes && (
                      <div>
                        <h4 className="font-medium text-text-primary mb-1">Notas Adicionales</h4>
                        <p className="text-sm text-text-secondary bg-muted rounded-md p-3">
                          {appointment?.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => onPatientNavigation?.(appointment?.patientId)}
                      iconName="User"
                      iconPosition="left"
                      size="sm"
                      fullWidth
                    >
                      Ver Paciente
                    </Button>
                    
                    <Button
                      variant="default"
                      onClick={() => onEdit?.(appointment)}
                      iconName="Edit"
                      iconPosition="left"
                      size="sm"
                      fullWidth
                    >
                      Editar
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3 mt-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      size="sm"
                      fullWidth
                    >
                      Cerrar
                    </Button>
                    
                    <Button
                      variant="destructive"
                      onClick={handleDeleteConfirm}
                      iconName="Trash2"
                      iconPosition="left"
                      size="sm"
                      fullWidth
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          );
        };

        export default AppointmentModal;