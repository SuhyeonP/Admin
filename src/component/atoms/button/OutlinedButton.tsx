import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { EmptyVoid, ExtendOmit, MouseEventVoid } from '~/src/util/types';
import { defaultBlack } from '~/src/component/style/color';

interface IBtnProps {
  bc?: string;
}

interface IProps extends IBtnProps, ExtendOmit<ButtonProps> {
  clickEvent: MouseEventVoid;
}

const ButtonStyled = styled(Button)(({ bc }: IBtnProps) => {
  return `
        color: ${bc};
        border: 1px solid ${bc};
    `;
});

const OutlinedButton = ({
  clickEvent,
  bc = defaultBlack,
  ...props
}: IProps): JSX.Element => {
  return (
    <ButtonStyled
      variant="outlined"
      onClick={clickEvent as EmptyVoid}
      bc={bc}
      {...props}
    />
  );
};

export default React.memo(OutlinedButton);
