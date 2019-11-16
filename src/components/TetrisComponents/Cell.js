import React from 'react';
import { StyledCell } from 'styles/Tetris/StyledCell';
import { TETROMINOS } from 'constants/tetrisConstants';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
);

export default React.memo(Cell);
