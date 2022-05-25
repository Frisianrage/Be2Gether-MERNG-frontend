import React, { useContext, useState } from 'react';
import {useQuery} from '@apollo/client'
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/auth'
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
import { MAP_CHAT_CHECK } from '../../utils/graphql/queries'


const AuthNavBar  = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { logout } = useContext(AuthContext)

  const { data } = useQuery(MAP_CHAT_CHECK, {
    onCompleted: () => {
        if(!data.chat){
          console.log('true')
        }
    },
    onError: (e) => {
        console.log(e)
        //history.push('/404')
    }
});
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout()
  }


  return (
    <AppBar position="static" style={{backgroundColor: '#98BEC9'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/' style={{textDecoration: 'none',color: 'white', marginRight: 'auto'}}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: 'flex' }}
            >
              Be2Gether
            </Typography>
          </Link>
          
          {/*regular nav bar*/}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Link to={'/profile'} style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white !important' , display: 'flex' }}
              >
                Profile
              </Button>
            </Link>
            <Link to={'/chat'} style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white !important' , display: 'flex' }}
              >
                Chat
              </Button>
            </Link>
            <Link to={'/map'} style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white !important' , display: 'flex' }}
              >
                Map
              </Button>
            </Link>
            <Link to={`/`} style={{ textDecoration: 'none' }}>
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: 'white !important' , display: 'flex' }}
              >
                Logout
              </Button>
            </Link>
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
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to={'/profile'} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white !important' , display: 'flex' }}
                >
                  Profile
                </Button>
              </Link>
              <Link to={(data?.chat) ? ('/chat') : ('#')} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white !important' , display: 'flex' }}
                >
                  Chat
                </Button>
              </Link>
              <Link to={(data?.map) ? ('/map') : ('#')} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white !important' , display: 'flex' }}
                >
                  Map
                </Button>
              </Link>
              <Link to={`/`} style={{ textDecoration: 'none' }}>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="left">Logout</Typography>
              </MenuItem>
            </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


export default AuthNavBar; 