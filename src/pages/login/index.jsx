import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import MedicalBackground from './components/MedicalBackground';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      const session = JSON.parse(userSession);
      const loginTime = new Date(session.loginTime);
      const currentTime = new Date();
      const timeDifference = (currentTime - loginTime) / (1000 * 60 * 60); // hours

      // If session is less than 8 hours old, redirect to dashboard
      if (timeDifference < 8) {
        navigate('/patient-management');
      } else {
        // Clear expired session
        localStorage.removeItem('userSession');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <LoginHeader />
          <LoginForm />
          <SecurityBadges />
          
          {/* Footer */}
          <footer className="mt-12 text-center">
            <div className="flex flex-col space-y-2 text-xs text-text-secondary">
              <div className="flex justify-center space-x-4">
                <a href="#" className="hover:text-text-primary transition-medical">
                  Política de Privacidad
                </a>
                <span>•</span>
                <a href="#" className="hover:text-text-primary transition-medical">
                  Términos de Uso
                </a>
                <span>•</span>
                <a href="#" className="hover:text-text-primary transition-medical">
                  Soporte Técnico
                </a>
              </div>
              <p>
                © {new Date()?.getFullYear()} MediConsult Manager. 
                Todos los derechos reservados.
              </p>
              <p className="text-xs text-text-secondary/80">
                Versión 2.1.0 • Última actualización: 29 de agosto de 2024
              </p>
            </div>
          </footer>
        </div>
      </div>
      {/* Right Side - Medical Background */}
      <MedicalBackground />
    </div>
  );
};

export default Login;