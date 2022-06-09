import React from 'react';
import { TableCell } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableLabel } from '~/src/component/atoms';

interface IProps {
  txt: string;
  isUrl?: boolean;
  url?: string;
}

const BodyCell = ({ txt, url, isUrl = false }: IProps): JSX.Element => {
  const navigate = useNavigate();

  const goto = React.useCallback(() => {
    if (url) {
      navigate('/' + url);
    }
  }, [url]);

  return (
    <TableCell>
      {isUrl ? (
        <TableLabel
          onClick={goto}
          sx={{ color: 'blue', textDecoration: 'underline' }}
        >
          {txt}
        </TableLabel>
      ) : (
        <TableLabel>{txt}</TableLabel>
      )}
    </TableCell>
  );
};

export default BodyCell;
