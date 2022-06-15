import React from 'react';
import { Box, styled } from '@mui/material';
import NavigateBox from '~/src/component/molecules/menu/NavigateBox';

const navigateMap = [
  {
    mainLabel: '회원',
    sub: [
      {
        label: '회원 조회',
        path: '/member/list',
      },
    ],
  },
  {
    mainLabel: '기업',
    sub: [
      {
        label: '기업 조회',
        path: '/company/list',
      },
    ],
  },
  {
    mainLabel: '운영',
    sub: [
      {
        label: '배포 관리',
        path: '/operation/deployment/list',
      },
      {
        label: '이메일 템플릿',
        path: '/operation/email-template/list',
      },
      {
        label: '이메일 발송',
        path: '/operation/send-email/list',
      },
    ],
  },
  {
    mainLabel: 'Admin',
    sub: [
      {
        label: '관리자 설정',
        path: '/admin/admin-setting',
      },
    ],
  },
];

const PageNavigatorStyled = styled(Box)`
  z-index: 2;

  width: 160px;

  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
`;

const PageNavigator = (): JSX.Element => {
  return (
    <PageNavigatorStyled>
      <Box sx={{ overflow: 'auth' }}>
        <Box display="flex" flexDirection="column">
          {navigateMap.map(ele => (
            <NavigateBox
              mainLabel={ele.mainLabel}
              sub={ele.sub}
              key={ele.mainLabel}
            />
          ))}
        </Box>
      </Box>
    </PageNavigatorStyled>
  );
};

export default PageNavigator;
