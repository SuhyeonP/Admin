import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { SelectDropStyled } from './styles';
import { IVersion } from '~/src/util/types';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';

interface IProps {
  control: Control<IVersion & any, any>;
}

// todo redux로 관리한 값 들고오기
const dummy = [
  {
    id: 1,
    create_date: '2022-10-20 13:44',
    version: '0.2.3',
    status: 'ready',
    last_update_date: '2022-09-19 13:33',
    last_write_date: '2022-09-19 13:33',
  },
  {
    id: 3,
    create_date: '2022-09-20 13:44',
    version: '0.2.7',
    status: 'ongoing',
    last_update_date: '2022-09-19 13:33',
    last_write_date: '2022-09-19 13:33',
  },
];

const SelectVersion = ({ control }: IProps): JSX.Element => {
  return (
    <TextWithWrapper label="릴리즈 선택">
      <Controller
        name="version"
        control={control}
        render={({ field }) => (
          <SelectDropStyled
            fullWidth
            value={field.value}
            onChange={field.onChange}
            placeholder="배포 할 릴리즈 버전을 선택해 주세요"
          >
            {dummy.map(version => (
              <MenuItem value={version.version} key={version.id}>
                {version.version}
              </MenuItem>
            ))}
          </SelectDropStyled>
        )}
      />
    </TextWithWrapper>
  );
};

export default SelectVersion;
