import React from 'react';
import {
  DivideSide,
  TitleWithEditWrapper,
} from '~/src/component/molecules/wrapper';
import { FormStyled } from '~/src/globalStyles';
import { EditInputValue } from '~/src/component/molecules/info/index';

const ProductKey = (): JSX.Element => {
  const [info] = React.useState({
    product_key: 'skdfjk2dksjf2',
    status: '사용',
    create_date: '2022-06-08',
    end_date: '2023-06-08',
  });

  return (
    <FormStyled>
      <TitleWithEditWrapper title="제품키">
        <DivideSide
          leftElement={
            <EditInputValue
              editable={false}
              label="제품키"
              value={info.product_key}
            />
          }
          rightElement={
            <EditInputValue
              editable={false}
              label="제품키 상태"
              value={info.status}
            />
          }
        />
        <DivideSide
          leftElement={
            <EditInputValue
              editable={false}
              label="제품키 생성일"
              value={info.create_date}
            />
          }
          rightElement={
            <EditInputValue
              editable={false}
              label="제품키 만료일"
              value={info.end_date}
            />
          }
        />
      </TitleWithEditWrapper>
    </FormStyled>
  );
};

export default ProductKey;
