import React from 'react';
import { useInput } from 'custom-hook-react';
import { Grid, TextField, Typography } from '@mui/material';
import { IDataVoid, IFormInputError } from '~/model/common';
import { CustomerType, ICustomer, licenseObject } from '~/model/store';
import { Block } from '~/components/common/styleMui';
import { SelectGrade, SelectGroup } from '~/components/common/register/select';
import { ControlRuleInput } from '~/components/common/controlRuleInput';

interface IProps {
  managerInfo: ICustomer;
  checkError: Record<string, IFormInputError>;
  settingCustomerInfo: IDataVoid<ICustomer>;
}

const CompanyRegister = ({
  managerInfo,
  checkError,
  settingCustomerInfo,
}: IProps): JSX.Element => {
  const [customer_type, setCT] = React.useState<CustomerType>(
    managerInfo.customer_type,
  );
  const [company, onChangeCompany, setCompany] = useInput(managerInfo.company);
  const [license_class, setLC] = React.useState<keyof typeof licenseObject>(
    managerInfo.license_class,
  );
  const [member_max, setMM] = React.useState<number>(managerInfo.member_max);
  const [loading, setLoading] = React.useState(false);

  const companyInfo = React.useMemo(() => {
    return { member_max, license_class, company, customer_type };
  }, [member_max, license_class, company, customer_type]);

  React.useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    };
  }, []);

  React.useEffect(() => {
    if (loading) {
      const { company, member_max, license_class, customer_type } = companyInfo;
      const temp: ICustomer = {
        ...managerInfo,
        customer_type,
        member_max,
        license_class,
        company,
      };
      settingCustomerInfo(temp);
    }
  }, [loading, companyInfo]);

  const onChangeMM = React.useCallback(
    e => {
      const memberCount = parseInt(e.target.value, 10);
      setMM(memberCount);
    },
    [managerInfo],
  );

  const settingGroup = React.useCallback(
    (value: CustomerType) => {
      if (value === 'Enterprise') {
        setMM(1);
        setLC('Community');
      } else {
        setLC('Open_Network');
      }
      setCT(value);
    },
    [managerInfo],
  );

  const settingGrade = React.useCallback(
    (value: keyof typeof licenseObject) => {
      setLC(value);
    },
    [],
  );

  return (
    <>
      <Block container>
        <Grid container>
          <Typography mb="10px">구분 - 소속명</Typography>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            <SelectGroup
              customer_type={customer_type}
              settingGroup={settingGroup}
            />
          </Grid>
          <Grid item xs={0.5} />
          <Grid item xs={9.5}>
            <ControlRuleInput
              value={company}
              onChange={onChangeCompany}
              error={checkError['company']}
            />
          </Grid>
        </Grid>
      </Block>
      <Block container>
        <Grid item xs={5.5}>
          <Grid container>
            <Typography mb="10px">등급</Typography>
          </Grid>
          <SelectGrade
            settingGrade={settingGrade}
            grade={license_class}
            isTeam={customer_type === 'Enterprise'}
            fullWidth
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5.5}>
          <ControlRuleInput
            value={member_max}
            onChange={onChangeMM}
            type="number"
            title="총 라이센스 수"
            disable={customer_type === 'Personal'}
          />
        </Grid>
      </Block>
    </>
  );
};

export default CompanyRegister;
