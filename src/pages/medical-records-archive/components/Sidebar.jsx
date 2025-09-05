import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Sidebar = ({ onQuickFilter, className = '' }) => {
  const [recentRecords] = useState([
    {
      id: 'R-2024-001',
      patientName: 'Ana María Rodríguez',
      type: 'consultation',
      date: '2024-08-28',
      title: 'Consulta General'
    },
    {
      id: 'R-2024-002',
      patientName: 'Carlos López',
      type: 'lab_results',
      date: '2024-08-27',
      title: 'Análisis de Sangre'
    },
    {
      id: 'R-2024-003',
      patientName: 'María García',
      type: 'imaging',
      date: '2024-08-26',
      title: 'Radiografía de Tórax'
    }
  ]);

  const [favoriteSearches] = useState([
    { name: 'Consultas de Emergencia', filter: 'emergency_consultations' },
    { name: 'Resultados Pendientes', filter: 'pending_results' },
    { name: 'Última Semana', filter: 'last_week' },
    { name: 'Pacientes Diabéticos', filter: 'diabetes_patients' }
  ]);

  const [storageStats] = useState({
    totalRecords: 15847,
    totalSize: '2.3 GB',
    thisMonth: 234,
    lastBackup: '2024-08-28'
  });

  const getRecordTypeIcon = (type) => {
    const iconMap = {
      consultation: 'Stethoscope',
      lab_results: 'TestTube',
      imaging: 'Scan',
      prescriptions: 'Pill',
      surgery: 'Scissors',
      vaccination: 'Syringe',
      emergency: 'AlertTriangle'
    };
    return iconMap?.[type] || 'FileText';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <div className={`w-80 bg-card border-l border-border overflow-auto ${className}`}>
      <div className="p-4 space-y-6">
        {/* Recently Accessed */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Clock" size={16} className="mr-2" />
            Accedidos Recientemente
          </h3>
          <div className="space-y-2">
            {recentRecords?.map((record) => (
              <div
                key={record?.id}
                className="p-3 border border-border rounded-md hover:bg-muted/30 cursor-pointer transition-medical"
                onClick={() => onQuickFilter('recent', record?.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1 rounded bg-primary/10">
                    <Icon 
                      name={getRecordTypeIcon(record?.type)} 
                      size={14} 
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {record?.title}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      {record?.patientName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {formatDate(record?.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2"
            onClick={() => onQuickFilter('view_all_recent')}
          >
            Ver Todos
          </Button>
        </div>

        {/* Favorite Searches */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Star" size={16} className="mr-2" />
            Búsquedas Favoritas
          </h3>
          <div className="space-y-1">
            {favoriteSearches?.map((search, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => onQuickFilter('favorite', search?.filter)}
              >
                <Icon name="Search" size={14} className="mr-2" />
                {search?.name}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2"
            onClick={() => onQuickFilter('manage_favorites')}
          >
            <Icon name="Settings" size={14} className="mr-2" />
            Gestionar Favoritas
          </Button>
        </div>

        {/* Quick Filters */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Filter" size={16} className="mr-2" />
            Filtros Rápidos
          </h3>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => onQuickFilter('today')}
            >
              <Icon name="Calendar" size={14} className="mr-2" />
              Hoy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => onQuickFilter('this_week')}
            >
              <Icon name="Calendar" size={14} className="mr-2" />
              Esta Semana
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => onQuickFilter('this_month')}
            >
              <Icon name="Calendar" size={14} className="mr-2" />
              Este Mes
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => onQuickFilter('urgent')}
            >
              <Icon name="AlertTriangle" size={14} className="mr-2 text-warning" />
              Urgentes
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => onQuickFilter('unread')}
            >
              <Icon name="Mail" size={14} className="mr-2" />
              No Leídos
            </Button>
          </div>
        </div>

        {/* Record Types */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="FolderOpen" size={16} className="mr-2" />
            Tipos de Registro
          </h3>
          <div className="space-y-1">
            {[
              { type: 'consultation', label: 'Consultas', count: 5234 },
              { type: 'lab_results', label: 'Laboratorio', count: 3421 },
              { type: 'imaging', label: 'Imágenes', count: 2156 },
              { type: 'prescriptions', label: 'Recetas', count: 4567 },
              { type: 'surgery', label: 'Cirugías', count: 234 },
              { type: 'vaccination', label: 'Vacunas', count: 1234 }
            ]?.map((item) => (
              <Button
                key={item?.type}
                variant="ghost"
                size="sm"
                className="w-full justify-between"
                onClick={() => onQuickFilter('type', item?.type)}
              >
                <div className="flex items-center">
                  <Icon name={getRecordTypeIcon(item?.type)} size={14} className="mr-2" />
                  {item?.label}
                </div>
                <span className="text-xs text-text-secondary">{item?.count}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Storage Statistics */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="HardDrive" size={16} className="mr-2" />
            Estadísticas de Almacenamiento
          </h3>
          <div className="space-y-3">
            <div className="p-3 border border-border rounded-md bg-muted/20">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Total de Registros</span>
                  <span className="text-sm font-medium text-text-primary">
                    {storageStats?.totalRecords?.toLocaleString('es-ES')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Tamaño Total</span>
                  <span className="text-sm font-medium text-text-primary">
                    {storageStats?.totalSize}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Este Mes</span>
                  <span className="text-sm font-medium text-success">
                    +{storageStats?.thisMonth}
                  </span>
                </div>
              </div>
            </div>

            {/* Storage Usage Bar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-text-secondary">Uso del Almacenamiento</span>
                <span className="text-xs text-text-secondary">68%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div className="text-xs text-text-secondary">
              <div className="flex items-center justify-between">
                <span>Último respaldo:</span>
                <span>{formatDate(storageStats?.lastBackup)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Zap" size={16} className="mr-2" />
            Acciones Rápidas
          </h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onQuickFilter('export_all')}
              iconName="Download"
              iconPosition="left"
            >
              Exportar Registros
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onQuickFilter('backup')}
              iconName="Shield"
              iconPosition="left"
            >
              Crear Respaldo
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onQuickFilter('cleanup')}
              iconName="Trash2"
              iconPosition="left"
            >
              Limpiar Archivos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;