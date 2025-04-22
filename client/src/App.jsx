import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Dashboard from './components/page';
import ElectricityOraclePage from './components/electricity-oracle/page';
import FlightOraclePage from './components/flight-oracle/page';
import VehicleOraclePage from './components/vehicle-oracle/page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/electricity" element={<Layout><ElectricityOraclePage /></Layout>} />
      <Route path="/flight" element={<Layout><FlightOraclePage /></Layout>} />
      <Route path="/vehicle" element={<Layout><VehicleOraclePage /></Layout>} />
    </Routes>
  );
}

export default App;
