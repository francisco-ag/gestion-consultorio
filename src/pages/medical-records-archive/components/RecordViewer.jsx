import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecordViewer = ({ record, onClose, className = '' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [annotations, setAnnotations] = useState([]);
  const [isAnnotating, setIsAnnotating] = useState(false);

  if (!record) return null;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Mock download functionality
    console.log('Downloading record:', record?.id);
  };

  const handleAnnotate = () => {
    setIsAnnotating(!isAnnotating);
  };

  const getRecordTypeIcon = (type) => {
    const iconMap = {
      consultation: 'Stethoscope',
      lab_results: 'TestTube',
      imaging: 'Scan',
      prescriptions: 'Pill',
      surgery: 'Scissors',
      vaccination: 'Syringe',
      emergency: 'AlertTriangle'
    };
    return iconMap?.[type] || 'FileText';
  };

  return (
    <div className={`fixed inset-0 bg-black/50 z-1200 flex items-center justify-center p-4 ${className}`}>
      <div className="bg-card rounded-lg shadow-medical-lg max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getRecordTypeIcon(record?.type)} 
                size={24} 
                className="text-primary"
              />
              <div>
                <h2 className="text-lg font-semibold text-text-primary">{record?.title}</h2>
                <p className="text-sm text-text-secondary">
                  {record?.patientName} • {formatDate(record?.date)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 50}
              >
                <Icon name="ZoomOut" size={16} />
              </Button>
              <span className="px-2 text-sm text-text-secondary">
                {zoomLevel}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 200}
              >
                <Icon name="ZoomIn" size={16} />
              </Button>
            </div>

            {/* Action Buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAnnotate}
              iconName="Edit"
              iconPosition="left"
            >
              {isAnnotating ? 'Finalizar' : 'Anotar'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              iconName="Printer"
              iconPosition="left"
            >
              Imprimir
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              iconName="Download"
              iconPosition="left"
            >
              Descargar
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Document Viewer */}
          <div className="flex-1 overflow-auto bg-muted/20">
            <div className="p-6">
              {/* Document Content */}
              <div 
                className="bg-white rounded-lg shadow-medical p-6 mx-auto"
                style={{ 
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center',
                  width: `${10000 / zoomLevel}%`,
                  maxWidth: 'none'
                }}
              >
                {/* Document Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{record?.title}</h1>
                      <p className="text-gray-600 mt-1">
                        Paciente: {record?.patientName} (ID: {record?.patientId})
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Fecha: {formatDate(record?.date)}</p>
                      <p className="text-sm text-gray-600">Dr. {record?.doctor}</p>
                    </div>
                  </div>
                </div>

                {/* Document Body */}
                <div className="space-y-6">
                  {record?.type === 'consultation' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Motivo de Consulta</h3>
                        <p className="text-gray-700">{record?.chiefComplaint}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Historia de la Enfermedad Actual</h3>
                        <p className="text-gray-700">{record?.historyOfPresentIllness}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Examen Físico</h3>
                        <p className="text-gray-700">{record?.physicalExamination}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Diagnóstico</h3>
                        <p className="text-gray-700">{record?.diagnosis}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Plan de Tratamiento</h3>
                        <p className="text-gray-700">{record?.treatmentPlan}</p>
                      </div>
                    </>
                  )}

                  {record?.type === 'lab_results' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Pruebas Realizadas</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full border border-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="border border-gray-200 px-4 py-2 text-left">Prueba</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Resultado</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Rango Normal</th>
                                <th className="border border-gray-200 px-4 py-2 text-left">Estado</th>
                              </tr>
                            </thead>
                            <tbody>
                              {record?.labResults?.map((result, index) => (
                                <tr key={index}>
                                  <td className="border border-gray-200 px-4 py-2">{result?.test}</td>
                                  <td className="border border-gray-200 px-4 py-2">{result?.value}</td>
                                  <td className="border border-gray-200 px-4 py-2">{result?.normalRange}</td>
                                  <td className="border border-gray-200 px-4 py-2">
                                    <span className={`px-2 py-1 rounded text-xs ${
                                      result?.status === 'normal' ? 'bg-green-100 text-green-700' :
                                      result?.status === 'high'? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                      {result?.status === 'normal' ? 'Normal' :
                                       result?.status === 'high' ? 'Alto' : 'Bajo'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Interpretación</h3>
                        <p className="text-gray-700">{record?.interpretation}</p>
                      </div>
                    </>
                  )}

                  {record?.type === 'prescriptions' && (
                    <>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Medicamentos Prescritos</h3>
                        <div className="space-y-3">
                          {record?.medications?.map((med, index) => (
                            <div key={index} className="border border-gray-200 rounded p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-gray-900">{med?.name}</h4>
                                  <p className="text-sm text-gray-600">{med?.dosage}</p>
                                  <p className="text-sm text-gray-600">Frecuencia: {med?.frequency}</p>
                                  <p className="text-sm text-gray-600">Duración: {med?.duration}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">Cantidad: {med?.quantity}</p>
                                </div>
                              </div>
                              {med?.instructions && (
                                <p className="text-sm text-gray-700 mt-2">
                                  <strong>Instrucciones:</strong> {med?.instructions}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Attachments */}
                  {record?.attachments && record?.attachments?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Archivos Adjuntos</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {record?.attachments?.map((attachment, index) => (
                          <div key={index} className="border border-gray-200 rounded p-3">
                            <Image
                              src={attachment?.url}
                              alt={attachment?.name}
                              className="w-full h-32 object-cover rounded mb-2"
                            />
                            <p className="text-sm font-medium text-gray-900">{attachment?.name}</p>
                            <p className="text-xs text-gray-600">{attachment?.type}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Document Footer */}
                <div className="border-t border-gray-200 pt-4 mt-8">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                      <p>Documento generado el {formatDate(new Date())}</p>
                      {/* <p>MediConsult Manager - Sistema de Gestión Médica</p> */}
                    </div>
                    <div className="text-right">
                      <p>Página {currentPage} de 1</p>
                      <p>ID del Documento: {record?.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-border bg-muted/10 overflow-auto">
            <div className="p-4">
              {/* Record Info */}
              {/* <div className="mb-6">
                <h3 className="font-semibold text-text-primary mb-3">Información del Registro</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tipo:</span>
                    <span className="text-text-primary">{record?.typeLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Creado:</span>
                    <span className="text-text-primary">{formatDate(record?.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Modificado:</span>
                    <span className="text-text-primary">{formatDate(record?.lastModified)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tamaño:</span>
                    <span className="text-text-primary">{record?.fileSize}</span>
                  </div>
                </div>
              </div> */}

              {/* Patient Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-text-primary mb-3">Información del Paciente</h3>
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={record?.patientPhoto}
                    alt={record?.patientName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-text-primary">{record?.patientName}</p>
                    <p className="text-sm text-text-secondary">ID: {record?.patientId}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Edad:</span>
                    <span className="text-text-primary">{record?.patientAge} años</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Género:</span>
                    <span className="text-text-primary">{record?.patientGender}</span>
                  </div>
                </div>
              </div>

              {/* Annotations */}
              {isAnnotating && (
                <div className="mb-6">
                  <h3 className="font-semibold text-text-primary mb-3">Anotaciones</h3>
                  <div className="space-y-2">
                    <textarea
                      className="w-full p-2 border border-border rounded-md text-sm"
                      rows="3"
                      placeholder="Agregar anotación..."
                    />
                    <Button size="sm" className="w-full">
                      Guardar Anotación
                    </Button>
                  </div>
                </div>
              )}

              {/* Digital Signature */}
              {/* <div className="mb-6">
                <h3 className="font-semibold text-text-primary mb-3">Firma Digital</h3>
                <div className="p-3 border border-border rounded-md bg-success/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Documento Verificado</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Firmado digitalmente por Dr. {record?.doctor}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatDate(record?.signedDate)}
                  </p>
                </div>
              </div> */}

              {/* Audit Trail */}
              {/* <div>
                <h3 className="font-semibold text-text-primary mb-3">Historial de Cambios</h3>
                <div className="space-y-2">
                  {record?.auditTrail?.map((entry, index) => (
                    <div key={index} className="text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-primary">{entry?.action}</span>
                        <span className="text-text-secondary">{formatDate(entry?.date)}</span>
                      </div>
                      <p className="text-text-secondary">por {entry?.user}</p>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordViewer;