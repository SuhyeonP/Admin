import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, DoubleButton } from '~/src/component/atoms';
import {
  MemberBasic,
  PlanBlock,
  ProductKey,
  UsingHistory,
  TermsInfo,
} from '~/src/component/molecules/info';
import { UnderBtn } from '~/src/component/molecules/buttons';
import CompanyBasic from '~/src/component/molecules/info/CompanyBasic';

const Member = (): JSX.Element => {
  const params = useParams().detail;
  const navigate = useNavigate();

  const [memberId, setMemberId] = React.useState<number>(-1);

  const gotoList = () => {
    navigate('/member/list');
  };

  React.useEffect(() => {
    if (!isNaN(Number(params))) {
      setMemberId(Number(params));
    } else {
      gotoList();
    }
  }, []);

  const archiveMember = () => {
    // todo dispatch
  };

  return (
    <>
      <MemberBasic />
      <Divider />
      <CompanyBasic isMember />
      <Divider />
      {/*todo 만약 기업멤버일 경우 버튼이 없으며 수정이 안됨*/}
      <PlanBlock isCompanyMember />
      <Divider />
      <ProductKey />
      <Divider />
      <UsingHistory />
      <Divider />
      <TermsInfo />
      <UnderBtn
        leftBtnLabel="회원아카이브"
        leftBtnClick={archiveMember}
        rightBtnZone={<DoubleButton onClick={gotoList}>목록으로</DoubleButton>}
      />
    </>
  );
};

export default Member;
