import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextWithWrapper } from '~/src/component/molecules/wrapper';
import { InputContent } from '~/src/component/atoms';

interface IProps {
  editable?: boolean;
  control?: Control<any, any>;
  label?: string;
  name?: string;
  value?: string | number;
}

const EditInputValue = ({
  control,
  editable = false,
  label,
  name,
  value,
}: IProps): JSX.Element => {
  return (
    <TextWithWrapper label={label}>
      {name && control ? (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <InputContent
                fullWidth
                value={field.value}
                onChange={field.onChange}
                disabled={!editable}
              />
            </>
          )}
        />
      ) : (
        <InputContent fullWidth disabled value={value || ''} />
      )}
    </TextWithWrapper>
  );
};

export default EditInputValue;
