import React from 'react';
import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { BasicTitle, PathMove } from '~/src/component/atoms';

interface ISubProps {
  label: string;
  path: string;
}

interface IProps {
  mainLabel: string;
  sub: ISubProps[];
}

const NavigateBox = ({ sub, mainLabel }: IProps): JSX.Element => {
  const navigate = useNavigate();
  const path = useLocation().pathname.slice(1);

  const movePath = (go: string) => () => {
    navigate(go);
  };

  return (
    <Box width="100%">
      <BasicTitle fs="12px" weight={900} lh="14px" fc="#c2c2c2" p="10px 16px">
        {mainLabel}
      </BasicTitle>
      {sub.map(ele => (
        <PathMove
          now={ele.path === path}
          onClick={movePath(ele.path)}
          key={ele.label}
        >
          {ele.label}
        </PathMove>
      ))}
    </Box>
  );
};

export default NavigateBox;
