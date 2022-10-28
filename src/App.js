import './App.css';
import Retail from './pages/retail';
import ProductionBuildingsNeeded from './pages/productionBuildingsNeeded';
import Home from './pages/home';

import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SidebarMenu from 'react-bootstrap-sidebar-menu';

export default function App() {
  return (
    <div className='main-wrapper main-wrapper-responsive-lg'>
      <Router>
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
                <SidebarMenu.Nav.Link href='/#/retail' >
                  <SidebarMenu.Nav.Title>
                    {"Retail"}
                  </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>
              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link href='/#/building-production'>
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
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}