import React from 'react';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import { AuthContext } from '~/model';

const Header = (): JSX.Element => {
  const { logout } = React.useContext(AuthContext);

  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="h5" noWrap component="div">
              Link Admin
            </Typography>
          </Grid>
          <Grid>
            <Button sx={{ color: 'white' }} onClick={logout}>
              Logout
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
