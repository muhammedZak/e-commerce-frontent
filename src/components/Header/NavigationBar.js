import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
} from '@mui/material';
import { toast } from 'react-toastify';

import SearchAppBar from './SearchAppBar';
import { logout } from '../../store/slices/authSlice';
import { logoutUser } from '../../store/slices/usersSlice';

const pages = ['Men', 'Women', 'Watches'];

const NavigationBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [status, setStatus] = useState('idle');

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    try {
      setStatus('pending');
      const res = await dispatch(logoutUser()).unwrap();
      dispatch(logout(res));
      navigate('/login');
      toast.success('Successfully loggedout !', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error(err?.message || err.error);
    } finally {
      setStatus('idle');
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (label) => {
    setAnchorElUser(null);
    if (label === 'Logout') {
      onLogoutClick();
    }
  };

  return (
    <AppBar sx={{ backgroundColor: 'purple' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/">SHOPPERS</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to="/watches/Men">Men</Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/watches/Women">
                  <Typography textAlign="center">Women</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/watches">
                  <Typography textAlign="center">Watches</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SHOPPERS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page === 'Watches' ? '/watches' : `/watches/${page}`}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <div>
            <SearchAppBar />
          </div>

          <Badge sx={{ mr: 2 }} badgeContent={totalItems} color="secondary">
            <IconButton
              component={Link}
              to="/cart"
              color="white"
              aria-label="add to shopping cart"
            >
              <ShoppingCartIcon sx={{ color: 'white' }} />
            </IconButton>
          </Badge>
          {userInfo ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  sx={{ my: 2 }}
                  component={Link}
                  to="/profile"
                  onClick={() => handleCloseUserMenu('Profile')}
                >
                  <PersonIcon sx={{ mr: 2 }} />
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  sx={{ my: 2 }}
                  component={Link}
                  to={
                    userInfo.role === 'admin' ? '/admin/orderslist' : '/orders'
                  }
                  onClick={() => handleCloseUserMenu('Orders')}
                >
                  <LocalMallIcon sx={{ mr: 2 }} />
                  <Typography textAlign="center">Orders</Typography>
                </MenuItem>
                {userInfo.role === 'admin' && (
                  <>
                    <MenuItem
                      sx={{ my: 2 }}
                      component={Link}
                      to="/admin/userslist"
                      onClick={() => handleCloseUserMenu('Users')}
                    >
                      <LocalMallIcon sx={{ mr: 2 }} />
                      <Typography textAlign="center">Users</Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/admin/productslist"
                      onClick={() => handleCloseUserMenu('Users')}
                    >
                      <LocalMallIcon sx={{ mr: 2 }} />
                      <Typography textAlign="center">Products</Typography>
                    </MenuItem>
                  </>
                )}
                <MenuItem
                  sx={{ my: 2 }}
                  onClick={() => handleCloseUserMenu('Logout')}
                >
                  <LogoutIcon sx={{ mr: 2 }} />
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
