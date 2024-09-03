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
    console.log('target', target)

    const resource = rowData.row.url.split('/').slice(-3, -1)[0]

    if (target.tagName === 'P') {
      // Stop the event propagation and return
      e.stopPropagation()
      return
    }

    if (target.tagName === 'P') {
      const anchorTarget = target as HTMLAnchorElement
      router.push(anchorTarget.href)
    } else {
      router.push(`/${resource}/${rowData.id}`)
    }
  }

  const calculateRowHeight = (params: any) => {
    console.log('params', params)
    return 300
  }

  return (
    <div className="table-view">
      <h2>{title}</h2>
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
        rowHeight={200}
      />
    </div>
  )
}
export default TableView
