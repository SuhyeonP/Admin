import React from 'react';
import { Controller } from 'react-hook-form';
import { Box, MenuItem, Select } from '@mui/material';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { BasicTitle } from '~/src/component/atoms';
import { makeSimpleDate } from '~/src/util';
import { DatePicker } from '~/src/component/organisms/select/index';
import { CalendarIcon } from '~/src/asset/icons';
import { SelectWrapperStyled } from '~/src/component/organisms/select/styles';
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

interface IProps extends ISelectedProps {
  setValue: any;
  isCompany?: boolean;
  //<TFieldName=FieldPath<IGetSelected> extends FieldPath<IGetSelected>>(name: TFieldName, value: UnpackNestedValue<FieldPathValue<IGetSelected, TFieldName>>, options?: SetValueConfig) => void
}

const SelectDateRange = ({
  control,
  setValue,
  isCompany = false,
}: IProps): JSX.Element => {
  const [isVisibleCalendar, setIsVisibleCalendar] = React.useState(false);

  const [arrayValue, setArrayValue] = React.useState(
    isCompany ? companyValues : membersValue,
  );

  React.useEffect(() => {
    setArrayValue(isCompany ? companyValues : membersValue);
  }, [isCompany]);

  const close = React.useCallback(() => {
    setIsVisibleCalendar(false);
  }, []);

  const openCalendar = React.useCallback(() => {
    setIsVisibleCalendar(prev => !prev);
  }, []);

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
              <Box onClick={openCalendar} sx={{ display: 'table', flex: 1 }}>
                <BasicTitle
                  fs="14px"
                  lh="22px"
                  weight={400}
                  sx={{
                    minWidth: '180px',
                    display: 'table-cell',
                    verticalAlign: 'middle',
                  }}
                >
                  {`${makeSimpleDate(field.value[0])} ~ ${makeSimpleDate(
                    field.value[1],
                  )}`}
                </BasicTitle>
              </Box>
              <button
                className="inner-button"
                onClick={openCalendar}
                type="button"
              >
                <CalendarIcon />
              </button>
              {isVisibleCalendar && (
                <DatePicker
                  className="pop-over-calendar"
                  date={field.value}
                  setValue={setValue}
                  onClose={close}
                />
              )}
            </>
          )}
        />
      </SelectWrapperStyled>
    </TextWithWrapper>
  );
};

export default SelectDateRange;
