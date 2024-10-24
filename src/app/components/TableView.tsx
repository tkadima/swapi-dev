import { Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import router from 'next/router'
import React, { MouseEvent } from 'react'

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
    const target = e.target as HTMLElement
    const resource = rowData.row.url.split('/').slice(-3, -1)[0]

    if (target.id === 'resource-link' || target.id === 'show-all-btn') {
      // Stop the event propagation and return
      e.stopPropagation()
      return
    }

    if (target.id === 'resource-link') {
      const anchorTarget = target as HTMLAnchorElement
      router.push(anchorTarget.href)
    } else {
      router.push(`/${resource}/${rowData.id}`)
    }
  }

  return (
    <div className="table-view">
      <Typography component="h2" className="table-title">
        {title}
      </Typography>
      <DataGrid
        className="table"
        rows={rows}
        getRowId={getRowId}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        onRowClick={(row, e: any) => handleRowClick(row, e)}
        rowHeight={150}
        sx={{
          '& .MuiDataGrid-root': {
            width: '100%',
            minWidth: '0',
          },
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          },
        }}
      />
    </div>
  )
}
export default TableView
