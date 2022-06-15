import React from 'react';
import { Grid, GridProps, styled } from '@mui/material';
import { DoubleButton, InputTitle, Picker } from '~/src/component/atoms';
import { ExtendOmit } from '~/src/util/types';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';

const DatePickerStyled = styled(Grid)`
  z-index: 1;

  display: inline-flex;

  width: 800px;
  height: 400px;

  padding: 24px 16px;
  border-radius: 4px;

  background-color: white;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

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
  date: [Date, Date];
  setValue: any;
  close: () => void;
  handleDate: () => void;
}

const DatePicker = ({
  date,
  setValue,
  close,
  handleDate,
  ...props
}: IProps): JSX.Element => {
  const setStartDate = React.useCallback(
    (ddd: Date) => {
      const temp = date;

      if (ddd > date[1]) {
        temp[0] = ddd;
        temp[1] = ddd;
      } else {
        temp[0] = ddd;
      }

      setValue('pickDateRange', temp);
    },
    [date],
  );

  const setEndDate = React.useCallback(
    (ddd: Date) => {
      const temp = date;

      if (ddd < date[0]) {
        temp[0] = ddd;
        temp[1] = ddd;
      } else {
        temp[1] = ddd;
      }

      setValue('pickDateRange', temp);
    },
    [date],
  );

  return (
    <DatePickerStyled container {...props}>
      <Grid container className="date-picker-wrapper">
        <Grid container className="date-wrapper">
          <InputTitle>시작</InputTitle>
          <Picker date={date[0]} setDate={setStartDate} />
        </Grid>
        <Grid container className="date-wrapper">
          <InputTitle>종료</InputTitle>
          <Picker date={date[1]} setDate={setEndDate} />
        </Grid>
      </Grid>
      <DoubleButtonWrapper
        leftBtn={<DoubleButton onClick={close}>취소</DoubleButton>}
        rightBtn={
          <DoubleButton is_right onClick={handleDate}>
            적용
          </DoubleButton>
        }
      />
    </DatePickerStyled>
  );
};

export default React.memo(DatePicker);
