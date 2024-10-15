import { AppBar, Button, IconButton, Toolbar, Typography, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import Link from 'next/link'

type AppNavBarProps = {
  activePage: string
}

const pages = ['films', 'people']
const dropdownPages = ['vehicles', 'starships', 'planets', 'species']

const AppNavBar = ({ activePage }: AppNavBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Star Wars
          </Typography>
        </IconButton>

        {pages.map((page, index) => (
          <Link key={index} href={'/' + page} passHref>
            <Button
              color={activePage.startsWith('/' + page) ? 'secondary' : 'inherit'}
              sx={{ fontSize: '1rem' }}
            >
              {page.toLowerCase()}
            </Button>
          </Link>
        ))}

        {/* Dropdown for more pages */}
        <Button
          color="inherit"
          onClick={handleDropdownOpen}
          sx={{ fontSize: '1rem' }}
        >
          More
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleDropdownClose}
        >
          {dropdownPages.map((page, index) => (
            <Link key={index} href={'/' + page} passHref>
              <MenuItem
                onClick={handleDropdownClose}
                selected={activePage.startsWith('/' + page)}
              >
                {page.toLowerCase()}
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default AppNavBar
