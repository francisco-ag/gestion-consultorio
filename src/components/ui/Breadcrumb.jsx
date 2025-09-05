import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null, className = '' }) => {
  const location = useLocation();

  const routeMap = {
    '/patient-management': 'Gestión de Pacientes',
    '/patient-profile': 'Perfil del Paciente',
    '/appointment-scheduling': 'Programación de Citas',
    '/consultation-session': 'Sesión de Consulta',
    '/medical-records-archive': 'Archivo de Registros Médicos',
    '/login': 'Iniciar Sesión'
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [
      { name: 'Inicio', path: '/patient-management', isHome: true }
    ];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeName = routeMap?.[currentPath];
      
      if (routeName) {
        breadcrumbs?.push({
          name: routeName,
          path: currentPath,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-secondary mx-2" 
              />
            )}
            
            {item?.isLast ? (
              <span className="text-text-primary font-medium flex items-center">
                {item?.isHome && (
                  <Icon name="Home" size={16} className="mr-1" />
                )}
                {item?.name}
              </span>
            ) : (
              <Link
                to={item?.path}
                className="text-text-secondary hover:text-text-primary transition-medical flex items-center"
              >
                {item?.isHome && (
                  <Icon name="Home" size={16} className="mr-1" />
                )}
                {item?.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;