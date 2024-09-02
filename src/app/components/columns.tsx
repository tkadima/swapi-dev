import { GridColDef } from "@mui/x-data-grid";

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
    { field: 'films', headerName: 'Films', width: 350 },
    { field: 'vehicles', headerName: 'Vehicles', width: 250 },
    { field: 'starships', headerName: 'Starships', width: 250 },
  ]