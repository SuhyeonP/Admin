import React from 'react';
import {
  DivideSide,
  TitleWithEditWrapper,
} from '~/src/component/molecules/wrapper';
import { EditInputValue } from '~/src/component/molecules/info';
import { RegisterFormStyled } from '~/src/component/organisms/form/style';

const UsingHistory = (): JSX.Element => {
  const [info] = React.useState({
    first_use_date: '2020-01-03 14:00',
    last_use_date: '2021-01-02 13:00',
    product_type: 'python package',
    os: 'windows',
    python_version: '3.7',
    product_version: '0.5.2',
    product_last_update_date: '2022-02-03 13:00',
  });

  return (
    <RegisterFormStyled>
      <TitleWithEditWrapper title="제품키">
        <DivideSide
          leftElement={
            <EditInputValue
              editable={false}
              label="최초 제품 사용일"
              value={info.first_use_date}
            />
          }
          rightElement={
            <EditInputValue
              editable={false}
              label="최근 제품 사용일"
              value={info.last_use_date}
            />
          }
        />
        <DivideSide
          leftElement={
            <EditInputValue
              editable={false}
              label="제품 유형"
              value={info.product_type}
            />
          }
          rightElement={
            <EditInputValue editable={false} label="OS" value={info.os} />
          }
        />
        <DivideSide
          leftElement={
            <EditInputValue
              editable={false}
              label="Python 버전"
              value={info.python_version}
            />
          }
          rightElement={
            <EditInputValue
              editable={false}
              label="제품 버전"
              value={info.product_version}
            />
          }
        />

        <DivideSide
          rightElement={
            <EditInputValue
              editable={false}
              label="최근 제품 업데이트일"
              value={info.product_last_update_date}
            />
          }
        />
      </TitleWithEditWrapper>
    </RegisterFormStyled>
  );
};

export default UsingHistory;
