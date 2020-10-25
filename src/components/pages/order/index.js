import React from 'react';

import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Layout from 'components/layout/app';

import { OrderList, OrderDetail } from './components';

export default function Product() {
  const { path } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <OrderList/>
        </Route>

        <Route path={`${path}/:id/detail`}>
          <OrderDetail />
        </Route>

        <Redirect to={path}/>
      </Switch>
    </Layout>
  );
}
