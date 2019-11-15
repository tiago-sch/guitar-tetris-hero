import React, { Fragment } from 'react';
import Title from 'components/Title';
import TetrisGame from 'components/TetrisGame';

const Tetris = () => {
  return (
    <Fragment>
      <Title>Tetris</Title>
      <TetrisGame />
    </Fragment>
  )
};

export default Tetris;