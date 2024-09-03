import { Box, Button, Typography } from '@mui/material'
import { fieldNames } from '../helpers'
import Link from 'next/link'
import { useState } from 'react'

export const ResourceLink = ({ field, id, name }: any) => {
  const fieldName = fieldNames[field]
  return (
    <Link href={`/${fieldName}/${id}`}>
      <Typography id="resource-link"  component="p" variant="subtitle1">
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
            name={val.name}
            id={val.id}
          />
        ))}

      {params.value.length > maxVisibleItems && (
        <Button id="show-all-btn" onClick={handleToggle} size="small">
          {showAll ? 'Show Less' : 'View More'}
        </Button>
      )}
    </Box>
  )
}
