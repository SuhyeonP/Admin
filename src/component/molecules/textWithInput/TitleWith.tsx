import { Grid, GridProps, styled } from '@mui/material';
import React from 'react';
import { ExtendOmit } from '~/src/util/types/componentType';
import { InputTitle } from '~/src/component/atoms';

interface IProps extends ExtendOmit<GridProps> {
  titleValue: string;
}

const TitleWithStyled = styled(Grid)`
  position: relative;

  padding-bottom: 30px;
`;

const TitleWith = ({ titleValue, children, ...props }: IProps): JSX.Element => {
  return (
    <TitleWithStyled container {...props}>
      <Grid container>
        <InputTitle title={titleValue} />
      </Grid>
      <Grid container>{children}</Grid>
    </TitleWithStyled>
  );
};

export default TitleWith;
