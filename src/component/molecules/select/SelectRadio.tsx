import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { RadioGroup, RadioGroupProps } from '@mui/material';
import { RadioBtn } from '~/src/component/atoms';
import { ExtendOmit, IRadio } from '~/src/util/types';

interface IProps extends ExtendOmit<RadioGroupProps> {
  selects: IRadio[];
  control: Control<any, any>;
  name: string;
}

const SelectRadio = ({
  selects,
  control,
  name,
  ...props
}: IProps): JSX.Element => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup value={field.value} onChange={field.onChange} {...props}>
          {selects.map(select => (
            <RadioBtn
              label={select.label}
              value={select.value}
              key={select.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default React.memo(SelectRadio);
