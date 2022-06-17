import React from 'react';
import { Box, BoxProps, Grid, Typography } from '@mui/material';
import { Direction, ExtendOmit } from '~/model/common';

interface IProps extends ExtendOmit<BoxProps> {
  children: React.ReactNode;
  title: string;
  direction?: Direction;
  titleWidth?: string;
}

const TitleComponent = ({
  children,
  title,
  direction = 'Horizontal',
  titleWidth = '120px',
  ...props
}: IProps): JSX.Element => {
  const [isHorizontal] = React.useState(direction === 'Horizontal');
  return (
    <Box
      display="flex"
      flexDirection={isHorizontal ? 'row' : 'column'}
      alignItems="center"
      {...props}
      mb={2}
    >
      <Typography sx={{ minWidth: titleWidth, width: titleWidth }}>
        {title}
      </Typography>
      <Grid
        container
        alignItems="center"
        height="100%"
        sx={{ width: isHorizontal ? `calc(100% - ${titleWidth})` : '100%' }}
      >
        {children}
      </Grid>
    </Box>
  );
};

export default TitleComponent;
