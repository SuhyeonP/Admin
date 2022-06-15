import React from 'react';
import Calendar from 'react-calendar';
import { Grid, GridProps, styled } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';

const PickerStyled = styled(Grid)`
  .react-calendar {
    border: 0;
  }
`;

interface IProps extends ExtendOmit<GridProps> {
  date: Date;
  setDate: (ddd: Date) => void;
}

const Picker = ({ date, setDate, ...props }: IProps): JSX.Element => {
  const check = React.useCallback((locale: string, date: Date) => {
    return new Date(date).getDate().toString();
  }, []);

  return (
    <PickerStyled {...props}>
      <Calendar
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => check(locale, date)}
      />
    </PickerStyled>
  );
};

export default Picker;
