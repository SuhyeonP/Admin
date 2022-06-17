import React from 'react';
import { MenuItem, Select, SelectProps } from '@mui/material';
import { ExtendOmit, IDataVoid } from '~/model/common';
import { CustomerType } from '~/model/store';

interface IProps extends ExtendOmit<SelectProps> {
  customer_type: CustomerType;
  settingGroup: IDataVoid<CustomerType>;
}

const SelectGroup = ({
  customer_type,
  settingGroup,
  ...props
}: IProps): JSX.Element => {
  const [value, setValue] = React.useState<CustomerType>(customer_type);

  React.useEffect(() => {
    setValue(customer_type);
  }, [customer_type]);

  const handleGroup = React.useCallback(e => {
    setValue(e.target.value);
    settingGroup(e.target.value);
  }, []);

  return (
    <Select value={value} onChange={handleGroup} {...props}>
      <MenuItem value="Personal">개인</MenuItem>
      <MenuItem value="Enterprise">그룹</MenuItem>
    </Select>
  );
};

export default SelectGroup;
