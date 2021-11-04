import React from 'react';

import NavBar from '../../common/navbar/NavBar';

const MainLayout: React.FC = ({ children }) => (
  <div className="main-layout">
    <NavBar />
    <main className="app-main">{children}</main>
  </div>
);

export default MainLayout;
