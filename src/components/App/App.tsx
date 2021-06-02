import React, { lazy, Suspense } from 'react';
import cl from 'clsx';
import Skeleton from 'react-loading-skeleton';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import s from './App.module.scss';
import { Routes } from '../../const';
import HomePage from '../../pages/HomePage/HomePage';

const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage'));

const App = () => (
  <Router>
    <Suspense
      fallback={
        <div className={cl(s.skeleton)}>
          <Skeleton height={200} width={200} />
        </div>
      }>
      <Switch>
        <Route exact path={Routes.HOME} component={HomePage} />
        <Route exact path={Routes.ERROR404} component={ErrorPage} />
        <Route exact path={`${Routes.DETAILS}/:id`} component={ErrorPage} />
        <Redirect to={Routes.HOME} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
