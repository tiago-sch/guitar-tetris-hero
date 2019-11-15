import styled from 'styled-components';

const containerStyle = `margin-left: auto;
  margin-right: auto;
  width: 310px;

  @media (min-width: 520px) {
    width: 480px;
  }

  @media (min-width: 992px) {
    width: 768px;
  }
  @media (min-width: 1280px) {
    width: 1080px;
  }
  @media (min-width: 1440px) {
    width: 1280px;
  }`;

export const Container = styled.div`
  ${containerStyle}
`;

export const Main = styled.main`
  ${containerStyle}
`;

export const Header = styled.header`
  ${containerStyle}
`;