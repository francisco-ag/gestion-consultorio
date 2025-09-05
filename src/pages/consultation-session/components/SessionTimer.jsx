import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionTimer = ({ onSessionEnd, patientName }) => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');

  useEffect(() => {
    let interval = null;
    
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, isPaused, startTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes?.toString()?.padStart(2, '0')}:${seconds?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const startSession = () => {
    const now = Date.now();
    setStartTime(now);
    setIsRunning(true);
    setIsPaused(false);
    setElapsedTime(0);
  };

  const pauseSession = () => {
    setIsPaused(true);
  };

  const resumeSession = () => {
    setStartTime(Date.now() - elapsedTime);
    setIsPaused(false);
  };

  const endSession = () => {
    setIsRunning(false);
    setIsPaused(false);
    
    const sessionData = {
      patientName,
      startTime: new Date(startTime),
      endTime: new Date(),
      duration: elapsedTime,
      notes: sessionNotes
    };
    
    onSessionEnd && onSessionEnd(sessionData);
  };

  const getSessionStatus = () => {
    if (!isRunning) return 'stopped';
    if (isPaused) return 'paused';
    return 'running';
  };

  const getStatusColor = () => {
    const status = getSessionStatus();
    switch (status) {
      case 'running': return 'text-success';
      case 'paused': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = () => {
    const status = getSessionStatus();
    switch (status) {
      case 'running': return 'Play';
      case 'paused': return 'Pause';
      default: return 'Clock';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-medical p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-text-primary flex items-center">
          <Icon name="Clock" size={16} className="mr-2" />
          Tiempo de Consulta
        </h4>
        <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
          <Icon name={getStatusIcon()} size={16} />
          <span className="text-sm font-medium">
            {getSessionStatus() === 'running' ? 'En curso' : 
             getSessionStatus() === 'paused' ? 'Pausado' : 'Detenido'}
          </span>
        </div>
      </div>
      {/* Timer Display */}
      <div className="text-center mb-4">
        <div className="text-3xl font-mono font-bold text-text-primary mb-2">
          {formatTime(elapsedTime)}
        </div>
        {startTime && (
          <div className="text-xs text-text-secondary">
            Iniciado: {new Date(startTime)?.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        )}
      </div>
      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-2 mb-4">
        {!isRunning ? (
          <Button onClick={startSession} size="sm" className="flex-1">
            <Icon name="Play" size={16} />
            <span className="ml-1">Iniciar</span>
          </Button>
        ) : (
          <>
            {!isPaused ? (
              <Button onClick={pauseSession} variant="outline" size="sm">
                <Icon name="Pause" size={16} />
                <span className="ml-1">Pausar</span>
              </Button>
            ) : (
              <Button onClick={resumeSession} size="sm">
                <Icon name="Play" size={16} />
                <span className="ml-1">Reanudar</span>
              </Button>
            )}
            <Button onClick={endSession} variant="destructive" size="sm">
              <Icon name="Square" size={16} />
              <span className="ml-1">Finalizar</span>
            </Button>
          </>
        )}
      </div>
      {/* Session Notes */}
      {isRunning && (
        <div>
          <label className="block text-xs font-medium text-text-primary mb-2">
            Notas de Tiempo
          </label>
          <textarea
            className="w-full h-16 px-2 py-1 border border-border rounded text-xs resize-none focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Notas sobre interrupciones, pausas, etc..."
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e?.target?.value)}
          />
        </div>
      )}
      {/* Session Statistics */}
      {elapsedTime > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="text-center">
              <p className="text-text-secondary">Tiempo Promedio</p>
              <p className="font-medium text-text-primary">25 min</p>
            </div>
            <div className="text-center">
              <p className="text-text-secondary">Consultas Hoy</p>
              <p className="font-medium text-text-primary">8</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionTimer;