import { DataGrid, GridColDef } from '@mui/x-data-grid'
import router from 'next/router';
import React, { MouseEvent } from 'react';

type TableViewProps = {
  columns: GridColDef[]
  rows: any[]
  title: string
}
const TableView = ({ title, rows, columns }: TableViewProps) => {
  function getRowId(row: any) {
    return row.url.split('/').slice(-2, -1)[0]
  }

  const handleRowClick = (rowData: any, e: MouseEvent<HTMLDivElement>) => {
    const resource = rowData.row.url.split('/').slice(-3, -1)[0];
    console.log('clicked row', rowData.row.url.split('/').slice(-3, -1));

    router.push(`/${resource}/${rowData.id}`);
  };

  return (
    <div>
      <h2>{title}</h2>
      <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        onRowClick={(row, e: any) => handleRowClick(row, e)}
      />
    </div>
  )
}
export default TableView
