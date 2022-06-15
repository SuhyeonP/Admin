import React from 'react';
import { useForm } from 'react-hook-form';
import {
  DivideSide,
  TitleWithEditWrapper,
} from '~/src/component/molecules/wrapper';
import { IMemberInfo } from '~/src/util/types';
import { EditInputValue } from '~/src/component/molecules/info/index';
import { SelectJobs } from '~/src/component/molecules/select';
import { FormStyled } from '~/src/globalStyles';

const MemberBasic = (): JSX.Element => {
  const [isEditable, setIsEditable] = React.useState(false);

  const { control, handleSubmit } = useForm<IMemberInfo>({
    defaultValues: {
      job_title: 'Data_Analyst',
    },
  });

  const toggle = React.useCallback(() => {
    setIsEditable(prev => !prev);
  }, []);

  const submit = React.useCallback((data: IMemberInfo) => {
    console.log(data);
    setIsEditable(false);
  }, []);

  return (
    <FormStyled onSubmit={handleSubmit(submit)}>
      <TitleWithEditWrapper
        toggle={toggle}
        title="기본"
        isEditable={isEditable}
      >
        <DivideSide
          leftElement={
            <EditInputValue editable={false} label="회원 생성일" value="123" />
          }
          rightElement={
            <EditInputValue
              editable={isEditable}
              label="이메일"
              control={control}
              name="email"
            />
          }
        />
        <DivideSide
          leftElement={
            <EditInputValue
              editable={isEditable}
              label="이름"
              name="first_name"
              control={control}
            />
          }
          rightElement={
            <EditInputValue
              editable={isEditable}
              label="성"
              control={control}
              name="last_name"
            />
          }
        />
        <DivideSide
          leftElement={
            <SelectJobs control={control} isDisabled={!isEditable} />
          }
          rightElement={
            <EditInputValue
              editable={isEditable}
              label="소속"
              control={control}
              name="company"
            />
          }
        />
        <DivideSide
          leftElement={
            <EditInputValue editable={false} label="역할" value="admin" />
          }
          rightElement={
            <EditInputValue editable={false} label="상태" value="사용" />
          }
        />
      </TitleWithEditWrapper>
    </FormStyled>
  );
};

export default MemberBasic;
