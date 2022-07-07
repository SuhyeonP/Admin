import React from 'react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';
import { Tooltip } from '@mui/material';
import { GetAppOutlinedIcon } from '~/shared/asset/icon';
import { colorPalette } from 'marketing/style/color';

const DownloadButton = styled.button`
  width: 24px;
  height: 24px;
  border: 0;
  outline: 0;

  cursor: pointer;

  box-sizing: border-box;

  background-color: inherit;
`;

interface IProps {
  download: () => void;
  styles?: SerializedStyles;
}

const DownloadBtn = ({ download, styles }: IProps): JSX.Element => {
  return (
    <Tooltip title="Download CSV">
      <DownloadButton onClick={download} css={styles}>
        <GetAppOutlinedIcon htmlColor={colorPalette.background_gray} />
      </DownloadButton>
    </Tooltip>
  );
};

export default DownloadBtn;
