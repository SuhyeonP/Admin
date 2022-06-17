import React from 'react';
import { DateRange } from 'react-date-range';
import { Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ICustomerDataProps, IUserActionListRequest } from '~/model/store';
import { periodList } from '~/model/common';

const dateObject = [
  {
    label: '지난해',
    key: 'lastYear',
  },
  {
    label: '지난달',
    key: 'lastMonth',
  },
  {
    label: '이번달',
    key: 'thisMonth',
  },
  {
    label: '올해',
    key: 'thisYear',
  },
];

const PeriodForm = ({
  settingCustomersDetail,
  sorting,
}: ICustomerDataProps): JSX.Element => {
  const [date_range, setDR] = React.useState<Date[]>(periodList['thisMonth']);
  const [period, setPeriod] = React.useState('thisMonth');
  const [isVisible, setIsVisible] = React.useState(false);
  const [start, setStart] = React.useState<Date>(new Date(2021, 5, 1));
  const [end, setEnd] = React.useState<Date>(
    new Date(date_range[0].getFullYear() + 10, 11, 0),
  );

  const calendarRef = React.createRef<any>();

  const range = React.useMemo(() => {
    return [
      {
        startDate: date_range[0],
        endDate: date_range[1],
        key: 'selection',
      },
    ];
  }, [date_range]);

  const settingSortingDate = React.useCallback(
    (date: Date[]) => {
      setDR(date);

      const temp: IUserActionListRequest = {
        ...sorting,
        date_range: date,
      };
      settingCustomersDetail(temp);
    },
    [sorting],
  );

  const toggleCalendar = React.useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const changePeriod = React.useCallback(
    e => {
      const change = e.target.value;
      if (period === change) {
        setIsVisible(false);
        setPeriod('');
      }
      setPeriod(change);

      const date = periodList[change];
      settingSortingDate(date);
    },
    [sorting],
  );

  const formDate = React.useCallback((date: Date) => {
    const checkLength = (day: number) => {
      const copy = day.toString();
      if (copy.length === 2) {
        return copy;
      }
      return '0' + copy;
    };

    return (
      date.getFullYear() +
      '.' +
      checkLength(date.getMonth() + 1) +
      '.' +
      checkLength(date.getDate())
    );
  }, []);

  const handleDateRange = React.useCallback(
    ({ selection: { startDate, endDate } }) => {
      const date = [startDate, endDate];

      settingSortingDate(date);
      setPeriod('');
      if (calendarRef.current.state.focusedRange[1] === 1) {
        setIsVisible(false);
      }
    },
    [calendarRef],
  );

  return (
    <Grid
      xs={6}
      item
      container
      className="period-selection"
      direction="column"
      alignItems="flex-end"
    >
      <Grid>
        <ToggleButtonGroup
          size="small"
          onChange={changePeriod}
          value={period}
          exclusive
          color="primary"
        >
          {dateObject.map(date => (
            <ToggleButton value={date.key} key={date.key}>
              {date.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
      <Grid className="date-range-btn">
        <Button onClick={toggleCalendar}>
          {formDate(date_range[0])} ~ {formDate(date_range[1])}
        </Button>
      </Grid>
      <Grid
        className="date-range-calendar"
        sx={{ display: isVisible ? 'block' : 'none' }}
      >
        <DateRange
          dateDisplayFormat="yyyy.MM.dd"
          ranges={range}
          maxDate={end}
          minDate={start}
          onChange={handleDateRange}
          ref={calendarRef}
        />
      </Grid>
    </Grid>
  );
};

export default PeriodForm;
