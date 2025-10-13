'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
});

export default theme;
