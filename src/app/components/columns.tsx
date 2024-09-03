import { Box, Link, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

const ListDisplay = ({ params }: any) => {
  const fieldNames: any = {
    characters: 'people',
    pilots: 'people',
    residents: 'people',
    films: 'films',
    vehicles: 'vehicles',
    starships: 'starships',
    species: 'species',
    planets: 'planets',
    people: 'people',

  }
  if (params.value === undefined) return <div>Error</div>
  const field = fieldNames[params.field]
  return (
    <Box sx={{ margin: '10px', display: 'flex', flexDirection: 'column' }}>
      {params.value.map((val: any) => {
        return (
          <Link key={val?.id} href={`/${field}/${val?.id}`}>
            <Typography component="p" variant="subtitle1">
              {val?.title ?? val?.name}
            </Typography>
          </Link>
        )
      })}
    </Box>
  )
}
export const filmColumnNames: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 180 },
  { field: 'episode_id', headerName: 'Episode ID', width: 120 },
  { field: 'director', headerName: 'Director', width: 180 },
  { field: 'release_date', headerName: 'Release Date', width: 180 },
  {
    field: 'characters',
    headerName: 'Characters',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'vehicles',
    headerName: 'Vehicles',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const peopleColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'gender', headerName: 'Gender', width: 120 },
  { field: 'homeworld', headerName: 'Home World', width: 200 },
  {
    field: 'films',
    headerName: 'Films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'species',
    headerName: 'Species',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'vehicles',
    headerName: 'Vehicles',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'starships',
    headerName: 'Starships',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const vehicleColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'model', headerName: 'Model', width: 180 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 180 },
  { field: 'vehicle_class', headerName: 'Vehicle Class', width: 180 },
  {
    field: 'films',
    headerName: 'Films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'pilots',
    headerName: 'Pilots',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const starshipColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'model', headerName: 'Model', width: 180 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 180 },
  { field: 'starship_class', headerName: 'Starship Class', width: 180 },
  {
    field: 'films',
    headerName: 'Films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'pilots',
    headerName: 'Pilots',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const planetColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'climate', headerName: 'Climate', width: 180 },
  { field: 'terrain', headerName: 'Terrain', width: 180 },
  { field: 'population', headerName: 'Population', width: 180 },
  {
    field: 'residents',
    headerName: 'Residents',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'films',
    headerName: 'Films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const speciesColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'classification', headerName: 'Classification', width: 180 },
  { field: 'designation', headerName: 'Designation', width: 180 },
  { field: 'language', headerName: 'Language', width: 180 },
  {
    field: 'homeworld',
    headerName: 'Homeworld',
    width: 180,
    renderCell: (params) => (
      <Link href={`planets/${params.value?.id}`}>
        <Typography component="p" variant="subtitle1">
          {params?.value?.name }
        </Typography>
      </Link>
    ),
  },
  {
    field: 'people',
    headerName: 'People',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'films',
    headerName: 'Films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]
