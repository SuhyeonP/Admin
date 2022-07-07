import React from 'react';
import { Grid, GridProps, styled as muiStyle } from '@mui/material';
import { UseFormSetValue } from 'react-hook-form';
import styled from '@emotion/styled';
import Picker from 'marketing/component/atom/Picker';
import { ExtendOmit } from '~/util/types';
import FormTitle from 'marketing/component/molecules/TextStyle/FormTitle';

const DataPickerWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 700px;
`;

const DatePickerStyled = muiStyle(Grid)`
  z-index: 1;

  display: inline-flex;

  width: 650px;

  padding: 24px 16px;
  border-radius: 4px;

  background-color: white;

  .date-picker-wrapper {
    display: flex;

    justify-content: space-between;
  }

  .date-wrapper {
    display: inline-flex;
    flex-direction: column;
    width: 45%;
  }
`;

interface IProps extends ExtendOmit<GridProps> {
  start_date: Date;
  end_date: Date;
  setValue: UseFormSetValue<any>;
}

const DatePicker = ({
  start_date,
  end_date,
  setValue,
  ...props
}: IProps): JSX.Element => {
  const setStartDate = React.useCallback(
    (ddd: Date) => {
      if (ddd > end_date) {
        setValue('start_date', ddd);
        setValue('end_date', ddd);
      } else {
        setValue('start_date', ddd);
      }
    },
    [end_date],
  );

  const setEndDate = React.useCallback(
    (ddd: Date) => {
      if (ddd < start_date) {
        setValue('start_date', ddd);
        setValue('end_date', ddd);
      } else {
        setValue('end_date', ddd);
      }
    },
    [start_date],
  );

  return (
    <DataPickerWrapper>
      <DatePickerStyled container {...props}>
        <Grid container className="date-picker-wrapper">
          <Grid container className="date-wrapper">
            <FormTitle>시작</FormTitle>
            <Picker date={start_date} setDate={setStartDate} />
          </Grid>
          <Grid container className="date-wrapper">
            <FormTitle>종료</FormTitle>
            <Picker date={end_date} setDate={setEndDate} />
          </Grid>
        </Grid>
      </DatePickerStyled>
    </DataPickerWrapper>
  );
};

export default React.memo(DatePicker);
