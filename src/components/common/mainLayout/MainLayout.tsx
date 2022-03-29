import React from 'react';
import { Outlet } from 'react-router-dom';

import ErrorPrompt from '../../auth/ErrorPrompt';
import NavBar from '../navbar/NavBar';
import OfferModal from '../../offer/OfferModal';
import ReservationCancelModal from '../../reservations/ReservationCancelModal';
import ReservationEditModal from '../../reservations/ReservationEditModal';

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
    {authenticated && (
      <>
        <OfferModal />
        <ReservationCancelModal />
        <ReservationEditModal />
      </>
    )}
  </>
);

export default MainLayout;
