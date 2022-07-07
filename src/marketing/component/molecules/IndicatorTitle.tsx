import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types/form';
import styled from '@emotion/styled';
import Text from 'marketing/component/atom/Text';
import { colorPalette } from 'marketing/style/color';
import { IndicateDates, selectDays } from 'marketing/util/date';
import TooltipDetail from 'marketing/component/atom/TooltipDetail';
import UniqueCheck from 'marketing/component/atom/UniqueCheck';

const IndicatorTitleStyled = styled.div`
  display: flex;
  align-items: center;

  height: 16px;

  .select-date-range {
    display: flex;
    align-items: baseline;
  }
`;

const SelectStyled = styled(Select)`
  margin: 0 0 0 8px;
  height: 16px;

  #date-range-id {
    width: 35px;
    height: 16px;
    padding: 0 30px 0 0;
    min-height: 16px;

    color: ${colorPalette.link_blue};
  }

  .MuiSelect-select {
    font-size: 14px;
    line-height: 16px;
    color: ${colorPalette.background_gray};
  }

  .MuiOutlinedInput-notchedOutline {
    border: 0;
  }

  .MuiSelect-icon {
    top: 0;
    width: 16px;
    height: 16px;
  }
`;

interface IProps {
  title?: string;
  selectDate?: IndicateDates;
  setSelectDate?: React.Dispatch<React.SetStateAction<IndicateDates>>;
  tooltip?: string;
  unique?: UseFormRegisterReturn<any>;
}

const IndicatorTitle = ({
  selectDate,
  setSelectDate,
  title,
  tooltip,
  unique,
}: IProps): JSX.Element => {
  const onChange = React.useCallback(
    (e: any) => {
      if (setSelectDate) {
        setSelectDate(e.target.value as IndicateDates);
      }
    },
    [setSelectDate],
  );
  return (
    <IndicatorTitleStyled>
      {selectDate && (
        <div className="select-date-range">
          <Text
            fontSize="14px"
            lineHeight="16px"
            color={colorPalette.background_gray}
          >
            지난
          </Text>
          <SelectStyled
            value={selectDate}
            onChange={onChange}
            id="date-range-id"
          >
            {(Object.keys(selectDays) as IndicateDates[]).map(ele => (
              <MenuItem key={ele} value={ele}>
                {selectDays[ele]}
              </MenuItem>
            ))}
          </SelectStyled>
          <Text
            fontSize="14px"
            lineHeight="16px"
            color={colorPalette.background_gray}
          >
            이상 미사용자
          </Text>
        </div>
      )}
      {title && (
        <Text
          fontSize="14px"
          lineHeight="16px"
          color={colorPalette.background_gray}
        >
          {title}
        </Text>
      )}
      {tooltip && <TooltipDetail content={tooltip} />}
      {unique && <UniqueCheck register={unique} />}
    </IndicatorTitleStyled>
  );
};

export default React.memo(IndicatorTitle);
