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
    <Router basename='/SimCoRetailOptimizer'>

      <div className='main-wrapper main-wrapper-responsive-lg'>
        <SidebarMenu bg="dark" collapseOnSelect={false} defaultExpanded={true} exclusiveExpand={false} expand="lg" hide="md" variant="dark">
          <SidebarMenu.Collapse>
            <SidebarMenu.Header>
              <SidebarMenu.Brand title="React-Bootstrap">
                <span className="react-bootstrap-img" />
              </SidebarMenu.Brand>
              <SidebarMenu.Toggle />
            </SidebarMenu.Header>
            <SidebarMenu.Body>
              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link o href='/SimCoRetailOptimizer/retail' >
                  <SidebarMenu.Nav.Title>
                    {"Retail"}
                  </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>
              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link href='/SimCoRetailOptimizer/building-production'>
                  <SidebarMenu.Nav.Title>
                    {"Buildings"}
                  </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>
            </SidebarMenu.Body>
          </SidebarMenu.Collapse>
        </SidebarMenu>

        <Routes>
          <Route path="/retail" element={<Retail />} />
          <Route path="/buildings" element={<ProductionBuildingsNeeded />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}