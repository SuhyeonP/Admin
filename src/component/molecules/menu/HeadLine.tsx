import React from 'react';
import { Box, styled, Toolbar } from '@mui/material';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { BasicTitle, OutlinedButton, Title } from '~/src/component/atoms';
import { LinkLogo } from '~/src/asset/icons';

const HeaderStyled = styled(Box)`
  width: 100%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 3;

  & > .MuiPaper-root {
    top: 0;
    left: 0;
    background-color: #fff;

    height: 64px;
    width: 100vw;
  }
`;

const ToolBarStyled = styled(Toolbar)`
  width: calc(100% - 48px);
`;

const HeadInner = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const HeadLine = (): JSX.Element => {
  const navigate = useNavigate();

  const [userInfo] = React.useState({
    email: 'sjkdfhksdf@dkjsf.sdf',
    admin: 'super',
  });

  const logout = React.useCallback((e: MouseEvent) => {
    e.preventDefault();
    navigate('/login');
  }, []);

  return (
    <HeaderStyled display="flex">
      <ToolBarStyled>
        <HeadInner>
          <Box display="inline-flex" alignItems="center">
            <LinkLogo
              css={css`
                width: 38px;
                height: 35px;
                margin-right: 15px;
              `}
            />
            <Title>Admin</Title>
          </Box>
          <Box display="inline-flex" alignItems="center">
            <Box
              display="inline-flex"
              flexDirection="column"
              textAlign="right"
              mr="16px"
            >
              <BasicTitle fs="16px" weight={400} lh="19px" mb="2px">
                {userInfo.email}
              </BasicTitle>
              <BasicTitle fs="16px" weight={400} lh="19px" fc="#787579">
                {userInfo.admin} admin
              </BasicTitle>
            </Box>
            <OutlinedButton clickEvent={logout}>로그아웃</OutlinedButton>
            {/*<Button onClick={logout}>로그아웃</Button>*/}
          </Box>
        </HeadInner>
      </ToolBarStyled>
    </HeaderStyled>
  );
};

export default HeadLine;
