import React from 'react';
        import Button from '../../../components/ui/Button';
        import Select from '../../../components/ui/Select';
        import { cn } from '../../../utils/cn';

        const QuickFilters = ({
          filters,
          // providers = [],
          onFiltersChange,
          onClearFilters,
          className
        }) => {
          const appointmentTypes = [
            { value: '', label: 'Todos los tipos' },
            { value: 'consulta', label: 'Consulta General' },
            { value: 'revision', label: 'Revisión' },
            { value: 'urgencia', label: 'Urgencia' },
            { value: 'seguimiento', label: 'Seguimiento' },
            { value: 'cirugia', label: 'Cirugía' }
          ];

          const statusOptions = [
            { value: '', label: 'Todos los estados' },
            { value: 'confirmada', label: 'Confirmada' },
            { value: 'pendiente', label: 'Pendiente' },
            { value: 'cancelada', label: 'Cancelada' }
          ];

          // const providerOptions = [
          //   { value: '', label: 'Todos los médicos' },
          //   ...providers
          // ];

          const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

          return (
            <div className={cn(
              "bg-card border border-border rounded-lg shadow-medical p-4",
              className
            )}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">
                    Filtros rápidos:
                  </span>
                  {hasActiveFilters && (
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                      Activos
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  {/* Provider Filter */}
                  {/* <div className="w-full sm:w-auto min-w-48">
                    <Select
                      options={providerOptions}
                      value={filters?.provider || ''}
                      onChange={(value) => onFiltersChange?.({ provider: value })}
                      placeholder="Seleccionar médico"
                    />
                  </div> */}

                  {/* Appointment Type Filter */}
                  <div className="w-full sm:w-auto min-w-48">
                    <Select
                      options={appointmentTypes}
                      value={filters?.appointmentType || ''}
                      onChange={(value) => onFiltersChange?.({ appointmentType: value })}
                      placeholder="Tipo de cita"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="w-full sm:w-auto min-w-44">
                    <Select
                      options={statusOptions}
                      value={filters?.status || ''}
                      onChange={(value) => onFiltersChange?.({ status: value })}
                      placeholder="Estado"
                    />
                  </div>

                  {/* Clear Filters Button */}
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onClearFilters}
                      iconName="X"
                      iconPosition="left"
                      className="w-full sm:w-auto"
                    >
                      Limpiar
                    </Button>
                  )}
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
                <span className="text-sm text-text-secondary">Accesos rápidos:</span>
                
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onFiltersChange?.({ status: 'pendiente' })}
                  className="text-yellow-600 hover:bg-yellow-50"
                >
                  Pendientes
                </Button>
                
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onFiltersChange?.({ status: 'confirmada' })}
                  className="text-green-600 hover:bg-green-50"
                >
                  Confirmadas
                </Button>
                
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onFiltersChange?.({ type: 'urgencia' })}
                  className="text-red-600 hover:bg-red-50"
                >
                  Urgencias
                </Button>
                
              {/* <  Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onFiltersChange?.({ provider: 'dr-garcia' })}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  Dr. García
                </Button> */}
              </div>
            </div>
          );
        };

        export default QuickFilters;