import React from 'react';
import styled from '@emotion/styled';
import PageInfo from 'marketing/component/molecules/PageInfo';
import UserGroupDateRange from 'marketing/component/organisms/userGroup/UserGroupDateRange';
import UserGroupBlocks from 'marketing/component/organisms/userGroup/UserGroupBlocks';

const UserGroupStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
const UserGroup = (): JSX.Element => {
  return (
    <UserGroupStyled>
      <PageInfo type="user_group" />
      <UserGroupDateRange />
      <React.Suspense fallback={<></>}>
        <UserGroupBlocks />
      </React.Suspense>
    </UserGroupStyled>
  );
};

export default UserGroup;
