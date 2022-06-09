import React from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFormStyled } from '../form/style';
import { IPlan } from '~/src/util/types';
import {
  DivideSide,
  TitleWithEditWrapper,
} from '~/src/component/molecules/wrapper';
import { EditInputValue } from '~/src/component/molecules/info';
import { SelectLicense, SelectPlan } from '~/src/component/organisms/select';

const PlanBlock = (): JSX.Element => {
  const [isEditable, setIsEditable] = React.useState(false);

  const { control, handleSubmit } = useForm<IPlan>({
    defaultValues: {
      plan: 'community',
      license: 'free',
      start_date: '2022-06-08',
      end_date: '2023-06-08',
    },
  });

  const submit = React.useCallback((data: IPlan) => {
    console.log(data);
    setIsEditable(false);
  }, []);

  const toggle = React.useCallback(() => {
    setIsEditable(prev => !prev);
  }, []);

  return (
    <RegisterFormStyled onSubmit={handleSubmit(submit)}>
      <TitleWithEditWrapper
        toggle={toggle}
        title="플랜"
        isEditable={isEditable}
      >
        <DivideSide
          leftElement={
            <SelectPlan control={control} isDisabled={!isEditable} isRegister />
          }
          rightElement={
            <SelectLicense control={control} isDisabled={!isEditable} />
          }
        />
        <DivideSide
          leftElement={
            <EditInputValue
              editable={isEditable}
              label="라이선스 시작일"
              control={control}
              name="start_date"
            />
          }
          rightElement={
            <EditInputValue
              editable={isEditable}
              label="라이선스 종료일"
              control={control}
              name="end_date"
            />
          }
        />
      </TitleWithEditWrapper>
    </RegisterFormStyled>
  );
};

export default PlanBlock;
