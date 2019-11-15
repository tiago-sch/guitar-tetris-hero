import React from 'react';
import { StyledDisplay } from 'styles/Tetris/StyledDisplay';

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;
