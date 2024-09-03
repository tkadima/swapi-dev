import { Theme } from '@mui/material/styles';
import { Components } from '@mui/material/styles/components';

// This is needed in order to override the styles for MuiDataGrid
// within theme.ts because MUIDataGrid is part of the @mui/x-data-grid package
// not the @mui/material
declare module '@mui/material/styles' {
  interface Components extends Components<Theme> {
    MuiDataGrid?: any;
  }
}