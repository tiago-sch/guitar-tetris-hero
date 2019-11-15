import styled from 'styled-components';
import { colors } from 'constants/styling';

export const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Navbar = styled.ul`
  list-style: none;
  padding: 0;
`;

export const NavbarLink = styled.li`
  display: inline-block;
  padding: 15px;

  a {
    color: ${colors.white};
    text-decoration: none;

    &:hover {
      color: ${colors.silver};
      transition: color .3s ease;
    }
  }
`;