import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider } from '~/src/component/atoms';
import {
  MemberBasic,
  PlanBlock,
  ProductKey,
  UsingHistory,
  TermsInfo,
} from '~/src/component/organisms/infoBlock';

const Member = (): JSX.Element => {
  const params = useParams().detail;
  const navigate = useNavigate();

  const [memberId, setMemberId] = React.useState<number>(-1);

  React.useEffect(() => {
    if (!isNaN(Number(params))) {
      setMemberId(Number(params));
    } else {
      navigate('/member/list');
    }
  }, []);

  return (
    <>
      <MemberBasic />
      <Divider />
      <PlanBlock />
      <Divider />
      <ProductKey />
      <Divider />
      <UsingHistory />
      <Divider />
      <TermsInfo />
    </>
  );
};

export default Member;
