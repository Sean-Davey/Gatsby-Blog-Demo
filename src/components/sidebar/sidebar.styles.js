import styled from '@emotion/styled';
import { css } from '@emotion/react';

const defaultStyles = () => { 
  return css`
    background-color: #0E1A41;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    padding: 2.5rem;

    a {
        color: white;  
        text-decoration: none;
        display: block;
        &:hover {
            text-decoration: underline;
        }
    }
`;
};

const StyledSideBar = styled('div')(defaultStyles);
export default StyledSideBar;