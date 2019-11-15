import React from 'react';
import { StyledCell } from 'components/TetrisComponents/styles/StyledCell';
import { TETROMINOS } from 'constants/tetrisConstants';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color}>
    {console.log('rerender cell')}
  </StyledCell>
);

export default React.memo(Cell);
