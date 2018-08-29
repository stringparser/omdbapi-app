import styled from 'styled-components';

type FlexLayoutProps = {
  flexDirection?: React.CSSProperties['flexDirection']
};

const FlexLayout = styled<FlexLayoutProps, 'div'>('div')`
  display: flex;
  justify-content: space-between;

  ${({
    flexDirection = 'row',
  }) => `
    flex-direction: ${flexDirection};
  `}

  & > *:not(:last-child) {
    flex: 1;
    height: 100%;
    margin-right: 0.5rem;
  }
`;

export const FlexItem = styled.div``;

export default FlexLayout;
