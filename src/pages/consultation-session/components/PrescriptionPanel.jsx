import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PrescriptionPanel = ({ onPrescriptionAdd }) => {
  const [currentPrescription, setCurrentPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    quantity: ''
  });

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      medication: 'Amoxicilina',
      dosage: '500mg',
      frequency: 'Cada 8 horas',
      duration: '7 días',
      instructions: 'Tomar con alimentos',
      quantity: '21 cápsulas',
      timestamp: '2024-08-29 19:00'
    }
  ]);

  const [commonMedications] = useState([
    { name: 'Paracetamol', dosage: '500mg', frequency: 'Cada 6-8 horas' },
    { name: 'Ibuprofeno', dosage: '400mg', frequency: 'Cada 8 horas' },
    { name: 'Amoxicilina', dosage: '500mg', frequency: 'Cada 8 horas' },
    { name: 'Omeprazol', dosage: '20mg', frequency: '1 vez al día' },
    { name: 'Metformina', dosage: '850mg', frequency: '2 veces al día' },
    { name: 'Losartán', dosage: '50mg', frequency: '1 vez al día' }
  ]);

  const [followUpAppointment, setFollowUpAppointment] = useState({
    date: '',
    time: '',
    type: 'control',
    notes: ''
  });

  const handleInputChange = (field, value) => {
    setCurrentPrescription(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMedicationSelect = (medication) => {
    setCurrentPrescription(prev => ({
      ...prev,
      medication: medication?.name,
      dosage: medication?.dosage,
      frequency: medication?.frequency
    }));
  };

  const handleAddPrescription = () => {
    if (currentPrescription?.medication && currentPrescription?.dosage) {
      const newPrescription = {
        id: prescriptions?.length + 1,
        ...currentPrescription,
        timestamp: new Date()?.toLocaleString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setPrescriptions(prev => [...prev, newPrescription]);
      onPrescriptionAdd && onPrescriptionAdd(newPrescription);

      // Reset form
      setCurrentPrescription({
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        quantity: ''
      });
    }
  };

  const handleRemovePrescription = (id) => {
    setPrescriptions(prev => prev?.filter(p => p?.id !== id));
  };

  const handleScheduleFollowUp = () => {
    if (followUpAppointment?.date && followUpAppointment?.time) {
      console.log('Scheduling follow-up appointment:', followUpAppointment);
      // Reset form
      setFollowUpAppointment({
        date: '',
        time: '',
        type: 'control',
        notes: ''
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical h-full">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Pill" size={20} className="mr-2" />
          Receta Médica
        </h3>
      </div>
      <div className="p-4 space-y-6 overflow-y-auto ">
        {/* Quick Medication Selection */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">
            Medicamentos Comunes
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {commonMedications?.map((medication, index) => (
              <button
                key={index}
                onClick={() => handleMedicationSelect(medication)}
                className="text-left p-2 rounded-lg border border-border hover:bg-muted transition-medical"
              >
                <p className="text-sm font-medium text-text-primary">
                  {medication?.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {medication?.dosage} - {medication?.frequency}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* New Prescription Form */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">
            Nueva Prescripción
          </h4>
          <div className="space-y-3">
            <Input
              label="Medicamento"
              type="text"
              placeholder="Nombre del medicamento"
              value={currentPrescription?.medication}
              onChange={(e) => handleInputChange('medication', e?.target?.value)}
              required
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Dosis"
                type="text"
                placeholder="500mg"
                value={currentPrescription?.dosage}
                onChange={(e) => handleInputChange('dosage', e?.target?.value)}
              />
              <Input
                label="Frecuencia"
                type="text"
                placeholder="Cada 8 horas"
                value={currentPrescription?.frequency}
                onChange={(e) => handleInputChange('frequency', e?.target?.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Duración"
                type="text"
                placeholder="7 días"
                value={currentPrescription?.duration}
                onChange={(e) => handleInputChange('duration', e?.target?.value)}
              />
              <Input
                label="Cantidad"
                type="text"
                placeholder="21 cápsulas"
                value={currentPrescription?.quantity}
                onChange={(e) => handleInputChange('quantity', e?.target?.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Instrucciones Especiales
              </label>
              <textarea
                className="w-full h-16 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="Instrucciones adicionales para el paciente..."
                value={currentPrescription?.instructions}
                onChange={(e) => handleInputChange('instructions', e?.target?.value)}
              />
            </div>
          </div>
          
          <Button
            onClick={handleAddPrescription}
            className="w-full mt-4"
            disabled={!currentPrescription?.medication || !currentPrescription?.dosage}
          >
            <Icon name="Plus" size={16} />
            <span className="ml-1">Agregar a Receta</span>
          </Button>
        </div>

        {/* Current Prescriptions */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="FileText" size={16} className="mr-2" />
            Prescripciones Actuales
          </h4>
          <div className="space-y-3">
            {prescriptions?.map((prescription) => (
              <div key={prescription?.id} className="bg-muted rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-text-primary text-sm">
                      {prescription?.medication}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {prescription?.dosage} - {prescription?.frequency}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Duración: {prescription?.duration} | Cantidad: {prescription?.quantity}
                    </p>
                    {prescription?.instructions && (
                      <p className="text-xs text-text-secondary mt-1 italic">
                        {prescription?.instructions}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleRemovePrescription(prescription?.id)}
                    className="text-error hover:bg-error/10"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up Appointment */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Calendar" size={16} className="mr-2" />
            Cita de Seguimiento
          </h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Fecha"
                type="date"
                value={followUpAppointment?.date}
                onChange={(e) => setFollowUpAppointment(prev => ({
                  ...prev,
                  date: e?.target?.value
                }))}
              />
              <Input
                label="Hora"
                type="time"
                value={followUpAppointment?.time}
                onChange={(e) => setFollowUpAppointment(prev => ({
                  ...prev,
                  time: e?.target?.value
                }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tipo de Cita
              </label>
              <div className="flex space-x-2">
                {['control', 'revision', 'urgente']?.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFollowUpAppointment(prev => ({
                      ...prev,
                      type
                    }))}
                    className={`px-3 py-1 rounded text-xs font-medium transition-medical ${
                      followUpAppointment?.type === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-text-secondary hover:bg-primary/10'
                    }`}
                  >
                    {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Notas para la Cita
              </label>
              <textarea
                className="w-full h-16 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="Motivo de la cita de seguimiento..."
                value={followUpAppointment?.notes}
                onChange={(e) => setFollowUpAppointment(prev => ({
                  ...prev,
                  notes: e?.target?.value
                }))}
              />
            </div>
          </div>
          
          <Button
            onClick={handleScheduleFollowUp}
            variant="outline"
            className="w-full mt-4"
            disabled={!followUpAppointment?.date || !followUpAppointment?.time}
          >
            <Icon name="Calendar" size={16} />
            <span className="ml-1">Programar Cita</span>
          </Button>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">
            Acciones
          </h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Icon name="Printer" size={16} className="mr-2" />
              Imprimir Receta
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Icon name="Send" size={16} className="mr-2" />
              Enviar por Email
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Icon name="Save" size={16} className="mr-2" />
              Guardar Plantilla
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPanel;