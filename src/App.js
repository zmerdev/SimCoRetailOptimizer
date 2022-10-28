import './App.css';
import Retail from './pages/retail';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import ProductionBuildingsNeeded from './pages/productionBuildingsNeeded';
import Home from './pages/home';

import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <div className='main-wrapper main-wrapper-responsive-lg'>
      <Router>
        <Routes>
          <Route path="/retail" element={<Retail />} />
          <Route path="/buildings" element={<ProductionBuildingsNeeded />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}