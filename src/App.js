import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from 'components/Header';
import { Main } from 'styles/Container';
import GlobalStyle from 'styles/Global';

import Pitchy from 'pages/Pitchy';
import Tetris from 'pages/Tetris';
import GuitarTetrisHero from 'pages/GuitarTetrisHero';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />

      <Main>
        <Switch>
          <Route path='/pitchy'>
            <Pitchy />
          </Route>
          <Route path='/tetris'>
            <Tetris />
          </Route>
          <Route path='/'>
            <GuitarTetrisHero />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
