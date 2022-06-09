import React from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { SelectDropStyled } from '~/src/component/organisms/select/styles';
import { ISelectedProps } from '~/src/util/types';
import { jobsObject } from '~/src/util/initalValue';

interface IProps extends ISelectedProps {
  isDisabled?: boolean;
}

const SelectJobs = ({ control, isDisabled = false }: IProps): JSX.Element => {
  return (
    <TextWithWrapper label="직업">
      <Controller
        name="job_title"
        control={control}
        render={({ field }) => (
          <SelectDropStyled fullWidth {...field} disabled={isDisabled}>
            {Object.keys(jobsObject).map(job => (
              <MenuItem key={job} value={job}>
                {jobsObject[job]}
              </MenuItem>
            ))}
          </SelectDropStyled>
        )}
      />
    </TextWithWrapper>
  );
};

export default SelectJobs;
