import React from 'react';
import Main from './Main';
import ThemeProvider from './ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

export default App;
