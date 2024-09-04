import { Box, Button, Typography } from '@mui/material'
import { fieldNames } from '../helpers'
import Link from 'next/link'
import { useState } from 'react'

export const ResourceLink = ({ field, id, name }: any) => {
  const fieldName = fieldNames[field]
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Link href={`/${fieldName}/${id}`}>
        <Typography
          id="resource-link"
          component="p"
          variant="subtitle1"
          sx={(theme) => ({
            margin: 0,
            fontSize: '0.875rem',
            textDecorationColor: theme.palette.text.secondary,
            textDecoration: 'underline',
            color: theme.palette.text.secondary,
            '&:hover': {
              color: theme.palette.secondary.main,
            },
          })}
        >
          {name}
        </Typography>
      </Link>
    </Box>
  )
}
export const ListDisplay = ({ params }: any) => {
  const [showAll, setShowAll] = useState(false)
  const maxVisibleItems = 4

  if (params.value === undefined) return <div>Error</div>

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxHeight: showAll ? 200 : 'auto',
        overflowY: showAll ? 'auto' : 'hidden',
        height: '100%',
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
        <Button
          id="show-all-btn"
          onClick={handleToggle}
          size="small"
          sx={{
            alignSelf: 'start',
            padding: 0,
            textTransform: 'none',
            justifyContent: 'flex-start',
            fontSize: '0.875rem',
          }}
        >
          {showAll ? 'show less' : 'view more'}
        </Button>
      )}
    </Box>
  )
}
