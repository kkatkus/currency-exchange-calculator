import * as React from 'react';
import styled from '@emotion/styled';

import ThemeSwitcher from '../../../features/settings/components/ThemeSwitcher';

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled('div')`
  min-height: 100vh;
  background-color: ${(props: any) => props.theme.colors.background};
  color: ${(props: any) => props.theme.colors.onBackground};
`;

const Layout = ({ children }: Props) => (
  <Wrapper>
    <ThemeSwitcher />
    {children}
  </Wrapper>
);

export default Layout;
