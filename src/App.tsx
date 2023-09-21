import React, { useContext, useEffect, ReactNode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import pokedexTheme from "./core/theme";
import SearchResults from "./pages/search/Search";
import Favorites from "./pages/favorites/Favorites";
import PokemonContextProvider from "./context/pokemonContext";
import { PokemonContext } from "./context/pokemonContext";
import { PokemonContextType } from "./context/types";
import { v4 } from "uuid";

function App() {
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={pokedexTheme}>
        <PokemonContextProvider>
          <APPWrapper>
            <Router>
              <Routes>
                <Route path="/" element={<SearchResults />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </Router>
          </APPWrapper>
        </PokemonContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

interface Props {
  children: ReactNode;
}

function APPWrapper({ children }: Props) {
  const { setUserIdContext } = useContext(PokemonContext) as PokemonContextType;

  useEffect(() => {
    const uuid = v4();
    setUserIdContext(uuid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{children}</div>;
}
