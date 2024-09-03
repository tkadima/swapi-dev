import { Box, Typography } from '@mui/material'
import { fieldNames } from '../fetchers'
import Link from 'next/link'

export const ResourceLink = ({ field, id, name }: any) => {
  const fieldName = fieldNames[field]
  return (
    <Link href={`/${fieldName}/${id}`}>
      <Typography component="p" variant="subtitle1">
        {name}
      </Typography>
    </Link>
  )
}
export const ListDisplay = ({ params }: any) => {
  if (params.value === undefined) return <div>Error</div>
  return (
    <Box sx={{ margin: '10px', display: 'flex', flexDirection: 'column' }}>
      {params.value.map((val: any) => {
        return (
          <ResourceLink
            key={val.name + val.id}
            field={params.field}
            id={val.id}
            name={val.name}
          />
        )
      })}
    </Box>
  )
}
