import React from 'react';
import { Layout } from 'antd';
import { Router, Switch, Route } from "react-router-dom";
import './mainLayout.scss'
import Header from '../components/Header';
import MovieList from '@app/modules/MovieList';
import MovieDetail from '@app/modules/MovieDetail';
import { AppState, history } from "@app/utils/redux/store";
import { useSelector } from 'react-redux';
import { Dict } from '@app/utils/types';
import { SET_IS_VIEW_MOVIE_DETAIL, SET_SEARCH_FIELD_VISIBILITY } from '@app/domain/movies/redux/actions';
import { movieService } from '@app/domain/movies/services';
const { Content } = Layout;

interface IMainLayout {
  visiblestate: Dict<boolean>
}
const MainLayout = () => {
  const { visiblestate } = useSelector<AppState, IMainLayout>(state => ({
    visiblestate: state.common.visible
  }))
  return (
    <Layout className="main-layout" style={{ minHeight: '100vh' }}>
      <Header
        isSearchVisible={visiblestate[SET_SEARCH_FIELD_VISIBILITY] || false}
        onSearch={(val) => movieService.setSearchFieldVisibility(val)}
        isBackButtonVisible={visiblestate[SET_IS_VIEW_MOVIE_DETAIL]}
        onBack={() => movieService.goBackToMovieList()}
      />
      <Content className="main-content">
        <Router history={history}>
          <Switch>
            <Route path="/details" component={MovieDetail} />
            <Route path="/" component={MovieList} />
          </Switch>
        </Router>
      </Content>
    </Layout>
  );
};

export default MainLayout;