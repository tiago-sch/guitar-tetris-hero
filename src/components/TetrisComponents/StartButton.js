import React from 'react';
import styled from 'styled-components';
import { colors } from 'constants/styling';

const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: ${colors.coral};
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;

const StartButton = ({ callback, children }) => (
  <StyledStartButton onClick={callback}>{ children }</StyledStartButton>
);

export default StartButton;
