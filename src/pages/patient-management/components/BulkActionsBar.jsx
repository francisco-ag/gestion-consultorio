import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedCount, onClearSelection, onBulkAction }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Seleccionar acción...' },
    { value: 'export', label: 'Exportar seleccionados' },
    { value: 'schedule', label: 'Programar citas masivas' },
    { value: 'send-reminder', label: 'Enviar recordatorios' },
    { value: 'update-status', label: 'Actualizar estado' },
    { value: 'assign-doctor', label: 'Asignar médico' },
    { value: 'archive', label: 'Archivar pacientes' },
    { value: 'delete', label: 'Eliminar seleccionados' }
  ];

  const handleBulkAction = async () => {
    if (!selectedAction) return;
    
    setIsProcessing(true);
    try {
      await onBulkAction(selectedAction);
      setSelectedAction('');
    } catch (error) {
      console.error('Error executing bulk action:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    const iconMap = {
      'export': 'Download',
      'schedule': 'Calendar',
      'send-reminder': 'Bell',
      'update-status': 'RefreshCw',
      'assign-doctor': 'UserCheck',
      'archive': 'Archive',
      'delete': 'Trash2'
    };
    return iconMap?.[action] || 'Settings';
  };

  const getActionColor = (action) => {
    const colorMap = {
      'export': 'default',
      'schedule': 'default',
      'send-reminder': 'default',
      'update-status': 'default',
      'assign-doctor': 'default',
      'archive': 'warning',
      'delete': 'destructive'
    };
    return colorMap?.[action] || 'default';
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-1100">
      <div className="bg-card border border-border rounded-lg shadow-medical-lg p-4 min-w-96">
        <div className="flex items-center justify-between space-x-4">
          {/* Selection Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {selectedCount} paciente{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-text-secondary">
                Elige una acción para aplicar a la selección
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Seleccionar acción..."
              className="min-w-48"
            />
            
            <Button
              variant={getActionColor(selectedAction)}
              onClick={handleBulkAction}
              disabled={!selectedAction || isProcessing}
              loading={isProcessing}
              iconName={selectedAction ? getActionIcon(selectedAction) : undefined}
              iconPosition="left"
            >
              {isProcessing ? 'Procesando...' : 'Aplicar'}
            </Button>
            
            <Button
              variant="ghost"
              onClick={onClearSelection}
              iconName="X"
              iconPosition="left"
            >
              Cancelar
            </Button>
          </div>
        </div>

        {/* Action Preview */}
        {selectedAction && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="Info" size={14} />
              <span>
                {selectedAction === 'export' && `Se exportarán ${selectedCount} registros de pacientes`}
                {selectedAction === 'schedule' && `Se abrirá el programador de citas para ${selectedCount} pacientes`}
                {selectedAction === 'send-reminder' && `Se enviarán recordatorios a ${selectedCount} pacientes`}
                {selectedAction === 'update-status' && `Se actualizará el estado de ${selectedCount} pacientes`}
                {selectedAction === 'assign-doctor' && `Se asignará un médico a ${selectedCount} pacientes`}
                {selectedAction === 'archive' && `Se archivarán ${selectedCount} pacientes`}
                {selectedAction === 'delete' && `Se eliminarán permanentemente ${selectedCount} pacientes`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActionsBar;