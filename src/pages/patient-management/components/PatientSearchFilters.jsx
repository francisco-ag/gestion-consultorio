import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PatientSearchFilters = ({ onFiltersChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    name: '',
    // patientId: '',
    ageRange: '',
    lastVisitDate: '',
    medicalCondition: '',
    bloodType: '',
    gender: '',
    // insuranceStatus: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const ageRangeOptions = [
    { value: '', label: 'Todas las edades' },
    { value: '0-17', label: '0-17 años' },
    { value: '18-35', label: '18-35 años' },
    { value: '36-50', label: '36-50 años' },
    { value: '51-65', label: '51-65 años' },
    { value: '65+', label: '65+ años' }
  ];

  const bloodTypeOptions = [
    { value: '', label: 'Todos los tipos' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const genderOptions = [
    { value: '', label: 'Todos los géneros' },
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Femenino', label: 'Femenino' },
    { value: 'Otro', label: 'Otro' }
  ];

  const insuranceStatusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'Activo', label: 'Seguro Activo' },
    { value: 'Vencido', label: 'Seguro Vencido' },
    { value: 'Sin seguro', label: 'Sin Seguro' }
  ];

  const medicalConditionOptions = [
    { value: '', label: 'Todas las condiciones' },
    { value: 'Diabetes', label: 'Diabetes' },
    { value: 'Hipertensión', label: 'Hipertensión' },
    { value: 'Asma', label: 'Asma' },
    { value: 'Cardiopatía', label: 'Cardiopatía' },
    { value: 'Artritis', label: 'Artritis' },
    { value: 'Alergias', label: 'Alergias' }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      name: '',
      // patientId: '',
      ageRange: '',
      lastVisitDate: '',
      medicalCondition: '',
      bloodType: '',
      gender: '',
      // insuranceStatus: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Filter" size={20} className="mr-2" />
            Filtros de Búsqueda
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      <div className={`p-4 space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Basic Filters */}
        <div className="space-y-4">
          <Input
            label="Nombre del Paciente"
            type="text"
            placeholder="Buscar por nombre..."
            value={filters?.name}
            onChange={(e) => handleFilterChange('name', e?.target?.value)}
          />

          {/* <Input
            label="ID del Paciente"
            type="text"
            placeholder="P-2024-001"
            value={filters?.patientId}
            onChange={(e) => handleFilterChange('patientId', e?.target?.value)}
          /> */}

          <Select
            label="Rango de Edad"
            options={ageRangeOptions}
            value={filters?.ageRange}
            onChange={(value) => handleFilterChange('ageRange', value)}
          />

          <Input
            label="Última Visita"
            type="date"
            value={filters?.lastVisitDate}
            onChange={(e) => handleFilterChange('lastVisitDate', e?.target?.value)}
          />
        </div>

        {/* Advanced Filters */}
        <div className="pt-4 border-t border-border space-y-4">
          <h4 className="text-sm font-medium text-text-primary">Filtros Avanzados</h4>
          
          <Select
            label="Condición Médica"
            options={medicalConditionOptions}
            value={filters?.medicalCondition}
            onChange={(value) => handleFilterChange('medicalCondition', value)}
            searchable
          />

          <Select
            label="Tipo de Sangre"
            options={bloodTypeOptions}
            value={filters?.bloodType}
            onChange={(value) => handleFilterChange('bloodType', value)}
          />

          <Select
            label="Género"
            options={genderOptions}
            value={filters?.gender}
            onChange={(value) => handleFilterChange('gender', value)}
          />

          {/* <Select
            label="Estado del Seguro"
            options={insuranceStatusOptions}
            value={filters?.insuranceStatus}
            onChange={(value) => handleFilterChange('insuranceStatus', value)}
          /> */}
        </div>

        {/* Filter Actions */}
        <div className="pt-4 border-t border-border">
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
              iconName="X"
              iconPosition="left"
              fullWidth
            >
              Limpiar Filtros
            </Button>
            
            {hasActiveFilters && (
              <div className="text-xs text-text-secondary text-center">
                {Object.values(filters)?.filter(v => v !== '')?.length} filtro(s) activo(s)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSearchFilters;