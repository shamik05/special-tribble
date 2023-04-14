import React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';

const Profile = styled(Avatar)({
  bgcolor: '#f44336',
});

function Root() {
  return (
    <>
      <header>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              BorderBass: Your fin-tastic immigration solution
            </Typography>
            <IconButton aria-label="Profile">
              <Profile>
                <Person />
              </Profile>
            </IconButton>
          </Toolbar>
        </AppBar>
      </header>
      <Outlet />
    </>
  );
}

export default Root;
