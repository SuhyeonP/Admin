import React from 'react';
import styled from '@emotion/styled';
import FormTitle from 'marketing/component/molecules/TextStyle/FormTitle';
import { dateRange } from 'marketing/util/date';
import DateRangeText from 'marketing/component/atom/DateRangeText';
import { makeSimpleDate } from '~/util/makeForm';
import { colorPalette } from 'marketing/style/color';

const DateRangeStyled = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 40px;

  .date-range-wrapper {
    display: flex;
    padding: 10px 16px;
    border: 1px solid ${colorPalette.border_gray};
    border-radius: 4px;
    margin-top: 8px;

    max-width: 185px;
    height: 16px;

    & > span {
      display: inline-block;
      font-weight: 500;
    }
  }
`;
const UserGroupDateRange = (): JSX.Element => {
  return (
    <>
      <DateRangeStyled>
        <FormTitle>조회 기간</FormTitle>
        <div className="date-range-wrapper">
          <DateRangeText
            dates={dateRange['entire'].map(ele => makeSimpleDate(ele))}
          />
        </div>
      </DateRangeStyled>
    </>
  );
};

export default UserGroupDateRange;
