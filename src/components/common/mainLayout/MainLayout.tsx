import React from 'react';
import { Outlet } from 'react-router-dom';

import ErrorPrompt from '../../auth/ErrorPrompt';
import NavBar from '../navbar/NavBar';

import styles from './MainLayout.module.scss';

const MainLayout = (): JSX.Element => (
  <>
    <NavBar />
    <main id="mainContent" className={styles['app-main']} tabIndex={-1}>
      <Outlet />
    </main>
    <ErrorPrompt />
  </>
);

export default MainLayout;
