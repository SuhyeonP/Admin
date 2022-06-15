import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import { DoubleButton, SubmitBtn, SubTitle } from '~/src/component/atoms';
import { IChildren } from '~/src/util/types';
import { defaultWhite } from '~/src/component/style/color';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper/index';
import { AddMemberIcon } from '~/src/asset/icons';
import { CommonBoxStyled } from '~/src/globalStyles';

interface IProps extends IChildren {
  toggle?: () => void;
  title: string;
  isEditable?: boolean;
  notUsedStyle?: boolean;
  isAddMode?: boolean;
}

const BoxStyled = styled(Box)`
  width: 100%;
  margin-top: 16px;
  padding: 40px;
  border-radius: 8px;

  background: ${defaultWhite};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  .divide-group {
    margin-bottom: 20px;

    :last-child {
      margin-bottom: 0px;
    }
  }
`;

const TitleWithEditWrapper = ({
  toggle,
  title,
  children,
  isEditable,
  notUsedStyle = false,
  isAddMode = false,
}: IProps): JSX.Element => {
  return (
    <Grid container>
      <SubTitle mb="16px">{title}</SubTitle>
      {toggle && isEditable !== undefined && (
        <Grid container sx={{ justifyContent: 'flex-end' }}>
          {isEditable ? (
            <DoubleButtonWrapper
              rightBtn={
                <SubmitBtn btn_size="58px" isDoubleBtn label="저장" isAble />
              }
              leftBtn={
                <DoubleButton onClick={toggle} btn_size="58px">
                  취소
                </DoubleButton>
              }
            />
          ) : (
            <DoubleButton is_right onClick={toggle} btn_size="58px">
              {isAddMode ? (
                <>
                  <AddMemberIcon />
                  추가
                </>
              ) : (
                '편집'
              )}
            </DoubleButton>
          )}
        </Grid>
      )}
      {notUsedStyle ? (
        <CommonBoxStyled>{children}</CommonBoxStyled>
      ) : (
        <BoxStyled>{children}</BoxStyled>
      )}
    </Grid>
  );
};

export default React.memo(TitleWithEditWrapper);
