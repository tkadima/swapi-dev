import { GridColDef } from "@mui/x-data-grid";

export const columnNames: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'gender', headerName: 'Gender', width: 120 },
    { field: 'homeworld', headerName: 'Home World', width: 200 },
    { field: 'films', headerName: 'Films', width: 350 },
    { field: 'vehicles', headerName: 'Vehicles', width: 250 },
    { field: 'starships', headerName: 'Starships', width: 250 },
  ]