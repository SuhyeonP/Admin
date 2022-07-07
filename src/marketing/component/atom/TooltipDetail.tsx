import React from 'react';
import {
  IconButton,
  // styled as muiStyled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import Zoom from '@mui/material/Zoom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { HelpOutlineIcon } from '~/shared/asset/icon';
import { colorPalette } from 'marketing/style/color';
import Text from 'marketing/component/atom/Text';

const TooltipStyled = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',

  [`& .${tooltipClasses.arrow}`]: {
    color: colorPalette.default_white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'calc(240px - 32px)',
    padding: '16px',
    backgroundColor: colorPalette.default_white,
    color: colorPalette.default_black,
  },
}));

const IconButtonStyled = styled(IconButton)`
  width: 16px;
  height: 16px;

  margin-left: 5px;

  box-sizing: border-box;
`;

interface IProps {
  content: string;
}

const TooltipDetail = ({ content }: IProps): JSX.Element => {
  return (
    <TooltipStyled
      title={
        <Text
          stringToJSX
          color={colorPalette.background_gray}
          fontSize="14px"
          lineHeight="16px"
        >
          {content}
        </Text>
      }
      placement="bottom-start"
      arrow
      TransitionComponent={Zoom}
    >
      <IconButtonStyled>
        <HelpOutlineIcon
          css={css`
            width: 16px;
            height: 16px;
          `}
          htmlColor={colorPalette.title_gray}
        />
      </IconButtonStyled>
    </TooltipStyled>
  );
};

export default TooltipDetail;

// <>
//   {splitContent.map((content, idx) => (
//       <Text
//           display="flex"
//           key={idx}
//           color={colorPalette.background_gray}
//           fontSize="14px"
//       >
//         {content}
//       </Text>
//   ))}
// </>
