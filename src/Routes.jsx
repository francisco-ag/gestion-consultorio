import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PatientManagement from './pages/patient-management';
import MedicalRecordsArchive from './pages/medical-records-archive';
import Login from './pages/login';
import ConsultationSession from './pages/consultation-session';
import AppointmentScheduling from './pages/appointment-scheduling';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ConsultationSession />} />
        <Route path="/patient-management" element={<PatientManagement />} />
        <Route path="/medical-records-archive" element={<MedicalRecordsArchive />} />
        <Route path="/login" element={<Login />} />
        <Route path="/consultation-session" element={<ConsultationSession />} />
        <Route path="/appointment-scheduling" element={<AppointmentScheduling />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;