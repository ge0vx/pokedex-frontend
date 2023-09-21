import React, { useState } from 'react'
import { Table as MuiTable, Typography } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { Pokemon, pokemonApiResponse } from '../core/types'
import useFetch from '../core/hooks/useFetch'
import {awsPokemonApi} from "../core/consts"
import _ from "lodash"

interface TableProps {
  data: Pokemon[]
  columns: ColumnDef<any>[]
  rowOnClickEnabled?: boolean
  addtionalData?: any
}

function Table({ data, columns, rowOnClickEnabled=true, addtionalData=undefined }: TableProps) {
  const [bodyRequest, setBodyRequest] = useState({})
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { data: dataResponse, error, loading } = useFetch<pokemonApiResponse | undefined>(
    !_.isEmpty(bodyRequest) ? `${awsPokemonApi}` : undefined,
    {
      method: "POST",
      body: JSON.stringify(bodyRequest),
    }
  );

  const savePokemon = (name: string) => {
    setBodyRequest({
      pokemon_id: "",
      name,
      default_sprite: "",
      types: "",
      user_id: addtionalData
     });
  }

  if(loading){
    return <div style={{padding: '100px 00'}}><Typography fontSize={20} align='center' color={'error.dark'}> Adding to Favorites!</Typography></div>
  }

  return (
    <Paper elevation={2} className="MuiTable">
      <MuiTable>
        <TableHead>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id} align="center" sx={{backgroundColor: "error.main", color: "#FFFFFF"}}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody sx={{
          minWidth: 650,
          "& .MuiTableRow-root:hover": {
            backgroundColor: "error.light"
          }
        }}>
          {getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => rowOnClickEnabled && savePokemon(row?.original?.name)}
              sx={{ cursor: rowOnClickEnabled ? 'pointer' : 'initial', textTransform: 'capitalize' }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} align="center" sx={{
                  '&$selected, &$selected:hover, &$selected:focus': {
                    backgroundColor: "error.dark",
                  },
                }}>
                  {rowOnClickEnabled && <StarBorderIcon sx={{ color: '#FFFFFF' }} />}
                  <Typography>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </Paper>
  )
}

export default Table

