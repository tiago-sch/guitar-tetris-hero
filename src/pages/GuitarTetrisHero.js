import React, { Fragment } from 'react';
import Title from 'components/Title';
import TetrisGame from 'components/TetrisGame';

const GuitarTetrisHero = () => {
  return (
    <Fragment>
      <Title>Guitar Tetris Hero</Title>
      <TetrisGame guitarMode />
    </Fragment>
  )
};

export default GuitarTetrisHero;