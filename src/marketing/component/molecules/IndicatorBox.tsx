import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colorPalette } from 'marketing/style/color';
import Text from 'marketing/component/atom/Text';
import { ArrowUpwardIcon, ArrowDownwardIcon } from '~/shared/asset/icon';

const IndicatorBoxStyled = styled.div`
  margin-top: 40px;
  text-align: center;

  .rate-info-temp {
    font-weight: 700;
  }

  .increase-decrease-rate {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 27px;
    max-height: 27px;

    padding-top: 8px;
    margin-bottom: 48px;
  }
`;

interface IProps {
  count: number;
  before?: number;
}
const IndicatorBox = ({ count, before }: IProps): JSX.Element => {
  return (
    <IndicatorBoxStyled>
      <Text
        fontSize="24px"
        fontWeight="bold"
        lineHeight="28px"
        className="rate-info-temp"
        color={colorPalette.background_gray}
      >
        {String(count)}
      </Text>
      <div className="increase-decrease-rate">
        {before !== undefined && before === -999 && (
          <RemoveIcon
            css={css`
              width: 16px;
              height: 16px;
            `}
          />
        )}
        {before !== undefined && before !== -999 && (
          <>
            {before > 0 && (
              <ArrowUpwardIcon
                css={css`
                  width: 16px;
                  height: 16px;
                  color: red;
                `}
              />
            )}
            {before < 0 && (
              <ArrowDownwardIcon
                css={css`
                  width: 16px;
                  height: 16px;
                  color: ${colorPalette.link_blue};
                `}
              />
            )}
            <Text
              color={
                before === 0
                  ? colorPalette.background_gray
                  : before > 0
                  ? 'red'
                  : colorPalette.link_blue
              }
              fontSize="14px"
              lineHeight="16px"
              css={css`
                padding-left: 4px;
              `}
            >
              {Math.abs(before).toFixed(2)} %
            </Text>
          </>
        )}
      </div>
    </IndicatorBoxStyled>
  );
};

// 다른 indicator 들 바뀔때 얘는 값이 안바뀌니까
export default React.memo(IndicatorBox);
