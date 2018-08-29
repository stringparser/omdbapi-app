import styled from 'styled-components';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputField = styled<InputFieldProps, 'input'>('input')`
  width: 100%;
  margin: 0;
  border: 1px solid rgba(0,0,0,0.4);
  outline: none;
  padding: 0.5rem 1rem;
  apperance: none;
  font-size: inherit;
  border-radius: 4px;

  display: inline-flex;
  height: 42px;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-top: 1rem;

  input:disabled {
    opacity: 0.8;
    background-color: lightgrey;
  }
`;

export type InputProps = InputFieldProps & {
  label?: string;
};

const Input: React.SFC<InputProps> = ({ label, ...props }) => (
  <InputContainer>
    {label && props.name
      ? <label htmlFor={props.name}>{label}</label>
      : null
    }
    <InputField {...props} />
  </InputContainer>
)

export default Input;
