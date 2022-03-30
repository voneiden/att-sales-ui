import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import AddEditCustomer from './pages/AddEditCustomer';
import AuthError from './pages/AuthError';
import ProjectList from './pages/ProjectList';
import Login from './pages/Login';
import Logout from './pages/Logout';
import MainLayout from './components/common/mainLayout/MainLayout';
import NotFound from './pages/NotFound';
import LoadingScreen from './components/common/loadingScreen/LoadingScreen';
import WithAuth from './components/auth/WithAuth';
import ProjectDetail from './pages/ProjectDetail';
import CustomerSearch from './pages/CustomerSearch';
import CustomerDetail from './pages/CustomerDetail';

import { ROUTES } from './enums';

const Authenticated = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<MainLayout authenticated />}>
      <Route index element={<Navigate to={ROUTES.PROJECTS} />} />
      <Route path={ROUTES.PROJECTS} element={<ProjectList />} />
      <Route path={`${ROUTES.PROJECTS}/:projectId`} element={<ProjectDetail />} />
      <Route path={ROUTES.CUSTOMERS} element={<CustomerSearch />} />
      <Route path={`${ROUTES.CUSTOMERS}/:customerId`} element={<CustomerDetail />} />
      <Route path={`${ROUTES.ADD_CUSTOMER}`} element={<AddEditCustomer isEditMode={false} />} />
      <Route path={`${ROUTES.EDIT_CUSTOMER}/:customerId`} element={<AddEditCustomer isEditMode />} />
      <Route path={ROUTES.LOGIN} element={<Navigate to={ROUTES.INDEX} />} />
      <Route path={ROUTES.LOGOUT} element={<Navigate to={ROUTES.INDEX} />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
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
