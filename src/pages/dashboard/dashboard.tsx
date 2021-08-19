import React from 'react';
import { Switch, Redirect, useLocation, Route } from 'react-router-dom';

import Layout from 'src/layout';
import { routes } from './dashborad.routes';
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/store';

const Dashboard = () => {
  const location = useLocation();

  const { locale } = useSelector((state: AppState) => ({
    locale: state.AppSetting.locale,
  }));

  return (
    <Layout>
      <Switch>
        {routes.map(({ path, routeTitle, ...rest }, index: number) => (
          <Route path={`/${locale}/${path}`} {...rest} key={index} />
        ))}
        <Redirect exact from={`/${locale}/`} to={`/${locale}/dashboard`} />
        <Redirect exact from={`/`} to={`/${locale}/dashboard`} />
        <Redirect to={`/404?from=${location.pathname.substring(1)}`} />
      </Switch>
    </Layout>
  );
};

export default Dashboard;
