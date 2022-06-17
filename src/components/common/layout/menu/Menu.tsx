import React from 'react';
import {
  Box,
  Drawer,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Menu = (): JSX.Element => {
  const navigate = useNavigate();
  const path = useLocation().pathname.slice(1);

  const movePath = React.useCallback(
    (move: string) => () => {
      navigate(move);
    },
    [],
  );
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          ['& .MuiDrawer-paper']: {
            width: 160,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <MenuList dense>
            <MenuItem onClick={movePath('/')}>
              <Typography
                component="p"
                color={
                  path === '' || path.includes('detail') ? 'blue' : 'default'
                }
              >
                회사 & 멤버 관리
              </Typography>
            </MenuItem>
            <MenuItem onClick={movePath('/alert')}>
              <Typography
                component="p"
                color={path === 'alert' ? 'blue' : 'default'}
              >
                알림
              </Typography>
            </MenuItem>
          </MenuList>
        </Box>
      </Drawer>
    </>
  );
};
export default Menu;
