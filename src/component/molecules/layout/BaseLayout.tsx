import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Grid, styled } from '@mui/material';
import { getTitleWithLabel } from '~/src/util/pageTitle';
import HeadLine from '~/src/component/molecules/menu/HeadLine';
import PageNavigator from '~/src/component/molecules/menu/PageNavigator';
import { BasicTitle, CustomDivider } from '~/src/component/atoms';
import { mainGray } from '~/src/component/style/color';
import { CustomDialog } from '~/src/component/molecules/layout/index';

const AreaStyled = styled(Box)`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const ContentStyled = styled(Box)`
  display: flex;

  flex-grow: 10;
`;

const MainContentStyled = styled(Box)`
  z-index: 1;

  flex: 1;
  padding: 40px 24px;

  background-color: ${mainGray};
`;

const BaseLayout = (): JSX.Element => {
  const split = useLocation()
    .pathname.split('/')
    .filter(ele => ele !== '');

  const [title, setTitle] = React.useState<string[]>(getTitleWithLabel(split));

  React.useEffect(() => {
    setTitle(getTitleWithLabel(split));
  }, [split[0], split[1], split[2]]);

  if (title.filter(ele => typeof ele !== 'string').length > 0) {
    return <Outlet />;
  }

  return (
    <>
      <Helmet>
        <title>{title[title.length - 1]}</title>
      </Helmet>
      <AreaStyled>
        <CustomDialog />
        <HeadLine />
        <ContentStyled>
          <PageNavigator />
          <MainContentStyled component="main">
            <Box>
              <Grid container>
                <Grid xs={6} item>
                  <BasicTitle fs="24px" weight={700} lh="28px" mb="20px">
                    {title[title.length - 1]}
                  </BasicTitle>
                  <BasicTitle fs="14px" weight={400} lh="16px">
                    {title.join(' > ')}
                  </BasicTitle>
                </Grid>
              </Grid>
              <CustomDivider sx={{ mt: '40px', mb: '16px' }} />
            </Box>
            <Grid container>
              <Outlet />
            </Grid>
          </MainContentStyled>
        </ContentStyled>
      </AreaStyled>
    </>
  );
};

export default BaseLayout;
