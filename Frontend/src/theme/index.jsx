import { useMemo } from 'react';
import PropTypes, { shape } from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import {  ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';


import  palette  from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);
  // console.log('themeProvider: ',theme);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
