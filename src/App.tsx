import React from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import logo from './logo.svg';
import './App.css';
import pokedexTheme from './core/theme'

function App() {
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={pokedexTheme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    </ThemeProvider>
  </StyledEngineProvider>
  );
}

export default App;
