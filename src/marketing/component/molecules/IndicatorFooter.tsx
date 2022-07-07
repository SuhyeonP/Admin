import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import DownloadBtn from 'marketing/component/atom/DownloadBtn';

const IndicatorFooterStyled = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;

  width: 24px;
  height: 24px;
`;

interface IProps {
  download: () => void;
}

const IndicatorFooter = ({ download }: IProps): JSX.Element => {
  return (
    <IndicatorFooterStyled>
      <DownloadBtn download={download} styles={css``} />
    </IndicatorFooterStyled>
  );
};

export default React.memo(IndicatorFooter);
