import { GridColDef } from '@mui/x-data-grid';
import { ListDisplay, ResourceLink } from './ResourceLinks';
import { formatNumber } from '../helpers';

export const filmColumnNames: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 1, minWidth: 250 },
  { field: 'episode_id', headerName: 'Episode Id', flex: 0.5, minWidth: 100 },
  { field: 'director', headerName: 'Director', flex: 1, minWidth: 150 },
  {
    field: 'release_date',
    headerName: 'Release date',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'characters',
    headerName: 'Characters',
    flex: 2,
    minWidth: 300,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'vehicles',
    headerName: 'Vehicles',
    flex: 1.5,
    minWidth: 350,
    renderCell: (params) => <ListDisplay params={params} />,
  },
];

export const peopleColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
  { field: 'gender', headerName: 'Gender', flex: 0.5, minWidth: 100 },
  {
    field: 'homeworld',
    headerName: 'Homeworld',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <ResourceLink field={params.field} name={params.value.name} id={params.value.id} />
    ),
  },
  {
    field: 'films',
    headerName: 'Films',
    flex: 2,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'species',
    headerName: 'Species',
    flex: 1.5,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'vehicles',
    headerName: 'Vehicles',
    flex: 1.5,
    minWidth: 300,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'starships',
    headerName: 'Starships',
    flex: 1.5,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
];

export const vehicleColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
  { field: 'model', headerName: 'Model', flex: 1, minWidth: 150 },
  { field: 'manufacturer', headerName: 'Manufacturer', flex: 1, minWidth: 250 },
  { field: 'vehicle_class', headerName: 'Vehicle class', flex: 1, minWidth: 150 },
  {
    field: 'films',
    headerName: 'Films',
    flex: 2,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'pilots',
    headerName: 'Pilots',
    flex: 1.5,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
];

export const starshipColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 300 },
  { field: 'model', headerName: 'Model', flex: 1, minWidth: 300 },
  { field: 'manufacturer', headerName: 'Manufacturer', flex: 1, minWidth: 250 },
  { field: 'starship_class', headerName: 'Starship class', flex: 1, minWidth: 150 },
  {
    field: 'films',
    headerName: 'Films',
    flex: 2,
    minWidth: 300,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'pilots',
    headerName: 'Pilots',
    flex: 1.5,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
];

export const planetColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
  { field: 'climate', headerName: 'Climate', flex: 1, minWidth: 150 },
  { field: 'terrain', headerName: 'Terrain', flex: 1, minWidth: 150 },
  {
    field: 'population',
    headerName: 'Population',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => formatNumber(params.value),
  },
  {
    field: 'residents',
    headerName: 'Residents',
    flex: 1.5,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'films',
    headerName: 'Films',
    flex: 2,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
];

export const speciesColumnNames: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
  { field: 'classification', headerName: 'Classification', flex: 1, minWidth: 150 },
  { field: 'language', headerName: 'Language', flex: 1, minWidth: 150 },
  {
    field: 'homeworld',
    headerName: 'Homeworld',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <ResourceLink field={params.field} id={params.value?.id} name={params.value?.name} />
    ),
  },
  {
    field: 'people',
    headerName: 'People',
    flex: 1.5,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
  {
    field: 'films',
    headerName: 'Films',
    flex: 2,
    minWidth: 250,
    renderCell: (params) => <ListDisplay params={params} />,
  },
];
