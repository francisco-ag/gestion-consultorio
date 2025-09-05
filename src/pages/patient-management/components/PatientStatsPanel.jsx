import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientStatsPanel = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Pacientes',
      value: stats?.totalPatients,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Pacientes Activos',
      value: stats?.activePatients,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Nuevos Este Mes',
      value: stats?.newThisMonth,
      icon: 'UserPlus',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+24%',
      changeType: 'increase'
    },
    {
      title: 'Citas Pendientes',
      value: stats?.pendingAppointments,
      icon: 'Calendar',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '-5%',
      changeType: 'decrease'
    }
  ];

  const recentPatients = [
    {
      id: 'P-2024-156',
      name: 'Carmen López',
      time: 'Hace 15 min',
      action: 'Registro nuevo',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    {
      id: 'P-2024-155',
      name: 'Miguel Santos',
      time: 'Hace 1 hora',
      action: 'Actualización',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 'P-2024-154',
      name: 'Elena Ruiz',
      time: 'Hace 2 horas',
      action: 'Consulta completada',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    {
      id: 'P-2024-153',
      name: 'José Martín',
      time: 'Hace 3 horas',
      action: 'Cita programada',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    }
  ];

  const getChangeIcon = (changeType) => {
    return changeType === 'increase' ? 'TrendingUp' : 'TrendingDown';
  };

  const getChangeColor = (changeType) => {
    return changeType === 'increase' ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      {/* <div className="bg-card border border-border rounded-lg shadow-medical p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Estadísticas
        </h3>
        
        <div className="space-y-4">
          {statCards?.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                  <Icon name={stat?.icon} size={20} className={stat?.color} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {stat?.value}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {stat?.title}
                  </p>
                </div>
              </div>
              <div className={`flex items-center text-xs ${getChangeColor(stat?.changeType)}`}>
                <Icon name={getChangeIcon(stat?.changeType)} size={12} className="mr-1" />
                {stat?.change}
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Recent Activity */}
      {/* <div className="bg-card border border-border rounded-lg shadow-medical p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Clock" size={20} className="mr-2" />
          Actividad Reciente
        </h3>
        
        <div className="space-y-3">
          {recentPatients?.map((patient, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-medical cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-medium">
                {patient?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {patient?.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {patient?.action}
                </p>
              </div>
              <div className="text-xs text-text-secondary">
                {patient?.time}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 transition-medical">
            Ver toda la actividad
          </button>
        </div>
      </div> */}
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg shadow-medical p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Acciones Rápidas
        </h3>
        
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-medical text-left">
            <div className="flex items-center space-x-3">
              <Icon name="UserPlus" size={16} className="text-primary" />
              <span className="text-sm text-text-primary">Nuevo Paciente</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-medical text-left">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} className="text-success" />
              <span className="text-sm text-text-primary">Programar Cita</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-medical text-left">
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={16} className="text-accent" />
              <span className="text-sm text-text-primary">Generar Reporte</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-medical text-left">
            <div className="flex items-center space-x-3">
              <Icon name="Download" size={16} className="text-warning" />
              <span className="text-sm text-text-primary">Exportar Datos</span>
            </div>
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientStatsPanel;