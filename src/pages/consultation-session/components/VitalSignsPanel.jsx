import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VitalSignsPanel = ({ onVitalSignsUpdate }) => {
  const [vitalSigns, setVitalSigns] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    bmi: '',
    painScale: ''
  });

  const [measurements, setMeasurements] = useState([
    {
      id: 1,
      timestamp: '2024-08-29 19:00',
      temperature: '36.8',
      bloodPressure: '125/82',
      heartRate: '78',
      respiratoryRate: '16',
      oxygenSaturation: '98'
    },
    {
      id: 2,
      timestamp: '2024-08-29 18:45',
      temperature: '36.9',
      bloodPressure: '128/85',
      heartRate: '82',
      respiratoryRate: '18',
      oxygenSaturation: '97'
    }
  ]);

  const handleInputChange = (field, value) => {
    setVitalSigns(prev => {
      const updated = { ...prev, [field]: value };
      
      // Calculate BMI if weight and height are available
      if (field === 'weight' || field === 'height') {
        const weight = parseFloat(updated?.weight);
        const height = parseFloat(updated?.height) / 100; // Convert cm to m
        if (weight && height) {
          updated.bmi = (weight / (height * height))?.toFixed(1);
        }
      }
      
      return updated;
    });
  };

  const handleSaveVitalSigns = () => {
    const newMeasurement = {
      id: measurements?.length + 1,
      timestamp: new Date()?.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      ...vitalSigns
    };

    setMeasurements(prev => [newMeasurement, ...prev]);
    onVitalSignsUpdate && onVitalSignsUpdate(vitalSigns);
    
    // Reset form
    setVitalSigns({
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      weight: '',
      height: '',
      bmi: '',
      painScale: ''
    });
  };

  const getVitalSignStatus = (type, value) => {
    const ranges = {
      temperature: { normal: [36.1, 37.2], low: [35, 36.0], high: [37.3, 42] },
      heartRate: { normal: [60, 100], low: [40, 59], high: [101, 180] },
      respiratoryRate: { normal: [12, 20], low: [8, 11], high: [21, 30] },
      oxygenSaturation: { normal: [95, 100], low: [90, 94], high: [100, 100] }
    };

    const numValue = parseFloat(value);
    const range = ranges?.[type];
    
    if (!range || !numValue) return 'normal';
    
    if (numValue >= range?.normal?.[0] && numValue <= range?.normal?.[1]) return 'normal';
    if (numValue < range?.normal?.[0]) return 'low';
    if (numValue > range?.normal?.[1]) return 'high';
    
    return 'normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return 'text-error';
      case 'low': return 'text-warning';
      default: return 'text-success';
    }
  };

  const getBMICategory = (bmi) => {
    const numBMI = parseFloat(bmi);
    if (numBMI < 18.5) return { category: 'Bajo peso', color: 'text-warning' };
    if (numBMI < 25) return { category: 'Normal', color: 'text-success' };
    if (numBMI < 30) return { category: 'Sobrepeso', color: 'text-warning' };
    return { category: 'Obesidad', color: 'text-error' };
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical h-full">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Activity" size={20} className="mr-2" />
          Signos Vitales
        </h3>
      </div>
      <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Current Measurements Input */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">
            Mediciones Actuales
          </h4>
          <div className="space-y-3">
            <Input
              label="Temperatura (°C)"
              type="number"
              step="0.1"
              placeholder="36.5"
              value={vitalSigns?.temperature}
              onChange={(e) => handleInputChange('temperature', e?.target?.value)}
            />
            
            <Input
              label="Presión Arterial"
              type="text"
              placeholder="120/80"
              value={vitalSigns?.bloodPressure}
              onChange={(e) => handleInputChange('bloodPressure', e?.target?.value)}
            />
            
            <Input
              label="Frecuencia Cardíaca (lpm)"
              type="number"
              placeholder="72"
              value={vitalSigns?.heartRate}
              onChange={(e) => handleInputChange('heartRate', e?.target?.value)}
            />
            
            <Input
              label="Frecuencia Respiratoria (rpm)"
              type="number"
              placeholder="16"
              value={vitalSigns?.respiratoryRate}
              onChange={(e) => handleInputChange('respiratoryRate', e?.target?.value)}
            />
            
            <Input
              label="Saturación O₂ (%)"
              type="number"
              placeholder="98"
              value={vitalSigns?.oxygenSaturation}
              onChange={(e) => handleInputChange('oxygenSaturation', e?.target?.value)}
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Peso (kg)"
                type="number"
                step="0.1"
                placeholder="70.5"
                value={vitalSigns?.weight}
                onChange={(e) => handleInputChange('weight', e?.target?.value)}
              />
              <Input
                label="Altura (cm)"
                type="number"
                placeholder="170"
                value={vitalSigns?.height}
                onChange={(e) => handleInputChange('height', e?.target?.value)}
              />
            </div>
            
            {vitalSigns?.bmi && (
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">IMC</span>
                  <span className="text-lg font-semibold text-text-primary">
                    {vitalSigns?.bmi}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${getBMICategory(vitalSigns?.bmi)?.color}`}>
                  {getBMICategory(vitalSigns?.bmi)?.category}
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Escala de Dolor (0-10)
              </label>
              <div className="flex items-center space-x-2">
                {[...Array(11)]?.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleInputChange('painScale', i?.toString())}
                    className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-medical ${
                      vitalSigns?.painScale === i?.toString()
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-text-secondary hover:border-primary'
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>Sin dolor</span>
                <span>Dolor severo</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleSaveVitalSigns}
            className="w-full mt-4"
            disabled={!vitalSigns?.temperature && !vitalSigns?.bloodPressure && !vitalSigns?.heartRate}
          >
            <Icon name="Plus" size={16} />
            <span className="ml-1">Registrar Medición</span>
          </Button>
        </div>

        {/* Recent Measurements */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Clock" size={16} className="mr-2" />
            Mediciones Recientes
          </h4>
          <div className="space-y-3">
            {measurements?.map((measurement) => (
              <div key={measurement?.id} className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">
                    {measurement?.timestamp}
                  </span>
                  <Button variant="ghost" size="xs">
                    <Icon name="MoreHorizontal" size={14} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {measurement?.temperature && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Temp:</span>
                      <span className={`font-medium ${getStatusColor(getVitalSignStatus('temperature', measurement?.temperature))}`}>
                        {measurement?.temperature}°C
                      </span>
                    </div>
                  )}
                  
                  {measurement?.bloodPressure && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">PA:</span>
                      <span className="font-medium text-text-primary">
                        {measurement?.bloodPressure}
                      </span>
                    </div>
                  )}
                  
                  {measurement?.heartRate && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">FC:</span>
                      <span className={`font-medium ${getStatusColor(getVitalSignStatus('heartRate', measurement?.heartRate))}`}>
                        {measurement?.heartRate} lpm
                      </span>
                    </div>
                  )}
                  
                  {measurement?.oxygenSaturation && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">SpO₂:</span>
                      <span className={`font-medium ${getStatusColor(getVitalSignStatus('oxygenSaturation', measurement?.oxygenSaturation))}`}>
                        {measurement?.oxygenSaturation}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">
            Acciones Rápidas
          </h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Ver Tendencias
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Icon name="Download" size={16} className="mr-2" />
              Exportar Datos
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Icon name="Bell" size={16} className="mr-2" />
              Configurar Alertas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitalSignsPanel;