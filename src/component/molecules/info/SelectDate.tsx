import React from 'react';
import styled from '@emotion/styled';
import { Box, Popover } from '@mui/material';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { BasicTitle, Picker } from '~/src/component/atoms';
import { makeSimpleDate } from '~/src/util';
import {
  defaultBlack,
  disableFontGray,
  disableBorderGray,
} from '~/src/component/style/color';
import { CalendarIcon } from '~/src/asset/icons';

interface IButtonStyledProps {
  editable: boolean;
}

const DateRangeButton = styled.button(
  ({ editable }: IButtonStyledProps) => `
  display: flex;
  align-items: center;

  width: 100%;
  height: 36px;
  padding-left: 14px;

  border: 1px solid ${editable ? defaultBlack : disableBorderGray};
  border-radius: 4px;
  outline: 0;

  background-color: inherit;
  
  .inner-button {
    background-color: ${editable ? defaultBlack : disableBorderGray};

    width: 36px;
    min-width: 36px;
    height: 100%;

    padding: 0;
  }
`,
);

interface IProps {
  label: string;
  name: string;
  setValue: any;
  value: string;
  editable: boolean;
}

const SelectDate = ({
  label,
  name,
  setValue,
  value,
  editable,
}: IProps): JSX.Element => {
  const [date, setDate] = React.useState<Date>(new Date(value));

  const [isVisibleCalendar, setIsVisibleCalendar] =
    React.useState<HTMLButtonElement | null>(null);

  const isOpen = React.useMemo(() => {
    return Boolean(isVisibleCalendar);
  }, [isVisibleCalendar]);

  React.useEffect(() => {
    setDate(new Date(value));
  }, [value]);

  React.useEffect(() => {
    setValue(name, makeSimpleDate(date));
  }, [date, name]);

  const openCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsVisibleCalendar(event.currentTarget);
  };

  const closeCalendar = () => {
    setIsVisibleCalendar(null);
  };

  return (
    <TextWithWrapper label={label} sx={{ position: 'relative' }}>
      <DateRangeButton
        type="button"
        onClick={openCalendar}
        disabled={!editable}
        editable={editable}
      >
        <BasicTitle
          fs="14px"
          lh="22px"
          weight={400}
          sx={{
            margin: 'auto 0',
            minWidth: '180px',
            flex: 1,
            textAlign: 'left',
            color: editable ? defaultBlack : disableFontGray,
          }}
        >
          {makeSimpleDate(date)}
        </BasicTitle>
        <Box className="inner-button" sx={{ display: 'table' }}>
          <Box display="table-cell" sx={{ verticalAlign: 'middle' }}>
            <CalendarIcon />
          </Box>
        </Box>
      </DateRangeButton>
      <Popover
        id="popover-date"
        open={isOpen}
        anchorEl={isVisibleCalendar}
        onClose={closeCalendar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Picker
          date={date}
          setDate={setDate}
          sx={{
            zIndex: 1,
            height: '300px',
          }}
        />
      </Popover>
    </TextWithWrapper>
  );
};

export default SelectDate;
