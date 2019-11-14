import * as React from 'react';
import styled from '@emotion/styled';

const StyledInput = styled('input')`
  font-family: 'Futura New', Futura, Avenir, sans-serif;
  display: inline-block;
  padding: 0.5rem 0.1rem 0.5rem 0;

  color: ${(props: any) => props.theme.colors.onInput};
  font-size: 24px;
  font-weight: 400;
  line-height: 45px;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 1rem;
  appearance: none;
  outline: 0;
  border: 0;
  background: ${(props: any) => props.theme.colors.inputBg};

  &:hover {
  }
  &:focus {
  }
`;

const Input = (props: any) => <StyledInput {...props} />;

export default Input;
