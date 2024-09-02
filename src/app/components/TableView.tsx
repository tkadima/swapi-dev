import { DataGrid, GridColDef } from "@mui/x-data-grid";
type TableViewProps = {
    columns: GridColDef[];
    rows: any[];
    title: string;
}
const TableView = ({title, rows, columns}: TableViewProps) => {

  function getRowId(row: any) {
    return row.url.split('/').slice(-2, -1)[0]; 
  }

    return <div>
        <h2>{title}</h2>
        <DataGrid
        rows={rows}
        getRowId={getRowId}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
      />
        </div>
}
export default TableView; 