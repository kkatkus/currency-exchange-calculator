import * as React from 'react';
import styled from '@emotion/styled';
import { darken, transparentize } from 'polished';

const StyledButton = styled('button')`
  display: inline-block;

  background-color: ${(props: any) => props.theme.colors.primary};
  color: ${(props: any) => props.theme.colors.onPrimary};

  border-radius: 32px;

  line-height: 1.5em;
  font-size: 1rem;
  font-weight: 500;

  height: 56px;
  padding: 0px;

  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: 0;
  outline: none;
  &:hover {
    background-color: ${(props: any) => darken(0.05, props.theme.colors.primary)};
  }

  &:disabled {
    background-color: ${(props: any) => transparentize(0.5, props.theme.colors.primary)};
    pointer-events: none;
  }
`;

const Button = (props: any) => <StyledButton {...props} />;

export default Button;
