import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthError from './pages/AuthError';
import Index from './pages/Index';
import MainLayout from './common/mainLayout/MainLayout';
import NotFound from './pages/NotFound';

import { ROUTES } from './constants';

const App = (): JSX.Element => {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.INDEX} element={<Index />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTES.AUTH_ERROR} element={<AuthError />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
