import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Grid, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import Table from '../../components/Table'
import useFetch from '../../core/hooks/useFetch'
import { pokemonApiResponse } from '../../core/types'
import { simpleListColumns } from './columns'
import {awsPokemonApi} from "../../core/consts"
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { PokemonContext } from '../../context/pokemonContext';
import { PokemonContextType } from '../../context/types';

function Favorites() {
  const { userIdContext } = useContext(PokemonContext) as PokemonContextType;
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const { data, error, loading } = useFetch<pokemonApiResponse | undefined>(
    query ? `${query}` : undefined,
    {
      method: "GET",
    },
  );

  useEffect(()=>{
    setQuery(`${awsPokemonApi}?user_id=${userIdContext}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
      <Grid container>
      <Grid item sm={4} xs={12}>
        <Box padding={1}>
          <Button
            style={{ width: "100%" }}
            variant="outlined"
            color="error"
            onClick={() => navigate(`/`)}
          >
            <ArrowBackIos />
            <Typography textAlign="center">Back</Typography>
          </Button>
        </Box>
      </Grid>
        <Grid item xs={12}>
          <Box padding={1}>
            {error && <Typography textAlign="center">Loading error</Typography>}
            {loading && (
              <Typography textAlign="center">Loading ...</Typography>
            )}
            {!loading && !!data?.results?.length && (
              <Table data={data?.results} columns={simpleListColumns} rowOnClickEnabled={false}/>
            )}
            {!loading && data?.results?.length === 0 && (
              <Typography textAlign="center">No Results</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
  )
}

export default Favorites
