import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConsultationForm = ({ onSave, onAutoSave }) => {
  const [formData, setFormData] = useState({
    chiefComplaint: '',
    currentIllness: '',
    physicalExamination: '',
    vitalSigns: {
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      weight: '',
      height: ''
    },
    diagnosis: '',
    treatmentPlan: '',
    prescriptions: '',
    followUpInstructions: '',
    nextAppointment: '',
    consultationNotes: ''
  });

  const [isListening, setIsListening] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  const templates = [
    {
      id: 'general',
      name: 'Consulta General',
      template: `Motivo de consulta: \n\nEnfermedad actual: \n\nExploración física: \n- Aspecto general: \n- Signos vitales: \n- Exploración por sistemas: \n\nDiagnóstico: \n\nPlan de tratamiento: \n\nIndicaciones: `
    },
    {
      id: 'followup',
      name: 'Consulta de Seguimiento',
      template: `Seguimiento de: \n\nEvolución desde última consulta: \n\nCumplimiento del tratamiento: \n\nNuevos síntomas: \n\nExploración física: \n\nAjustes al tratamiento: \n\nPróxima cita: `
    },
    {
      id: 'preventive',
      name: 'Consulta Preventiva',
      template: `Revisión preventiva: \n\nAntecedentes familiares: \n\nHábitos de vida: \n\nExploración física: \n\nPruebas de cribado: \n\nRecomendaciones: \n\nPróxima revisión: `
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (formData?.chiefComplaint || formData?.currentIllness || formData?.diagnosis) {
        onAutoSave && onAutoSave(formData);
        setLastSaved(new Date());
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [formData, onAutoSave]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVitalSignChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      vitalSigns: {
        ...prev?.vitalSigns,
        [field]: value
      }
    }));
  };

  const handleTemplateSelect = (templateId) => {
    const template = templates?.find(t => t?.id === templateId);
    if (template) {
      setFormData(prev => ({
        ...prev,
        consultationNotes: template?.template
      }));
      setSelectedTemplate(templateId);
    }
  };

  const toggleVoiceRecording = () => {
    setIsListening(!isListening);
    // Voice-to-text implementation would go here
    if (!isListening) {
      console.log('Starting voice recording...');
    } else {
      console.log('Stopping voice recording...');
    }
  };

  const handleSave = () => {
    onSave && onSave(formData);
    setLastSaved(new Date());
  };

  const formatLastSaved = (date) => {
    if (!date) return '';
    return date?.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical ">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="FileText" size={20} className="mr-2" />
            Consulta Médica
          </h3>
          <div className="flex items-center space-x-3">
            {lastSaved && (
              <span className="text-xs text-text-secondary">
                Guardado: {formatLastSaved(lastSaved)}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleVoiceRecording}
              className={isListening ? 'bg-error/10 text-error' : ''}
            >
              {/* <Icon name={isListening ? "MicOff" : "Mic"} size={16} /> */}
              {/* <span className="ml-1">
                {isListening ? 'Detener' : 'Dictar'}
              </span> */}
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-6 overflow-y-auto ]">
        {/* Template Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Plantilla de Consulta
          </label>
          <div className="flex flex-wrap gap-2">
            {templates?.map((template) => (
              <Button
                key={template?.id}
                variant={selectedTemplate === template?.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleTemplateSelect(template?.id)}
              >
                {template?.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Chief Complaint */}
        <div>
          <Input
            label="Motivo de Consulta"
            type="text"
            placeholder="Describa el motivo principal de la consulta..."
            value={formData?.chiefComplaint}
            onChange={(e) => handleInputChange('chiefComplaint', e?.target?.value)}
            required
          />
        </div>

        {/* Current Illness */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Enfermedad Actual
          </label>
          <textarea
            className="w-full h-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            placeholder="Describa la historia de la enfermedad actual, síntomas, duración, factores agravantes y atenuantes..."
            value={formData?.currentIllness}
            onChange={(e) => handleInputChange('currentIllness', e?.target?.value)}
          />
        </div>

        {/* Vital Signs */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Activity" size={16} className="mr-2 text-primary" />
            Signos Vitales
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Temperatura (°C)"
              type="number"
              placeholder="36.5"
              value={formData?.vitalSigns?.temperature}
              onChange={(e) => handleVitalSignChange('temperature', e?.target?.value)}
            />
            <Input
              label="Presión Arterial"
              type="text"
              placeholder="120/80"
              value={formData?.vitalSigns?.bloodPressure}
              onChange={(e) => handleVitalSignChange('bloodPressure', e?.target?.value)}
            />
            <Input
              label="Frecuencia Cardíaca"
              type="number"
              placeholder="72"
              value={formData?.vitalSigns?.heartRate}
              onChange={(e) => handleVitalSignChange('heartRate', e?.target?.value)}
            />
            <Input
              label="Frecuencia Respiratoria"
              type="number"
              placeholder="16"
              value={formData?.vitalSigns?.respiratoryRate}
              onChange={(e) => handleVitalSignChange('respiratoryRate', e?.target?.value)}
            />
            <Input
              label="Saturación O₂ (%)"
              type="number"
              placeholder="98"
              value={formData?.vitalSigns?.oxygenSaturation}
              onChange={(e) => handleVitalSignChange('oxygenSaturation', e?.target?.value)}
            />
            <Input
              label="Peso (kg)"
              type="number"
              placeholder="70.5"
              value={formData?.vitalSigns?.weight}
              onChange={(e) => handleVitalSignChange('weight', e?.target?.value)}
            />
          </div>
        </div>

        {/* Physical Examination */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Exploración Física
          </label>
          <textarea
            className="w-full h-32 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            placeholder="Describa los hallazgos de la exploración física por sistemas..."
            value={formData?.physicalExamination}
            onChange={(e) => handleInputChange('physicalExamination', e?.target?.value)}
          />
        </div>

        {/* Diagnosis */}
        <div>
          <Input
            label="Diagnóstico"
            type="text"
            placeholder="Diagnóstico principal y secundarios..."
            value={formData?.diagnosis}
            onChange={(e) => handleInputChange('diagnosis', e?.target?.value)}
            required
          />
        </div>

        {/* Treatment Plan */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Plan de Tratamiento
          </label>
          <textarea
            className="w-full h-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            placeholder="Describa el plan de tratamiento, medicamentos, procedimientos..."
            value={formData?.treatmentPlan}
            onChange={(e) => handleInputChange('treatmentPlan', e?.target?.value)}
          />
        </div>

        {/* Follow-up Instructions */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Instrucciones de Seguimiento
          </label>
          <textarea
            className="w-full h-20 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            placeholder="Instrucciones para el paciente, cuidados en casa, signos de alarma..."
            value={formData?.followUpInstructions}
            onChange={(e) => handleInputChange('followUpInstructions', e?.target?.value)}
          />
        </div>

        {/* Consultation Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Notas Adicionales
          </label>
          <textarea
            className="w-full h-32 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm font-mono"
            placeholder="Notas adicionales de la consulta..."
            value={formData?.consultationNotes}
            onChange={(e) => handleInputChange('consultationNotes', e?.target?.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Checkbox
              label="Marcar como consulta completada"
              checked
              onChange={() => {}}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Icon name="Save" size={16} />
              <span className="ml-1">Guardar Borrador</span>
            </Button>
            <Button onClick={handleSave}>
              <Icon name="Check" size={16} />
              <span className="ml-1">Finalizar Consulta</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;