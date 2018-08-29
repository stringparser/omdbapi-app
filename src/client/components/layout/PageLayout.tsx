import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  html {
    font-size: 15px;
  }

  html,
  body {
    margin: 0;
  }
  body {
    background-color: snow;
  }
  * {
    z-index: 0;
    box-sizing: border-box;
  }
  a {
    color: currentColor;
  }
`;

const PageLayout = styled.div`
  margin: 0 auto;
  max-width: 660px;

  padding: 3rem 2rem;
`;

export default PageLayout;
