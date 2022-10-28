import './App.css';
import Retail from './pages/retail';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import ProductionBuildingsNeeded from './pages/productionBuildingsNeeded';
import Home from './pages/home';

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <Router>
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
                <SidebarMenu.Nav.Link href='/retail' >
                  <SidebarMenu.Nav.Title>
                    {"Retail"}
                  </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>
              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link href='/building-production'>
                  <SidebarMenu.Nav.Title>
                    {"Buildings"}
                  </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>
            </SidebarMenu.Body>
          </SidebarMenu.Collapse>
        </SidebarMenu>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/retail" element={<Retail />} />
          <Route path="/buildings" element={<ProductionBuildingsNeeded />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router >
  );
}