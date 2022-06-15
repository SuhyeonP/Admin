import React from 'react';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SelectVersion } from '~/src/component/molecules/select';
import { IVersion } from '~/src/util/types';
import { UnderBtn } from '~/src/component/molecules/buttons';
import {
  DoubleButtonWrapper,
  TextWithWrapper,
} from '~/src/component/molecules/wrapper';
import { DoubleButton, ReleaseNote } from '~/src/component/atoms';
import { BoxStyled } from '~/src/globalStyles';

const DeployDialog = (): JSX.Element => {
  const { control, handleSubmit } = useForm<IVersion>({
    defaultValues: {
      version: '',
    },
  });

  const [temp, setTemp] = React.useState<any>();

  const save = (data: IVersion) => {
    console.log(data);
  };

  const submit = (data: IVersion) => {
    console.log(data);
    console.log(temp.getHTML());
  };

  return (
    <>
      <DialogTitle>배포 등록</DialogTitle>
      <DialogContent>
        <BoxStyled>
          <SelectVersion control={control} />
          <TextWithWrapper label="릴리즈 노트" marginTop="20px">
            <ReleaseNote setTemp={setTemp} />
          </TextWithWrapper>
        </BoxStyled>
      </DialogContent>
      <DialogActions sx={{ padding: '20px' }}>
        <UnderBtn
          leftBtnClick={handleSubmit(submit)}
          leftBtnLabel="배포"
          leftBtnSize="58px"
          rightBtnZone={
            <DoubleButtonWrapper
              rightBtn={
                <DoubleButton
                  btn_size="58px"
                  is_right
                  onClick={handleSubmit(save)}
                >
                  저장
                </DoubleButton>
              }
              leftBtn={
                <DoubleButton btn_size="58px" isCancel>
                  취소
                </DoubleButton>
              }
            />
          }
        />
      </DialogActions>
    </>
  );
};

export default DeployDialog;
