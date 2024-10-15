import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from 'react'
import Link from 'next/link'
import { useTheme, useMediaQuery } from '@mui/material'

type AppNavBarProps = {
  activePage: string
}

const pages = ['films', 'people']
const dropdownPages = ['vehicles', 'starships', 'planets', 'species']

const AppNavBar = ({ activePage }: AppNavBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleDropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setDrawerOpen(open)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Star Wars
        </Typography>

        {isMobile ? (
          <>
            {/* Hamburger menu for mobile */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <List sx={{ width: 250 }}>
                {pages.map((page, index) => (
                  <Link key={index} href={'/' + page} passHref>
                    <ListItem
                      button
                      selected={activePage.startsWith('/' + page)}
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemText primary={page.toLowerCase()} />
                    </ListItem>
                  </Link>
                ))}

                <ListItem>
                  <Typography variant="subtitle1">More</Typography>
                </ListItem>

                {dropdownPages.map((page, index) => (
                  <Link key={index} href={'/' + page} passHref>
                    <ListItem
                      button
                      selected={activePage.startsWith('/' + page)}
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemText primary={page.toLowerCase()} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            {pages.map((page, index) => (
              <Link key={index} href={'/' + page} passHref>
                <Button
                  color={
                    activePage.startsWith('/' + page) ? 'secondary' : 'inherit'
                  }
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
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default AppNavBar
