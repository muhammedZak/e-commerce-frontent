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
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
// import {
//   FaBars,
//   FaShoppingBag,
//   FaShoppingCart,
//   FaSignOutAlt,
//   FaUser,
// } from 'react-icons/fa';
// import { IoCloseSharp } from 'react-icons/io5';

// import Dropdown from './Dropdown';
// import AdminDropdown from './AdminDropdown';
// import SearchBox from './SearchBox';
// import Offcanva from './Offcanvas';

const NavigationBar = () => {
  // // const [isOpen, setIsOpen] = useState(false);
  // const { cartItems } = useSelector((state) => state.cart);
  // const { userInfo } = useSelector((state) => state.auth);
  // const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // const handleClose = () => setIsOpen(false);

  // return (
  //   <header className="bg-gray-600">
  //     <div className="flex justify-between items-center p-4">
  //       <div className="text-2xl text-slate-300 font-semibold">
  //         <Link to="/">SHOPPERS</Link>
  //       </div>
  //       <div className="hidden md:block">
  //         <ul className="flex items-center gap-5 text-white text-lg ">
  //           <li>
  //             <Link to="/watches/Men" className="hover:text-gray-400">
  //               Men
  //             </Link>
  //           </li>
  //           <li>
  //             <Link to="/watches/Women" className="hover:text-gray-400">
  //               Women
  //             </Link>
  //           </li>
  //           <li>
  //             <Link to="/watches" className="hover:text-gray-400">
  //               Watches
  //             </Link>
  //           </li>
  //           <div>
  //             <SearchBox />
  //           </div>
  //         </ul>
  //       </div>
  //       <div>
  //         <div className="hidden md:flex gap-5 justify-center items-center">
  //           {userInfo?.role === 'admin' && (
  //             <div>
  //               <AdminDropdown />
  //             </div>
  //           )}
  //           <Link to="/cart" className="text-white text-lg hover:text-gray-400">
  //             <FaShoppingCart className="inline mb-1 mr-1 hover:text-gray-400" />
  //             Cart
  //             {totalItems > 0 && (
  //               <span className="absolute top-1 left-16 bg-red-500 text-gray-200 hover:text-white text-xs px-2 rounded-full">
  //                 {totalItems}
  //               </span>
  //             )}
  //           </Link>
  //           {userInfo ? (
  //             <div className="text-white text-lg hover:text-gray-400">
  //               <Dropdown userInfo={userInfo.name} />
  //             </div>
  //           ) : (
  //             <div className="text-white text-lg ">
  //               <Link className="hover:text-gray-400" to="/login">
  //                 Login
  //               </Link>
  //             </div>
  //           )}
  //         </div>
  //         <button
  //           onClick={() => setIsOpen(!isOpen)}
  //           type="button"
  //           className="block md:hidden"
  //         >
  //           {isOpen ? (
  //             <IoCloseSharp className="text-slate-300 w-10 font-semibold h-6  fill-current hover:text-white focus:text-white focus:outline-none" />
  //           ) : (
  //             <FaBars className="text-slate-300 w-10 font-semibold h-6  fill-current hover:text-white focus:text-white focus:outline-none" />
  //           )}
  //         </button>
  //       </div>
  //     </div>
  //     <Offcanva
  //       show={isOpen}
  //       handleClose={handleClose}
  //       totalItems={totalItems}
  //       userInfo={userInfo}
  //     />
  //   </header>
  // );
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
