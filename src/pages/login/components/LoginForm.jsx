import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = [
    { email: 'doctor@mediconsult.es', password: 'Doctor123!', role: 'Médico General' },
    { email: 'admin@mediconsult.es', password: 'Admin123!', role: 'Administrador' },
    { email: 'enfermera@mediconsult.es', password: 'Nurse123!', role: 'Enfermera' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const validCredential = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (validCredential) {
        // Store user session
        localStorage.setItem('userSession', JSON.stringify({
          email: validCredential?.email,
          role: validCredential?.role,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));
        
        navigate('/patient-management');
      } else {
        setErrors({
          general: `Credenciales incorrectas. Use: ${mockCredentials?.[0]?.email} / ${mockCredentials?.[0]?.password}`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Funcionalidad de recuperación de contraseña próximamente disponible');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder="doctor@mediconsult.es"
          error={errors?.email}
          required
          className="w-full"
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Ingrese su contraseña"
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-medical"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Recordarme"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-medical"
          >
            ¿Olvidó su contraseña?
          </button>
        </div>

        {/* General Error Message */}
        {errors?.general && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
        </Button>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center">
            <Icon name="Info" size={16} className="mr-2" />
            Credenciales de Demostración
          </h4>
          <div className="space-y-2 text-xs text-text-secondary">
            <div>
              <strong>Médico:</strong> doctor@mediconsult.es / Doctor123!
            </div>
            <div>
              <strong>Admin:</strong> admin@mediconsult.es / Admin123!
            </div>
            <div>
              <strong>Enfermera:</strong> enfermera@mediconsult.es / Nurse123!
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;