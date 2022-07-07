import React from 'react';
import {
  styled as muiStyled,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { UseFormSetValue } from 'react-hook-form';
import { compareDate } from 'date-preset';
import { css } from '@emotion/react';
import { DateRange, dateRange, IDateArray } from 'marketing/util/date';
import { colorPalette } from 'marketing/style/color';
import { CheckIcon } from '~/shared/asset/icon';

const DatePresetStyled = muiStyled(ToggleButtonGroup)`
  display: flex;
  flex-direction: column;
  
  width: 180px;
  min-width: 180px;
  max-width: 180px;
  
  height: 36px;
  
  border: 0;
  
  .MuiToggleButton-root.Mui-selected {
    background-color: ${colorPalette.default_white};
  }
  
  .MuiToggleButton-root {
    display: flex;
    border: 0;
    padding: 10px 16px;
    justify-content: left;
    white-space: nowrap;
  }
  .predefined-list {
    display: inline-flex;
    justify-content: space-between;
  }
`;

interface IProps {
  dates: IDateArray[];
  setValue: UseFormSetValue<any>;
  selects: [Date, Date];
}

const DatePreset = ({ dates, setValue, selects }: IProps): JSX.Element => {
  const [selected, setSelected] = React.useState<DateRange | ''>('');
  const selectDateSet = (_: React.MouseEvent<HTMLElement>, type: DateRange) => {
    if (type) {
      const [start, end] = dateRange[type];
      setValue('start_date', start);
      setValue('end_date', end);
      setSelected(type);
    }
  };

  React.useEffect(() => {
    if (selected !== '') {
      const [start, end] = dateRange[selected];
      const [selected_start, selected_end] = selects;

      if (
        !compareDate(start, selected_start, { except_time: true }) ||
        !compareDate(end, selected_end, { except_time: true })
      ) {
        setSelected('');
      }
    }
  }, [selects]);

  React.useEffect(() => {
    const [selected_start, selected_end] = selects;

    for (let i = 0; i < dates.length; i++) {
      const [start, end] = dateRange[dates[i].value];

      if (
        compareDate(start, selected_start, { except_time: true }) &&
        compareDate(end, selected_end, { except_time: true })
      ) {
        setSelected(dates[i].value);
        return;
      }
    }
  }, []);

  return (
    <DatePresetStyled
      onChange={selectDateSet}
      value={selected}
      exclusive
      color="primary"
    >
      {dates.map(date => (
        <ToggleButton
          value={date.value}
          key={date.value}
          className="predfined-list"
        >
          <span className="predefined-cell">{date.label}</span>
          {selected === date.value && (
            <CheckIcon
              css={css`
                width: 16px;
                height: 16px;
              `}
            />
          )}
        </ToggleButton>
      ))}
    </DatePresetStyled>
  );
};

export default DatePreset;
