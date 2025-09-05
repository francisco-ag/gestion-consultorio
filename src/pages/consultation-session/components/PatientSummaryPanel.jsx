import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientSummaryPanel = ({ patient }) => {
  const currentMedications = [
    {
      id: 1,
      name: "Metformina",
      dosage: "500mg",
      frequency: "2 veces al día",
      startDate: "2024-01-15",
      indication: "Diabetes tipo 2"
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "1 vez al día",
      startDate: "2024-02-20",
      indication: "Hipertensión"
    },
    {
      id: 3,
      name: "Atorvastatina",
      dosage: "20mg",
      frequency: "1 vez al día por la noche",
      startDate: "2024-03-10",
      indication: "Colesterol alto"
    }
  ];

  const allergies = [
    { name: "Penicilina", severity: "Grave", reaction: "Anafilaxia" },
    { name: "Mariscos", severity: "Moderada", reaction: "Urticaria" },
    { name: "Ibuprofeno", severity: "Leve", reaction: "Náuseas" }
  ];

  const recentHistory = [
    {
      date: "2024-08-15",
      type: "Consulta",
      diagnosis: "Control rutinario diabetes",
      doctor: "Dr. García"
    },
    {
      date: "2024-07-20",
      type: "Análisis",
      diagnosis: "Hemoglobina glicosilada: 7.2%",
      doctor: "Laboratorio"
    },
    {
      date: "2024-06-10",
      type: "Consulta",
      diagnosis: "Ajuste medicación hipertensión",
      doctor: "Dr. García"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical h-full">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="User" size={20} className="mr-2" />
          Resumen del Paciente
        </h3>
      </div>
      <div className="p-4 space-y-6 overflow-y-auto ">
        {/* Current Medications */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Pill" size={16} className="mr-2 text-primary" />
            Medicamentos Actuales
          </h4>
          <div className="space-y-3">
            {currentMedications?.map((medication) => (
              <div key={medication?.id} className="bg-muted rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-text-primary text-sm">
                      {medication?.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {medication?.dosage} - {medication?.frequency}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      Desde: {medication?.startDate}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                    Activo
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-2 italic">
                  {medication?.indication}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
            Alergias
          </h4>
          <div className="space-y-2">
            {allergies?.map((allergy, index) => (
              <div key={index} className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-warning text-sm">
                    {allergy?.name}
                  </p>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    allergy?.severity === 'Grave' ? 'bg-error text-error-foreground' :
                    allergy?.severity === 'Moderada' ? 'bg-warning text-warning-foreground' :
                    'bg-muted text-text-secondary'
                  }`}>
                    {allergy?.severity}
                  </span>
                </div>
                <p className="text-xs text-warning mt-1">
                  Reacción: {allergy?.reaction}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent History */}
        {/* <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="Clock" size={16} className="mr-2 text-secondary" />
            Historial Reciente
          </h4>
          <div className="space-y-3">
            {recentHistory?.map((entry, index) => (
              <div key={index} className="border-l-2 border-primary/30 pl-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-secondary">
                    {entry?.date}
                  </p>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    entry?.type === 'Consulta' ? 'bg-primary/10 text-primary' :
                    entry?.type === 'Análisis'? 'bg-accent/10 text-accent' : 'bg-muted text-text-secondary'
                  }`}>
                    {entry?.type}
                  </span>
                </div>
                <p className="text-sm text-text-primary font-medium mt-1">
                  {entry?.diagnosis}
                </p>
                <p className="text-xs text-text-secondary">
                  {entry?.doctor}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Quick Stats */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
            <Icon name="BarChart3" size={16} className="mr-2 text-accent" />
            Estadísticas 
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-lg font-semibold text-primary">12</p>
              <p className="text-xs text-text-secondary">Consultas este año</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-lg font-semibold text-accent">3</p>
              <p className="text-xs text-text-secondary">Medicamentos activos</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-lg font-semibold text-warning">3</p>
              <p className="text-xs text-text-secondary">Alergias conocidas</p>
            </div>
            {/* <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-lg font-semibold text-success">98%</p>
              <p className="text-xs text-text-secondary">Adherencia</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSummaryPanel;