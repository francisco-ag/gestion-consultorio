import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchFilters = ({ onSearch, onReset, className = '' }) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    recordType: '',
    patientAge: '',
    gender: '',
    diagnosisCode: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const recordTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'consultation', label: 'Consultas' },
    { value: 'lab_results', label: 'Resultados de Laboratorio' },
    { value: 'imaging', label: 'Imágenes Médicas' },
    { value: 'prescriptions', label: 'Recetas' },
    { value: 'surgery', label: 'Cirugías' },
    { value: 'vaccination', label: 'Vacunaciones' },
    { value: 'emergency', label: 'Emergencias' }
  ];

  const genderOptions = [
    { value: '', label: 'Todos los géneros' },
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Femenino' },
    { value: 'other', label: 'Otro' }
  ];

  const handleInputChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onSearch(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: '',
      dateFrom: '',
      dateTo: '',
      recordType: '',
      patientAge: '',
      gender: '',
      diagnosisCode: ''
    };
    setFilters(resetFilters);
    onReset(resetFilters);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-medical ${className}`}>
      {/* Basic Search */}
      <div className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Buscar por nombre del paciente, ID o diagnóstico..."
              value={filters?.searchTerm}
              onChange={(e) => handleInputChange('searchTerm', e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={toggleExpanded}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              Filtros Avanzados
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleReset}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Rango de Fechas</label>
              <div className="space-y-2">
                <Input
                  type="date"
                  placeholder="Fecha desde"
                  value={filters?.dateFrom}
                  onChange={(e) => handleInputChange('dateFrom', e?.target?.value)}
                />
                <Input
                  type="date"
                  placeholder="Fecha hasta"
                  value={filters?.dateTo}
                  onChange={(e) => handleInputChange('dateTo', e?.target?.value)}
                />
              </div>
            </div>

            {/* Record Type */}
            <div>
              <Select
                label="Tipo de Registro"
                options={recordTypeOptions}
                value={filters?.recordType}
                onChange={(value) => handleInputChange('recordType', value)}
              />
            </div>

            {/* Patient Demographics */}
            <div className="space-y-4">
              <Input
                label="Edad del Paciente"
                type="number"
                placeholder="Ej: 25-65"
                value={filters?.patientAge}
                onChange={(e) => handleInputChange('patientAge', e?.target?.value)}
              />
              
              <Select
                label="Género"
                options={genderOptions}
                value={filters?.gender}
                onChange={(value) => handleInputChange('gender', value)}
              />
            </div>

            {/* Medical Codes */}
            <div>
              <Input
                label="Código de Diagnóstico"
                placeholder="Ej: ICD-10, CIE-10"
                value={filters?.diagnosisCode}
                onChange={(e) => handleInputChange('diagnosisCode', e?.target?.value)}
              />
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-4 pt-4 border-t border-border">
            <label className="text-sm font-medium text-text-primary mb-2 block">Filtros Rápidos</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Última semana', value: 'last_week' },
                { label: 'Último mes', value: 'last_month' },
                { label: 'Último año', value: 'last_year' },
                { label: 'Consultas urgentes', value: 'urgent' },
                { label: 'Resultados pendientes', value: 'pending' }
              ]?.map((tag) => (
                <Button
                  key={tag?.value}
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('quickFilter', tag?.value)}
                  className="text-xs"
                >
                  {tag?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;