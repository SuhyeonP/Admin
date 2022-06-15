import React from 'react';
import { Controller } from 'react-hook-form';
import { Box, MenuItem, Popover, Select } from '@mui/material';
import styled from '@emotion/styled';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { BasicTitle } from '~/src/component/atoms';
import { makeSimpleDate } from '~/src/util';
import { DatePicker } from '~/src/component/molecules/select/index';
import { CalendarIcon } from '~/src/asset/icons';
import { SelectWrapperStyled } from '~/src/component/molecules/select/styles';
import { ISelectedProps } from '~/src/util/types';

const membersValue = [
  {
    label: '회원 생성일',
    value: 'memberCreated',
  },
  {
    label: '최근 사용일',
    value: 'lastUsed',
  },
  {
    label: '최근 마케팅 동의일',
    value: 'lastAgreeMarketing',
  },
];

const companyValues = [
  {
    label: '기업 생성일',
    value: 'companyCreated',
  },
  {
    label: '라이선스 시작일',
    value: 'issueDate',
  },
  {
    label: '라이선스 종료일',
    value: 'endDate',
  },
];

const DateButtonStyled = styled.button`
  display: flex;
  flex: 1;
  border: 0;

  background: inherit;
  outline: 0;
`;

interface IProps extends ISelectedProps {
  setValue: any;
  isCompany?: boolean;
  origin: [Date, Date];
}

const SelectDateRange = ({
  control,
  setValue,
  isCompany = false,
  origin,
}: IProps): JSX.Element => {
  const [copy, setCopy] = React.useState(origin);

  const [isVisibleCalendar, setIsVisibleCalendar] =
    React.useState<HTMLButtonElement | null>(null);

  const clickDateRange = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsVisibleCalendar(event.currentTarget);
  };

  const close = () => {
    setIsVisibleCalendar(null);
    setValue('pickDateRange', copy);
  };

  const openCalendar = React.useMemo(() => {
    return Boolean(isVisibleCalendar);
  }, [isVisibleCalendar]);

  const [arrayValue, setArrayValue] = React.useState(
    isCompany ? companyValues : membersValue,
  );

  const handleDate = React.useCallback(() => {
    setIsVisibleCalendar(null);
    setCopy(origin);
  }, [origin]);

  React.useEffect(() => {
    setArrayValue(isCompany ? companyValues : membersValue);
  }, [isCompany]);

  return (
    <TextWithWrapper label="기간 설정">
      <SelectWrapperStyled sx={{ position: 'relative' }}>
        <Controller
          name="selectDateRange"
          control={control}
          render={({ field }) => (
            <Select
              fullWidth
              {...field}
              sx={{ minWidth: '180px', maxWidth: '180px' }}
            >
              {arrayValue.map(ele => (
                <MenuItem value={ele.value} key={ele.value}>
                  {ele.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="pickDateRange"
          control={control}
          render={({ field }) => (
            <>
              <DateButtonStyled type="button" onClick={clickDateRange}>
                <BasicTitle
                  fs="14px"
                  lh="22px"
                  weight={400}
                  sx={{
                    margin: 'auto 0',
                    minWidth: '180px',
                    flex: 1,
                    textAlign: 'left',
                  }}
                >
                  {`${makeSimpleDate(field.value[0])} ~ ${makeSimpleDate(
                    field.value[1],
                  )}`}
                </BasicTitle>
                <Box className="inner-button" sx={{ display: 'table' }}>
                  <Box display="table-cell" sx={{ verticalAlign: 'middle' }}>
                    <CalendarIcon />
                  </Box>
                </Box>
              </DateButtonStyled>
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
                <DatePicker
                  className="pop-over-calendar"
                  date={field.value}
                  setValue={setValue}
                  close={close}
                  handleDate={handleDate}
                />
              </Popover>
            </>
          )}
        />
      </SelectWrapperStyled>
    </TextWithWrapper>
  );
};

export default SelectDateRange;
