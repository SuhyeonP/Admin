import styled from '@emotion/styled';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Grid, Toolbar, Typography } from '@mui/material';
import Menu from '~/components/common/layout/menu/Menu';
import Header from '~/components/common/layout/header/Header';

const drawerWidth = 160;

const ManageLayoutWrapper = styled.div`
  overflow-y: hidden;
  .period-selection {
    position: relative;
  }
  .date-range-btn {
    display: flex;
    align-items: center;
  }
  .date-range-calendar {
    position: fixed;
    top: 250px;
    z-index: 999;
  }
`;

const ManageLayout = (): JSX.Element => {
  const path = useLocation().pathname.slice(1);

  return (
    <ManageLayoutWrapper>
      <Header />
      <Menu />
      <Box component="main" sx={{ flexGrow: 10, pl: drawerWidth / 8 }}>
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Grid container>
            <Grid xs={6} item>
              <Typography variant="h6">
                {path === 'alert'
                  ? '알림'
                  : path.includes('detail')
                  ? '소속 & 멤버관리 > 상세보기'
                  : '소속 & 멤버관리'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container sx={{ p: 3 }}>
          <Outlet />
        </Grid>
      </Box>
    </ManageLayoutWrapper>
  );
};

export default ManageLayout;
