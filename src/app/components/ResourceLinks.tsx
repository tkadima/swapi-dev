import { Box, Button, Typography } from '@mui/material'
import { fieldNames } from '../helpers'
import Link from 'next/link'
import { useState } from 'react'

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
  const [showAll, setShowAll] = useState(false)
  const maxVisibleItems = 5

  if (params.value === undefined) return <div>Error</div>

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  return (
    <Box
      sx={{
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: showAll ? 200 : 'auto',
        overflowY: showAll ? 'auto' : 'hidden',
      }}
    >
      {params.value
        .slice(0, showAll ? params.value.length : maxVisibleItems)
        .map((val: any) => (
          <ResourceLink
            key={val.name + val.id}
            field={params.field}
            id={val.id}
            name={val.name}
          />
        ))}

      {params.value.length > maxVisibleItems && (
        <Button onClick={handleToggle} size="small">
          {showAll ? 'Show Less' : 'View More'}
        </Button>
      )}
    </Box>
  )
}
