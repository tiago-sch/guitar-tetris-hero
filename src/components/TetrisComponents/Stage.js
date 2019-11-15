import React from 'react';
import { StyledStage } from 'styles/Tetris/StyledStage';

import Cell from 'components/TetrisComponents/Cell';

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);

export default Stage;
