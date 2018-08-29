import styled from 'styled-components';

import { spacing } from '../theme';

type PaddingProps = {
  size?: keyof (typeof spacing);
};

const Padding = styled<PaddingProps, 'div'>('div')`
  padding: ${({ size = 'medium' }) => spacing[size]};
`;

export default Padding;
