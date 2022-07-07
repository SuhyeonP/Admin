import React from 'react';
import styled from '@emotion/styled';
import InformContent from 'marketing/component/atom/InformContent';

const base = '측정된 데이터는 대한민국 표준시(UTC+09:00) 기준으로 표시됩니다.';

type InfoType = 'dashboard' | 'user_group';

const infoType: Record<InfoType, string[]> = {
  dashboard: [
    '증감률은 조회 기간의 일수만큼 직전 기간과 증가, 감소 비율을 비교한 지표로, 미측정된 구간(서비스 시작 이전)의 데이터는 0으로 간주하여 계산됩니다.',
    '직전 기간의 데이터가 0인 경우, 증감률이 표시되지 않습니다.',
  ],
  user_group: ['조회 기간은 서비스 시작일부터 현재일까지로 상시 고정됩니다.'],
};

const PageInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IProps {
  type: InfoType;
}

const PageInfo = ({ type }: IProps): JSX.Element => {
  return (
    <PageInfoStyled>
      <InformContent content={base} />
      {infoType[type].map(ele => (
        <InformContent content={ele} key={ele} />
      ))}
    </PageInfoStyled>
  );
};

export default PageInfo;
