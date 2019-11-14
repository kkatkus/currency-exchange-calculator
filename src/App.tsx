import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import AppRoutes from './AppRoutes';
import RootState from './RootState';
import * as themes from './shared/styles';
import Layout from './shared/components/Layout';

import { Global } from '@emotion/core';

import normalize from './shared/styles/normalize';
import root from './shared/styles/root';
import Loader from './shared/components/Loader';

const App = () => {
  const [theme, loading] = useSelector((state: RootState) => [state.settings.theme, state.settings.loading]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Global styles={[normalize, root]} />
      <Layout>
        <Loader loading={loading}>
          <AppRoutes />
        </Loader>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
