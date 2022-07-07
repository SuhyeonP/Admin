import React from 'react';
import Calendar, { ViewCallbackProperties } from 'react-calendar';
import { Grid, GridProps, styled } from '@mui/material';
import { compareDate } from 'date-preset';
import { ExtendOmit } from '~/util/types';

const PickerStyled = styled(Grid)`
  display: inline-block;
  .react-calendar {
    border: 0;
    width: 312px;

    padding: 16px;

    .react-calendar__navigation {
      align-items: center;
      padding-bottom: 20px;
      margin-bottom: 0;
      height: 56px;
      .react-calendar__navigation__arrow {
        width: 24px;
        height: 40px;
        padding: 8px;
      }
      .react-calendar__navigation__label {
        .react-calendar__navigation__label__labelText {
          font-size: 14px;
        }
      }
    }
    .react-calendar__viewContainer {
      .react-calendar__month-view {
        & > div {
          width: 280px;

          & > div {
            .react-calendar__month-view__weekdays {
              & > div {
                width: 24px;
                height: 40px;
                padding: 8px;

                & > abbr {
                  width: 24px;
                  height: 24px;
                  line-height: 24px;
                  font-size: 14px;
                }
              }
            }
            .react-calendar__month-view__days {
              & > button {
                width: 24px;
                height: 40px;
                padding: 8px;

                & > abbr {
                  width: 24px;
                  height: 24px;
                  line-height: 24px;
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface IProps extends ExtendOmit<GridProps> {
  date: Date;
  setDate: (ddd: Date) => void;
}

const Picker = ({ date, setDate, ...props }: IProps): JSX.Element => {
  const origin = React.useRef(date);
  const check = React.useCallback((locale: string, date: Date) => {
    return new Date(date).getDate().toString();
  }, []);
  const [copy, setCopy] = React.useState(date);

  const changeDate = (value: Date, e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(value);
    origin.current = value;
  };

  const test = (props: ViewCallbackProperties) => {
    setCopy(props.activeStartDate);
  };

  React.useEffect(() => {
    console.log(compareDate(origin.current, date, { except_time: true }));
    if (!compareDate(origin.current, date, { except_time: true })) {
      setCopy(date);
    }
  }, [date]);

  return (
    <PickerStyled {...props}>
      <Calendar
        activeStartDate={copy}
        onActiveStartDateChange={test}
        onChange={changeDate}
        value={date}
        formatDay={(locale, date) => check(locale, date)}
        view="month"
        defaultView="month"
        navigationAriaLabel="test"
        calendarType="US"
        // inputRef={calendarRef}
      />
    </PickerStyled>
  );
};

export default React.memo(
  Picker,
  (prev, now) => prev.date.getTime() === now.date.getTime(),
);
