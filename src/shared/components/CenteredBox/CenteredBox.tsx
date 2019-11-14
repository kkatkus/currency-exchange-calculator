import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

const Wrapper = styled('div')`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled('div')`
  background-color: ${(props: any) => props.theme.colors.surface};
  color: ${(props: any) => props.theme.colors.onSurface};
  border-radius: 0.5rem;
  box-shadow: ${(props: any) => props.theme.colors.boxShadow};
  transition: all 0.2s ease;
`;

const CenteredBox = ({ children }: Props) => (
  <Wrapper>
    <Inner>{children}</Inner>
  </Wrapper>
);

export default CenteredBox;
