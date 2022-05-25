import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Login', 'SignUp'];

const NavBar  = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" style={{backgroundColor: '#98BEC9'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/' style={{textDecoration: 'none', marginRight: 'auto'}}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: 'flex', color: 'white' }}
            >
              Be2Gether
            </Typography>
          </Link>
          
          {/*regular nav bar*/}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={`/${page.toLowerCase()}`} key={page} style={{ textDecoration: 'none' }}>
                <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'flex' }}
              >
                {page}
              </Button>
              </Link>
            ))}
          </Box>

          {/*hamburger nav bar*/}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={`/${page.toLowerCase()}`} key={page} style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="left">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


export default NavBar; 