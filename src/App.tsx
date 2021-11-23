import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import AuthError from './pages/AuthError';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import MainLayout from './components/common/mainLayout/MainLayout';
import NotFound from './pages/NotFound';
import LoadingScreen from './components/common/loadingScreen/LoadingScreen';
import WithAuth from './components/auth/WithAuth';
import ProjectDetail from './pages/ProjectDetail';

import { ROUTES } from './enums';

const Authenticated = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Homepage />} />
      <Route path={`${ROUTES.PROJECT}/:projectID`} element={<ProjectDetail />} />
      <Route path={ROUTES.LOGIN} element={<Navigate to={ROUTES.INDEX} />} />
      <Route path={ROUTES.LOGOUT} element={<Navigate to={ROUTES.INDEX} />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path="/" element={<Navigate to={ROUTES.INDEX} />} />
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} />} />
    </Route>
  </Routes>
);

const Unauthenticated = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />
      <Route path={ROUTES.AUTH_ERROR} element={<AuthError />} />
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
    </Route>
  </Routes>
);

const App = (props: React.PropsWithChildren<unknown>): React.ReactElement =>
  WithAuth(Authenticated, Unauthenticated, LoadingScreen);

export default App;
