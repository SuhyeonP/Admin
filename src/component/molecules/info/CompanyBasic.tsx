import React from 'react';
import { useForm } from 'react-hook-form';
import {
  DivideSide,
  TitleWithEditWrapper,
} from '~/src/component/molecules/wrapper';
import { ICompanyBase } from '~/src/util/types';
import { EditInputValue } from '~/src/component/molecules/info/index';
import { SelectAdmin } from '~/src/component/molecules/select';
import { FormStyled } from '~/src/globalStyles';

const members = [
  {
    name: 'sdf',
    id: 12,
  },
  {
    name: 'asdf',
    id: 13,
  },
  {
    name: 'fff',
    id: 1,
  },
];

interface IProps {
  isMember?: boolean;
}

const CompanyBasic = ({ isMember = false }: IProps): JSX.Element => {
  const [isEditable, setIsEditable] = React.useState(false);

  const { control, handleSubmit, getValues } = useForm<ICompanyBase>({
    defaultValues: {
      create_date: '2022-06-08 13:00',
      admin: 12,
      name: 'company',
      phone_number: '01012341234',
      member_count: members.length,
    },
  });

  const toggle = React.useCallback(() => {
    setIsEditable(prev => !prev);
  }, []);

  const submit = React.useCallback((data: ICompanyBase) => {
    console.log(data);
    setIsEditable(false);
  }, []);

  return (
    <FormStyled onSubmit={handleSubmit(submit)}>
      <TitleWithEditWrapper
        toggle={isMember ? undefined : toggle}
        title={isMember ? '기업' : '기본'}
        isEditable={isEditable}
      >
        <DivideSide
          leftElement={
            <EditInputValue
              editable={false}
              label="기업 생성일"
              value={getValues('create_date')}
            />
          }
          rightElement={
            <EditInputValue
              editable={isEditable}
              label="기업명"
              control={control}
              name="name"
            />
          }
        />
        <DivideSide
          leftElement={
            <EditInputValue
              editable={isEditable}
              label="전화번호"
              name="phone_number"
              control={control}
            />
          }
          rightElement={
            <SelectAdmin
              members={members}
              control={control}
              isDisabled={!isEditable}
            />
          }
        />
        <DivideSide
          rightElement={
            <EditInputValue
              editable={false}
              label="구성원 수"
              value={getValues('member_count')}
            />
            // <EditInputValue
            //   editable={isEditable}
            //   label="구성원 수"
            //   name="member_count"
            //   control={control}
            // />
          }
        />
      </TitleWithEditWrapper>
    </FormStyled>
  );
};

export default CompanyBasic;
