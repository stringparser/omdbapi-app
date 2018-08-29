import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;

  border: 1px solid rgba(0.6);
  appearance: none;
  border-radius: 4px;

  padding: 0.5rem 1rem;
  font-size: inherit;
  margin-top: 1rem;

  &:hover {
    color: white;
    background-color: rgba(0,0,0,0.7);
  }
`;

export default Button;
