import React from 'react';
import Calendar from 'react-calendar';
import { Grid, styled } from '@mui/material';

const PickerStyled = styled(Grid)`
  .react-calendar {
    border: 0;
  }
`;

interface IProps {
  date: Date;
  setDate: (ddd: Date) => void;
}

const Picker = ({ date, setDate }: IProps): JSX.Element => {
  return (
    <PickerStyled>
      <Calendar onChange={setDate} value={date} />
    </PickerStyled>
  );
};

export default Picker;
