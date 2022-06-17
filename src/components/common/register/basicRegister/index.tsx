import React from 'react';
import { useInput } from 'custom-hook-react';
import { Grid } from '@mui/material';
import {
  IDataVoid,
  IFormInputError,
  IPersonInfo,
  personInit,
} from '~/model/common';
import { ControlRuleInput } from '~/components/common/controlRuleInput';
import { Block } from '~/components/common/styleMui';
import { SelectJob } from '~/components/common/register/select';

interface IProps {
  checkError: Record<keyof IPersonInfo, IFormInputError>;
  isManager?: boolean;
  editInfo?: IPersonInfo;
  settingManagerInfo: IDataVoid<IPersonInfo>;
}

const info: Record<keyof IPersonInfo, string> = {
  email: '이메일',
  last_name: '이름',
  first_name: '성',
  job_title: '직업',
  phone_number: '전화번호',
};

const BasicRegister = ({
  checkError,
  isManager = false,
  editInfo = personInit,
  settingManagerInfo,
}: IProps): JSX.Element => {
  const [last_name, onChangeLN, setLN] = useInput(editInfo.last_name);
  const [first_name, onChangeFN, setFN] = useInput(editInfo.first_name);
  const [email, onChangeEmail, setEmail] = useInput(editInfo.email);
  const [phone_number, onChangePN, setPN] = useInput(
    editInfo.phone_number || '',
  );
  const [job_title, setJT] = React.useState(editInfo.job_title);
  const [loading, setLoading] = React.useState(false);

  const settingJob = React.useCallback((value: string) => {
    setJT(value);
  }, []);

  React.useEffect(() => {
    setLoading(true);
    return () => {
      setLoading(false);
    };
  }, []);

  React.useEffect(() => {
    if (loading) {
      const temp: IPersonInfo = {
        last_name,
        first_name,
        email,
        job_title,
        phone_number,
      };
      settingManagerInfo(temp);
    }
  }, [
    last_name,
    first_name,
    email,
    phone_number,
    job_title,
    loading,
    isManager,
  ]);

  return (
    <>
      <Block container>
        <Grid item xs={5.5}>
          <ControlRuleInput
            value={last_name}
            onChange={onChangeLN}
            title={`${isManager ? '관리자 ' : ''}${info['last_name']} (*)`}
            error={checkError['last_name']}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5.5}>
          <ControlRuleInput
            value={first_name}
            onChange={onChangeFN}
            title={`${isManager ? '관리자 ' : ''}${info['first_name']} (*)`}
            error={checkError['first_name']}
          />
        </Grid>
      </Block>
      <Block container>
        <ControlRuleInput
          value={email}
          onChange={onChangeEmail}
          title={`${isManager ? '관리자 ' : ''}${info['email']} (*)`}
          error={checkError['email']}
        />
      </Block>
      <Block container>
        <SelectJob
          settingJob={settingJob}
          job={job_title}
          isManager
          error={checkError['job_title']}
        />
      </Block>
      <Block container>
        <ControlRuleInput
          value={phone_number}
          onChange={onChangePN}
          title={`${isManager ? '관리자 ' : ''}${info['phone_number']}`}
          error={checkError['phone_number']}
        />
      </Block>
    </>
  );
};

export default BasicRegister;
