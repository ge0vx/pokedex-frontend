import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Table from "../../components/Table";
import Search from "../../components/Search";
import useFetch from "../../core/hooks/useFetch";
import { pokemonApiResponse } from "../../core/types";
import { simpleListColumns } from "./simpleListColumns";
import { extPokemonApi} from "../../core/consts"
import { PokemonContext } from '../../context/pokemonContext';
import { PokemonContextType } from '../../context/types';

function SearchResults() {
  const { userIdContext } = useContext(PokemonContext) as PokemonContextType;
  const navigate = useNavigate();
  const [searchInput, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { data, error, loading } = useFetch<pokemonApiResponse | undefined>(
    query ? `${extPokemonApi}${query}` : undefined,
    {
      method: "GET",
    },
    searchInput !=='' ? 'pokemon': '' 
  );

  useEffect(()=>{
    setQuery('/pokemon')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchResults = () => {
    //does not allow to search if searchInput is empty
    if (!searchInput) return;
    const urlParams = `/pokemon?pokemon_name=${searchInput}`
    setQuery(urlParams);
  };

  const goToFavorites = () => {
    navigate(`/favorites`);
  };

  return (
    <Grid container>
      <Grid item sm={4} xs={12}>
        <Box
          display="flex"
          justifyContent="flex-end"
          paddingTop={2}
          component="img"
          sx={{
            height: 100,
            width: 130,
          }}
          alt="Fav"
          src="https://i.pinimg.com/originals/a9/4f/4d/a94f4d75a2e429a20838d28d2ae2b996.png"
        />
      </Grid>
      <Grid item sm={8} xs={12}>
        <Box padding={1}>
          <Search
            setSearchInput={setSearch}
            searchLabel="Search"
            searchInput={searchInput}
            triggerSearch={fetchResults}
            placeholder="Pokemon Name"
          />
          <Button
            style={{ width: "100%" }}
            variant="outlined"
            color="error"
            onClick={() => goToFavorites()}
          >
            <StarBorderIcon />
            <Typography textAlign="center">My Favorite Pokemons</Typography>
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box padding={1}>
          {error && <Typography textAlign="center">No pokemon found...</Typography>}
          {loading && (
            <Typography textAlign="center">Loading...</Typography>
          )}
          {!loading && !!data?.results?.length && (
            <>
              <Typography textAlign="center">Click on a Pokemon name to add you to your favorites!</Typography>
              <Table data={data?.results} columns={simpleListColumns} addtionalData={userIdContext}/>
            </>
          )}
          {!loading && data?.results?.length === 0 && (
            <Typography textAlign="center">No Results</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default SearchResults;
