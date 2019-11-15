import styled from 'styled-components';
import { colors } from 'constants/styling';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(25vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid ${colors.coral};
  width: 100%;
  max-width: 25vw;
  background: #111;
`;
