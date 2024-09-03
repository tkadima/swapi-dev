import { Box, Link, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

export const filmColumnNames: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 180 },
  { field: 'episode_id', headerName: 'Episode ID', width: 120 },
  { field: 'director', headerName: 'Director', width: 180 },
  { field: 'release_date', headerName: 'Release Date', width: 180 },
  { field: 'characters', headerName: 'Characters', width: 350 },
  { field: 'vehicles', headerName: 'Vehicles', width: 250 },
]

export const peopleColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'gender', headerName: 'Gender', width: 120 },
  { field: 'homeworld', headerName: 'Home World', width: 200 },
  {
    field: 'films',
    headerName: 'Films',
    width: 350,
    renderCell: (params) => (
      <Box sx={{margin: '10px', display: 'flex', flexDirection: 'column'}}>
        {params.value.map((film: any) => {
            console.log('film', film); 
          <Link href={`films/${film.id}`}>
          <Typography component="p" variant="subtitle1">{film}</Typography>
          </Link>
  })}
      </Box>
    ),
  },
  { field: 'species', headerName: 'Species', width: 250 },
  { field: 'vehicles', headerName: 'Vehicles', width: 250 },
  { field: 'starships', headerName: 'Starships', width: 250 },
]

export const vehicleColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'model', headerName: 'Model', width: 180 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 180 },
  { field: 'vehicle_class', headerName: 'Vehicle Class', width: 180 },
  { field: 'films', headerName: 'Films', width: 350 },
  { field: 'pilots', headerName: 'Pilots', width: 250 },
]

export const starshipColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'model', headerName: 'Model', width: 180 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 180 },
  { field: 'starship_class', headerName: 'Starship Class', width: 180 },
  { field: 'films', headerName: 'Films', width: 350 },
  { field: 'pilots', headerName: 'Pilots', width: 250 },
]

export const planetColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'climate', headerName: 'Climate', width: 180 },
  { field: 'terrain', headerName: 'Terrain', width: 180 },
  { field: 'population', headerName: 'Population', width: 180 },
  { field: 'residents', headerName: 'Residents', width: 250 },
  { field: 'films', headerName: 'Films', width: 350 },
]

export const speciesColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'classification', headerName: 'Classification', width: 180 },
  { field: 'designation', headerName: 'Designation', width: 180 },
  { field: 'language', headerName: 'Language', width: 180 },
  { field: 'homeworld', headerName: 'Homeworld', width: 180 },
  { field: 'people', headerName: 'People', width: 250 },
  { field: 'films', headerName: 'Films', width: 350 },
]
