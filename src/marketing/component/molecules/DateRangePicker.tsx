import React from 'react';
import { Button, Popover } from '@mui/material';
import { Control, UseFormSetValue } from 'react-hook-form';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import DatePicker from 'marketing/component/molecules/DatePicker';
import { IStartEndDate } from 'marketing/api/marketingHandler';
import { makeSimpleDate } from '~/util/makeForm';
import DatePreset from 'marketing/component/atom/DatePreset';
import { date_preset } from 'marketing/util/date';
import { colorPalette } from 'marketing/style/color';
import DoubleButtonWrapper from 'marketing/component/atom/DoubleButtonWrapper';
import DoubleButton from 'marketing/component/atom/DoubleButton';
import DateRangeText from 'marketing/component/atom/DateRangeText';
import { CalendarTodayOutlinedIcon } from '~/shared/asset/icon';

interface IStyledProps {
  needicon: string;
}

const ButtonStyled = styled(Button)<IStyledProps>(({ needicon }) => {
  const common = css`
    display: inline-flex;
    justify-content: space-between;

    margin-top: 8px;
    border-radius: 4px;

    color: ${colorPalette.background_gray};
  `;

  const text = css`
    min-width: 158px;
    padding: 10px 16px;
  `;
  if (needicon === 'true') {
    return css`
      ${common};
      max-width: 258px;
      border: 1px solid ${colorPalette.border_gray};
      padding: 0;

      & > span {
        ${text};
      }

      .divider {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        width: 36px;
        height: 36px;

        border-left: 1px solid ${colorPalette.border_gray};
      }
    `;
  } else {
    return css`
      ${common};
      ${text};
      max-width: 201px;
    `;
  }
});

const DateRangePickerStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;

  .date-handler {
    display: flex;
  }
`;

interface IProps {
  setValue: UseFormSetValue<any>;
  setOriginDateValue: UseFormSetValue<IStartEndDate>;
  isCompany?: boolean;
  start_date: string;
  end_date: string;
  control: Control<any, any>;
  needIcon?: boolean;
}

const DateRangePicker = ({
  setValue,
  setOriginDateValue,
  start_date,
  end_date,
  needIcon = false,
}: IProps): JSX.Element => {
  const [copy, setCopy] = React.useState([
    new Date(start_date),
    new Date(end_date),
  ]);

  const [isVisibleCalendar, setIsVisibleCalendar] =
    React.useState<HTMLButtonElement | null>(null);

  const clickDateRange = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsVisibleCalendar(event.currentTarget);
  };

  const close = () => {
    setIsVisibleCalendar(null);
    setValue('start_date', copy[0]);
    setValue('end_date', copy[1]);
  };

  const openCalendar = React.useMemo(() => {
    return Boolean(isVisibleCalendar);
  }, [isVisibleCalendar]);

  const handleDate = React.useCallback(() => {
    setIsVisibleCalendar(null);
    const dateArr: [Date, Date] = [new Date(start_date), new Date(end_date)];
    setCopy(dateArr);
    setOriginDateValue('start_date', String(dateArr[0]));
    setOriginDateValue('end_date', String(dateArr[1]));
  }, [start_date, end_date]);

  return (
    <>
      <ButtonStyled onClick={clickDateRange} needicon={String(needIcon)}>
        <DateRangeText
          dates={[makeSimpleDate(start_date), makeSimpleDate(end_date)]}
        />
        {needIcon && (
          <p className="divider">
            <CalendarTodayOutlinedIcon
              htmlColor={colorPalette.background_gray}
              css={css`
                width: 16px;
                height: 16px;
              `}
            />
          </p>
        )}
      </ButtonStyled>
      <Popover
        id="popover-date-range"
        open={openCalendar}
        onClose={close}
        anchorEl={isVisibleCalendar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateRangePickerStyled>
          <div className="date-handler">
            <DatePreset
              dates={date_preset.date_range}
              setValue={setValue}
              selects={[new Date(start_date), new Date(end_date)]}
            />
            <DatePicker
              className="pop-over-calendar"
              start_date={new Date(start_date)}
              end_date={new Date(end_date)}
              setValue={setValue}
            />
          </div>
          <DoubleButtonWrapper
            leftBtn={<DoubleButton onClick={close}>취소</DoubleButton>}
            rightBtn={
              <DoubleButton is_right onClick={handleDate}>
                적용
              </DoubleButton>
            }
          />
        </DateRangePickerStyled>
      </Popover>
    </>
  );
};

export default DateRangePicker;
