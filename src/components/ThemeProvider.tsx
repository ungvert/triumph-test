/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  responsiveFontSizes,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';

import 'fontsource-open-sans';

let theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#2181a6',
    },
  },
});
theme = responsiveFontSizes(theme);

const ThemeProvider = ({ children }: { children: JSX.Element }) => (
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </EmotionThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default ThemeProvider;
