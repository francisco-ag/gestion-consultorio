import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecordsList = ({ records, onRecordSelect, onBulkAction, className = '' }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSelectRecord = (recordId) => {
    setSelectedRecords(prev => 
      prev?.includes(recordId) 
        ? prev?.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecords?.length === records?.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(records?.map(record => record?.id));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
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
      consultation: 'text-blue-600',
      lab_results: 'text-green-600',
      imaging: 'text-purple-600',
      prescriptions: 'text-orange-600',
      surgery: 'text-red-600',
      vaccination: 'text-teal-600',
      emergency: 'text-red-700'
    };
    return colorMap?.[type] || 'text-gray-600';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const sortedRecords = [...records]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'date' || sortBy === 'lastModified') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className={`bg-card border border-border rounded-lg shadow-medical ${className}`}>
      {/* Bulk Actions Bar */}
      {selectedRecords?.length > 0 && (
        <div className="p-4 border-b border-border bg-primary/5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary">
              {selectedRecords?.length} registro(s) seleccionado(s)
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('export', selectedRecords)}
                iconName="Download"
                iconPosition="left"
              >
                Exportar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('print', selectedRecords)}
                iconName="Printer"
                iconPosition="left"
              >
                Imprimir
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('archive', selectedRecords)}
                iconName="Archive"
                iconPosition="left"
              >
                Archivar
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table Header */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-text-secondary">
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={selectedRecords?.length === records?.length && records?.length > 0}
              onChange={handleSelectAll}
              className="rounded border-border"
            />
          </div>
          {/* <div className="col-span-1">Tipo</div> */}
          <div 
            className="col-span-3 cursor-pointer flex items-center hover:text-text-primary"
            onClick={() => handleSort('patientName')}
          >
            Paciente
            <Icon name="ArrowUpDown" size={14} className="ml-1" />
          </div>
          <div className="col-span-2">Registro</div>
          <div 
            className="col-span-2 cursor-pointer flex items-center hover:text-text-primary"
            onClick={() => handleSort('date')}
          >
            Fecha
            <Icon name="ArrowUpDown" size={14} className="ml-1" />
          </div>
          <div 
            className="col-span-2 cursor-pointer flex items-center hover:text-text-primary"
            onClick={() => handleSort('lastModified')}
          >
            Modificado
            <Icon name="ArrowUpDown" size={14} className="ml-1" />
          </div>
          <div className="col-span-1">Acciones</div>
        </div>
      </div>
      {/* Records List */}
      <div className="divide-y divide-border">
        {sortedRecords?.map((record) => (
          <div
            key={record?.id}
            className="p-4 hover:bg-muted/30 transition-medical cursor-pointer"
            onClick={() => onRecordSelect(record)}
          >
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Checkbox */}
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={selectedRecords?.includes(record?.id)}
                  onChange={(e) => {
                    e?.stopPropagation();
                    handleSelectRecord(record?.id);
                  }}
                  className="rounded border-border"
                />
              </div>

              {/* Record Type
              <div className="col-span-1">
                <div className={`p-2 rounded-lg ${getRecordTypeColor(record?.type)} bg-current/10`}>
                  <Icon 
                    name={getRecordTypeIcon(record?.type)} 
                    size={16} 
                    className={getRecordTypeColor(record?.type)}
                  />
                </div>
              </div> */}

              {/* Patient Info */}
              <div className="col-span-3">
                <div className="flex items-center space-x-3">
                  <Image
                    src={record?.patientPhoto}
                    alt={record?.patientName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-text-primary">{record?.patientName}</p>
                    <p className="text-xs text-text-secondary">ID: {record?.patientId}</p>
                  </div>
                </div>
              </div>

              {/* Record Title */}
              <div className="col-span-2">
                <p className="font-medium text-text-primary text-sm">{record?.title}</p>
                <p className="text-xs text-text-secondary">{record?.description}</p>
              </div>

              {/* Date */}
              <div className="col-span-2">
                <p className="text-sm text-text-primary">{formatDate(record?.date)}</p>
                <p className="text-xs text-text-secondary">{record?.time}</p>
              </div>

              {/* Last Modified */}
              <div className="col-span-2">
                <p className="text-sm text-text-primary">{formatDate(record?.lastModified)}</p>
                <p className="text-xs text-text-secondary">por {record?.modifiedBy}</p>
              </div>

              {/* Actions */}
              <div className="col-span-1">
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onRecordSelect(record);
                    }}
                  >
                    <Icon name="Eye" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e?.stopPropagation();
                      // Handle download
                    }}
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Record Preview */}
            {/* {record?.hasAttachments && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Paperclip" size={14} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary">
                    {record?.attachmentCount} archivo(s) adjunto(s)
                  </span>
                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>
      {/* Empty State */}
      {records?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="FileX" size={48} className="text-text-secondary mx-auto mb-4" />
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

export default RecordsList;