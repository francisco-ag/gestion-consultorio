import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PatientTable = ({ 
  patients, 
  selectedPatients, 
  onPatientSelect, 
  onSelectAll, 
  onPatientView, 
  onPatientEdit, 
  onScheduleAppointment,
  sortConfig,
  onSort 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Activo': { color: 'bg-success/10 text-success', icon: 'CheckCircle' },
      'Inactivo': { color: 'bg-muted text-text-secondary', icon: 'Clock' },
      'Crítico': { color: 'bg-error/10 text-error', icon: 'AlertTriangle' }
    };

    const config = statusConfig?.[status] || statusConfig?.['Activo'];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className="mr-1" />
        {status}
      </span>
    );
  };

  const getPriorityIndicator = (priority) => {
    const priorityConfig = {
      'Alta': { color: 'text-error', icon: 'AlertTriangle' },
      'Media': { color: 'text-warning', icon: 'AlertCircle' },
      'Baja': { color: 'text-success', icon: 'CheckCircle' }
    };

    const config = priorityConfig?.[priority] || priorityConfig?.['Baja'];
    
    return (<Icon name={config?.icon} size={16} className={config?.color} />);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-secondary" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const handleSort = (column) => {
    onSort(column);
  };

  const isAllSelected = patients?.length > 0 && selectedPatients?.length === patients?.length;
  const isIndeterminate = selectedPatients?.length > 0 && selectedPatients?.length < patients?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-medical"
                >
                  <span>Paciente</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('age')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-medical"
                >
                  <span>Edad</span>
                  {getSortIcon('age')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('lastVisit')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-medical"
                >
                  <span>Última Visita</span>
                  {getSortIcon('lastVisit')}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Contacto
              </th>
              {/* <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Prioridad
              </th> */}
              {/* <th className="px-4 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                Acciones
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {patients?.map((patient) => (
              <tr
                key={patient?.id}
                className={`hover:bg-muted/50 transition-medical cursor-pointer ${
                  selectedPatients?.includes(patient?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(patient?.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onPatientView(patient)}
              >
                <td className="px-4 py-4" onClick={(e) => e?.stopPropagation()}>
                  <Checkbox
                    checked={selectedPatients?.includes(patient?.id)}
                    onChange={(e) => onPatientSelect(patient?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={patient?.photo}
                        alt={`Foto de ${patient?.name}`}
                        className="w-10 h-10 rounded-full object-cover border border-border"
                      />
                      {patient?.hasAlerts && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full border border-card"></div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {patient?.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        ID: {patient?.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-text-primary">
                    {patient?.age} años
                  </div>
                  <div className="text-xs text-text-secondary">
                    {patient?.gender}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-text-primary">
                    {formatDate(patient?.lastVisit)}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {patient?.daysSinceLastVisit} días
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-text-primary">
                    {patient?.phone}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {patient?.email}
                  </div>
                </td>
                {/* <td className="px-4 py-4">
                  {getStatusBadge(patient?.status)}
                </td>
                <td className="px-4 py-4">
                  {getPriorityIndicator(patient?.priority)}
                </td> */}
                {/* <td className="px-4 py-4" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPatientView(patient)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPatientEdit(patient)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onScheduleAppointment(patient)}
                      className="h-8 w-8"
                    >
                      <Icon name="Calendar" size={14} />
                    </Button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {patients?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No se encontraron pacientes
          </h3>
          <p className="text-text-secondary">
            Intenta ajustar los filtros de búsqueda o agrega un nuevo paciente.
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientTable;