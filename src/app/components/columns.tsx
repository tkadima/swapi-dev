import { GridColDef } from '@mui/x-data-grid'
import { ListDisplay, ResourceLink } from './ResourceLinks'
import { formatNumber } from '../helpers'

export const filmColumnNames: GridColDef[] = [
  { field: 'title', headerName: 'title', width: 180 },
  { field: 'episode_id', headerName: 'episode id', width: 120 },
  { field: 'director', headerName: 'director', width: 180 },
  {
    field: 'release_date',
    headerName: 'release date',
    width: 180,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
  },
  {
    field: 'characters',
    headerName: 'characters',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'vehicles',
    headerName: 'vehicles',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const peopleColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'name', width: 180 },
  { field: 'gender', headerName: 'gender', width: 120 },
  {
    field: 'homeworld',
    headerName: 'home world',
    width: 200,
    renderCell: (params) => (
      <ResourceLink
        field={params.field}
        name={params.value.name}
        id={params.value.id}
      />
    ),
  },
  {
    field: 'films',
    headerName: 'films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'species',
    headerName: 'species',
    width: 300,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'vehicles',
    headerName: 'vehicles',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'starships',
    headerName: 'starships',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const vehicleColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'name', width: 180 },
  { field: 'model', headerName: 'model', width: 180 },
  { field: 'manufacturer', headerName: 'manufacturer', width: 180 },
  { field: 'vehicle_class', headerName: 'vehicle class', width: 180 },
  {
    field: 'films',
    headerName: 'films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'pilots',
    headerName: 'pilots',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const starshipColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'name', width: 180 },
  { field: 'model', headerName: 'model', width: 180 },
  { field: 'manufacturer', headerName: 'manufacturer', width: 180 },
  { field: 'starship_class', headerName: 'starship class', width: 180 },
  {
    field: 'films',
    headerName: 'films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'pilots',
    headerName: 'pilots',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const planetColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'name', width: 180 },
  { field: 'climate', headerName: 'climate', width: 180 },
  { field: 'terrain', headerName: 'terrain', width: 180 },
  {
    field: 'population',
    headerName: 'population',
    width: 180,
    renderCell: (params) => formatNumber(params.value),
  },
  {
    field: 'residents',
    headerName: 'residents',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'films',
    headerName: 'films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]

export const speciesColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'name', width: 180 },
  { field: 'classification', headerName: 'classification', width: 180 },
  { field: 'designation', headerName: 'designation', width: 180 },
  { field: 'language', headerName: 'language', width: 180 },
  {
    field: 'homeworld',
    headerName: 'homeworld',
    width: 180,
    renderCell: (params) => (
      <ResourceLink
        field={params.field}
        id={params.value?.id}
        name={params.value?.name}
      />
    ),
  },
  {
    field: 'people',
    headerName: 'people',
    width: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'films',
    headerName: 'films',
    width: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
]
