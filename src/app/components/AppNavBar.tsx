import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'

import React from 'react'
import Link from 'next/link'

type AppNavBarProps = {
  activePage: string
}

const pages = [
  { name: 'films', path: '/films' },
  { name: 'people', path: '/people' },
  { name: 'vehicles', path: '/vehicles' },
  { name: 'starships', path: '/starships' },
]
// Navigation bar for the application that has links to all the the pages of the app
const AppNavBar = ({ activePage }: AppNavBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Star Wars
          </Typography>
        </IconButton>

        {pages.map((page, index) => (
          <Link key={index} href={page.path} passHref>
            <Button
              color={activePage.startsWith(page.path) ? 'secondary' : 'inherit'}
            >
              {page.name}
            </Button>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default AppNavBar
