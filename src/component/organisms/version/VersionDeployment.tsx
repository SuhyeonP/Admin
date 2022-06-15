import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VersionInfo } from '~/src/component/molecules/info';
import {
  Divider,
  DoubleButton,
  ReleaseNote,
  SubTitle,
} from '~/src/component/atoms';
import { UnderBtn } from '~/src/component/molecules/buttons';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';

const VersionDeployment = (): JSX.Element => {
  const [temp, setTemp] = React.useState<any>();
  const navigate = useNavigate();

  const submit = React.useCallback(
    (isSubmit: boolean) => () => {
      if (isSubmit) {
        console.log(temp.getHTML());
      } else {
        console.log(temp.getHTML());
      }
    },
    [temp],
  );

  return (
    <>
      <VersionInfo />
      <Divider />
      <SubTitle>릴리즈 노트</SubTitle>
      <ReleaseNote setTemp={setTemp} margin="10px 0 40px" />
      <UnderBtn
        leftBtnClick={submit(true)}
        leftBtnLabel="배포"
        leftBtnSize="58px"
        rightBtnZone={
          <DoubleButtonWrapper
            rightBtn={
              <DoubleButton btn_size="58px" is_right onClick={submit(false)}>
                저장
              </DoubleButton>
            }
            leftBtn={
              <DoubleButton
                btn_size="84px"
                onClick={() => navigate('/operation/deployment/list')}
              >
                목록으로
              </DoubleButton>
            }
          />
        }
      />
    </>
  );
};

export default VersionDeployment;
