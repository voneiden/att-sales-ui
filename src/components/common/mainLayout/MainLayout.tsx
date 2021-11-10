import React from 'react';
import { Outlet } from 'react-router-dom';

import ErrorPrompt from '../../../auth/ErrorPrompt';
import NavBar from '../navbar/NavBar';

import styles from './MainLayout.module.scss';

const MainLayout: React.FC = ({ children }) => (
  <>
    <NavBar />
    <main className={styles['app-main']}>
      <Outlet />
    </main>
    <ErrorPrompt />
  </>
);

export default MainLayout;
