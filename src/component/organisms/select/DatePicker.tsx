import React from 'react';
import { Grid, GridProps, styled } from '@mui/material';
import { DoubleButton, InputTitle, Picker } from '~/src/component/atoms';
import { ExtendOmit } from '~/src/util/types';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';

const DatePickerStyled = styled(Grid)`
  position: absolute;
  left: 0;
  bottom: -410px;
  display: inline-flex;
  background-color: white;

  width: 800px;
  height: 400px;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  padding: 24px 16px;

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
  onClose: () => void;
}

const DatePicker = ({
  date,
  setValue,
  onClose,
  ...props
}: IProps): JSX.Element => {
  const [origin, setOrigin] = React.useState(date);

  React.useEffect(() => {
    setOrigin(date);
  }, [date]);

  const setStartDate = React.useCallback(
    (ddd: Date) => {
      setValue('pickDateRange', [ddd, date[0]]);
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

  const cancel = React.useCallback(() => {
    setValue('pickDateRange', origin);
    onClose();
  }, [origin]);

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
        leftBtn={<DoubleButton onClick={cancel}>취소</DoubleButton>}
        rightBtn={
          <DoubleButton is_right onClick={onClose}>
            적용
          </DoubleButton>
        }
      />
    </DatePickerStyled>
  );
};

export default React.memo(DatePicker);
