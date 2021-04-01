import React from 'react';
import { Layout } from 'antd';
import { Router, Switch, Route } from "react-router-dom";
import './mainLayout.scss'
import Header from '../components/Header';
import MovieList from '@app/modules/MovieList';
import MovieDetail from '@app/modules/MovieDetail';
import { history } from "@app/utils/redux/store";

const MainLayout = () => {
  return (
    <Layout className="main-layout" style={{ minHeight: '100vh' }}>
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/details" component={MovieDetail} />
          <Route path="/" component={MovieList} />
        </Switch>
      </Router>
    </Layout>
  );
};

export default MainLayout;