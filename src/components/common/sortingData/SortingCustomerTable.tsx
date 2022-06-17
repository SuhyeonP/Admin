import React from 'react';
import {
  Paper,
  ToggleButton,
  styled as muiStyled,
  Divider,
  ToggleButtonGroup,
} from '@mui/material';
import {
  CustomerType,
  ICustomerDataProps,
  IUserActionListRequest,
  licenseObject,
  LicenseState,
} from '~/model/store/customersStore';

const StyledToggleButton = muiStyled(ToggleButton)({
  '&.MuiToggleButton-root': {
    border: 0,
    padding: '7px 15px',
    '&:not(:first-of-type)': {
      borderRadius: 0,
    },
    '&:first-of-type': {
      borderRadius: 0,
    },
  },
});

const StyledToggleButtonGroup = muiStyled(ToggleButtonGroup)({
  '& .MuiToggleButtonGroup-grouped': {
    border: 0,
    '&.Mui-disabled': {},
    '&:not(:first-of-type)': {
      borderRadius: 0,
    },
    '&:first-of-type': {
      borderRadius: 0,
    },
  },
});

export const filterCustomerTable = {
  license_class: 'license_class',
  customer_type: 'customer_type',
  customer_license_state: 'customer_license_state',
  total: 'total',
};

const SortingCustomerTable = ({
  settingCustomersDetail,
  sorting,
}: ICustomerDataProps): JSX.Element => {
  const [total, setTotal] = React.useState(sorting.total);
  const [customer_type, setCT] = React.useState<CustomerType | null>(
    sorting.customer_type || null,
  );
  const [license_class, setLC] = React.useState<
    keyof typeof licenseObject | null
  >(sorting.license_class || null);
  const [customer_license_state, setCLS] = React.useState<LicenseState | null>(
    sorting.customer_license_state || null,
  );

  const [loading, setLoading] = React.useState(false);

  const sortData = React.useMemo(() => {
    return { total, customer_type, license_class, customer_license_state };
  }, [total, customer_type, license_class, customer_license_state]);

  React.useEffect(() => {
    if (
      [customer_type, license_class, customer_license_state].every(
        item => item === null,
      )
    ) {
      setTotal(true);
    }
  }, [customer_type, license_class, customer_license_state]);

  React.useLayoutEffect(() => {
    if (loading) {
      const temp: IUserActionListRequest = {
        ...sorting,
        total: sortData.total,
      };

      if (sortData.customer_type) {
        temp['customer_type'] = sortData.customer_type;
      } else {
        delete temp['customer_type'];
      }

      if (sortData.customer_license_state) {
        temp['customer_license_state'] = sortData.customer_license_state;
      } else {
        delete temp['customer_license_state'];
      }

      if (sortData.license_class) {
        temp['license_class'] = sortData.license_class;
      } else {
        delete temp['license_class'];
      }

      settingCustomersDetail(temp as IUserActionListRequest);
    }
  }, [loading, sortData]);

  const onClickSorting = React.useCallback(
    (type: keyof typeof filterCustomerTable, e: any) => {
      setLoading(true);
      const isTotal: boolean[] = [false, false, false];
      let check = false;
      const selected = e.target.value;

      const returnData = (data: unknown) => {
        return data === selected ? null : selected;
      };

      const makeInit = () => {
        setTotal(true);
        setLC(null);
        setCT(null);
        setCLS(null);
      };

      switch (type) {
        case filterCustomerTable.customer_type:
          setCT(prev => {
            isTotal[0] = prev !== selected;
            return returnData(prev);
          });
          break;
        case filterCustomerTable.customer_license_state:
          setCLS(prev => {
            isTotal[1] = prev !== selected;
            return returnData(prev);
          });
          break;
        case filterCustomerTable.license_class:
          setLC(prev => {
            isTotal[2] = prev !== selected;
            return returnData(prev);
          });
          break;
        case filterCustomerTable.total:
        default:
          makeInit();
          check = true;
          break;
      }
      if (!check) {
        if (isTotal.every(item => item)) {
          makeInit();
        } else if (isTotal.some(item => !item)) {
          setTotal(false);
        }
      }
    },
    [],
  );

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        border: theme => `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <StyledToggleButton
        value="total"
        selected={total}
        size="small"
        color="primary"
        onChange={e => onClickSorting('total', e)}
      >
        전체
      </StyledToggleButton>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup
        value={license_class}
        exclusive
        color="primary"
        size="small"
        onChange={e => onClickSorting('license_class', e)}
      >
        <ToggleButton value="Trial">무료</ToggleButton>
        <ToggleButton value="Paid">유료</ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup
        value={customer_type}
        exclusive
        color="primary"
        size="small"
        onChange={e => onClickSorting('customer_type', e)}
      >
        <ToggleButton value="Individual">개인</ToggleButton>
        <ToggleButton value="Group">단체</ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup
        value={customer_license_state}
        exclusive
        color="primary"
        size="small"
        onChange={e => onClickSorting('customer_license_state', e)}
      >
        <ToggleButton value="Valid">사용중</ToggleButton>
        <ToggleButton value="Expired">기간만료</ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default SortingCustomerTable;
