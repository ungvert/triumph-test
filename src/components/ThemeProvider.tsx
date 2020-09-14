/** @jsx jsx */
import { Global, jsx, css } from '@emotion/core';
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

    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
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
        <Global
          styles={css`
            .react-sortable-hoc {
              display: table;
              box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
            }
          `}
        />
        {children}
      </EmotionThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default ThemeProvider;
