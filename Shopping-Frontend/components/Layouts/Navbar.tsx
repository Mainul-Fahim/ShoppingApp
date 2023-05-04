import * as React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Meta from "./Meta";
import Link from "next/link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

//Navigation bar
const Navbar = ({ auth: { isAuthenticated }, logout, user }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //user profile link
  const authLinks = (
    <Button style={{ borderRadius: '50%' }}>
      <Link href='/'><p>{user?.name}</p></Link>
    </Button>
  );
  //guest login link
  const guestLinks = (
    <Button className="textColor" color="inherit">
      <Link href="/auth/login">Login</Link>
    </Button>
  );
  return (
    <>
      {/* @ts-ignore */}
      <Meta />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="navbar">
          <Toolbar>
            <IconButton
              className="themeColor"
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 0 }}
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link href="/items">
                  Add Item
                </Link>
              </MenuItem>

              {isAuthenticated && <MenuItem onClick={handleClose}>
                <Link href="/auth/login">
                  <a onClick={logout}>Logout</a>
                </Link>
              </MenuItem>}
            </Menu>
            <Typography
              className="textColor"
              variant="h6"
              sx={{ flexGrow: 1 }}
            >
              <Link href="/">Shopping App</Link>
            </Typography>
            <Typography
              // className="textColor"
              variant="h6"
              sx={{ flexGrow: 1, marginLeft: 'auto' }}
            >
              {user?.email}
            </Typography>
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
