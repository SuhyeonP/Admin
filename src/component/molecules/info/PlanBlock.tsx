import React from 'react';
import { useForm } from 'react-hook-form';
import { IPlan } from '~/src/util/types';
import {
  DivideSide,
  TitleWithEditWrapper,
} from '~/src/component/molecules/wrapper';
import { SelectDate } from '~/src/component/molecules/info/index';
import { SelectLicense, SelectPlan } from '~/src/component/molecules/select';
import { FormStyled } from '~/src/globalStyles';

interface IProps {
  isCompany?: boolean;
  isCompanyMember?: boolean;
}

const PlanBlock = ({
  isCompany = false,
  isCompanyMember,
}: IProps): JSX.Element => {
  const [isEditable, setIsEditable] = React.useState(false);

  const { control, handleSubmit, setValue, getValues } = useForm<IPlan>({
    defaultValues: {
      plan: isCompany ? 'enterprise' : 'community',
      license: 'free',
      start_date: '2022-06-08',
      end_date: '2023-06-18',
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
    <FormStyled onSubmit={handleSubmit(submit)}>
      <TitleWithEditWrapper
        toggle={isCompanyMember ? undefined : toggle}
        title="플랜"
        isEditable={isCompanyMember ? undefined : isEditable}
      >
        <DivideSide
          leftElement={
            <SelectPlan
              control={control}
              isDisabled={!isEditable}
              isRegister
              isCompany={isCompany}
            />
          }
          rightElement={
            <SelectLicense control={control} isDisabled={!isEditable} />
          }
        />
        <DivideSide
          leftElement={
            <SelectDate
              label="라이선스 시작일"
              name="start_date"
              setValue={setValue}
              value={getValues('start_date')}
              editable={isEditable}
            />
          }
          rightElement={
            <SelectDate
              label="라이선스 종료일"
              name="end_date"
              setValue={setValue}
              value={getValues('end_date')}
              editable={isEditable}
            />
          }
        />
      </TitleWithEditWrapper>
    </FormStyled>
  );
};

export default PlanBlock;
