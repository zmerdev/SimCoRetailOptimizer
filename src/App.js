import Retail from './pages/retail';
import ProductionBuildingsNeeded from './pages/productionBuildingsNeeded';
import Home from './pages/home';

import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/navbar';
import QualityCalc from './pages/quality-calc';

export default function App() {
  return (
    <>

      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/retail" element={<Retail />} />
            <Route path="/buildings" element={<ProductionBuildingsNeeded />} />
            <Route path="/quality" element={<QualityCalc />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}