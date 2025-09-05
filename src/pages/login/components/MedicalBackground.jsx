import React from 'react';
import Image from '../../../components/AppImage';

const MedicalBackground = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Profesionales médicos trabajando en consulta moderna"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center px-12 text-white">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-6">
            Gestión Médica Profesional
          </h2>
          
          <p className="text-lg mb-8 text-white/90">
            Plataforma integral para la administración de consultas médicas, 
            historiales clínicos y gestión de pacientes con los más altos 
            estándares de seguridad.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-white/90">Gestión completa de pacientes</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-white/90">Programación inteligente de citas</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-white/90">Historiales médicos seguros</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
              <span className="text-white/90">Cumplimiento HIPAA garantizado</span>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-white/80">Clínicas Activas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-white/80">Pacientes Gestionados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalBackground;