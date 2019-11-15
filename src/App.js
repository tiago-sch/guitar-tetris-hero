import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./styles/app.scss";
import Header from './components/Header';

import Pitchy from './pages/Pitchy';
import Tetris from './pages/Tetris';
import GuitarTetrisHero from './pages/GuitarTetrisHero';

const App = () => {
  return (
    <Router>
      <Header />

      <main className='container'>
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
      </main>
    </Router>
  );
}

export default App;
