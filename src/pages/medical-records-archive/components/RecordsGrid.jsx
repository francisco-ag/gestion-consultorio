import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecordsGrid = ({ records, onRecordSelect, className = '' }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleSelectRecord = (recordId) => {
    setSelectedRecords(prev => 
      prev?.includes(recordId) 
        ? prev?.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

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

  const getRecordTypeColor = (type) => {
    const colorMap = {
      consultation: 'bg-blue-100 text-blue-700',
      lab_results: 'bg-green-100 text-green-700',
      imaging: 'bg-purple-100 text-purple-700',
      prescriptions: 'bg-orange-100 text-orange-700',
      surgery: 'bg-red-100 text-red-700',
      vaccination: 'bg-teal-100 text-teal-700',
      emergency: 'bg-red-200 text-red-800'
    };
    return colorMap?.[type] || 'bg-gray-100 text-gray-700';
  };

  const getRecordTypeName = (type) => {
    const nameMap = {
      consultation: 'Consulta',
      lab_results: 'Laboratorio',
      imaging: 'Imagen',
      prescriptions: 'Receta',
      surgery: 'Cirugía',
      vaccination: 'Vacuna',
      emergency: 'Emergencia'
    };
    return nameMap?.[type] || 'Documento';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {records?.map((record) => (
          <div
            key={record?.id}
            className="bg-card border border-border rounded-lg shadow-medical hover:shadow-medical-lg transition-medical cursor-pointer group"
            onClick={() => onRecordSelect(record)}
          >
            {/* Card Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRecordTypeColor(record?.type)}`}>
                  <Icon 
                    name={getRecordTypeIcon(record?.type)} 
                    size={12} 
                    className="inline mr-1"
                  />
                  {getRecordTypeName(record?.type)}
                </div>
                
                <div className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={selectedRecords?.includes(record?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      handleSelectRecord(record?.id);
                    }}
                    className="rounded border-border"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-medical"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Handle more actions
                    }}
                  >
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>

              {/* Patient Info */}
              <div className="flex items-center space-x-3">
                <Image
                  src={record?.patientPhoto}
                  alt={record?.patientName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text-primary truncate">{record?.patientName}</p>
                  <p className="text-xs text-text-secondary">ID: {record?.patientId}</p>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h3 className="font-medium text-text-primary mb-2 line-clamp-2">
                {record?.title}
              </h3>
              <p className="text-sm text-text-secondary mb-3 line-clamp-3">
                {record?.description}
              </p>

              {/* Document Preview */}
              {record?.thumbnail && (
                <div className="mb-3">
                  <div className="w-full h-24 bg-muted rounded-md overflow-hidden">
                    <Image
                      src={record?.thumbnail}
                      alt="Vista previa del documento"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Attachments */}
              {record?.hasAttachments && (
                <div className="flex items-center space-x-2 mb-3 p-2 bg-muted/50 rounded-md">
                  <Icon name="Paperclip" size={14} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary">
                    {record?.attachmentCount} archivo(s)
                  </span>
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>Fecha:</span>
                  <span>{formatDate(record?.date)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>Modificado:</span>
                  <span>{formatDate(record?.lastModified)}</span>
                </div>
                {record?.diagnosis && (
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <span>Diagnóstico:</span>
                    <span className="truncate ml-2">{record?.diagnosis}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-4 py-3 border-t border-border bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {record?.isUrgent && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      <Icon name="AlertTriangle" size={10} className="mr-1" />
                      Urgente
                    </span>
                  )}
                  {record?.isConfidential && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      <Icon name="Lock" size={10} className="mr-1" />
                      Confidencial
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onRecordSelect(record);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-medical"
                  >
                    <Icon name="Eye" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Handle download
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-medical"
                  >
                    <Icon name="Download" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {records?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={64} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No se encontraron registros
          </h3>
          <p className="text-text-secondary">
            Intenta ajustar los filtros de búsqueda para encontrar los registros que necesitas.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecordsGrid;