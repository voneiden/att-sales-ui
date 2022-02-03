import React from 'react';
import { Outlet } from 'react-router-dom';

import ErrorPrompt from '../../auth/ErrorPrompt';
import NavBar from '../navbar/NavBar';
import OfferModal from '../../offer/OfferModal';

import styles from './MainLayout.module.scss';

interface IProps {
  authenticated?: boolean;
}

const MainLayout = ({ authenticated }: IProps): JSX.Element => (
  <>
    <NavBar />
    <main id="mainContent" className={styles['app-main']} tabIndex={-1}>
      <Outlet />
    </main>
    <ErrorPrompt />
    {authenticated && <OfferModal />}
  </>
);

export default MainLayout;
