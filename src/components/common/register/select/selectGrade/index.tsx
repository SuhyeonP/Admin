import React from 'react';
import { MenuItem, Select, SelectProps } from '@mui/material';
import { ExtendOmit, IDataVoid, licenseType } from '~/model/common';
import { licenseObject } from '~/model/store';

interface IProps extends ExtendOmit<SelectProps> {
  settingGrade: IDataVoid<keyof typeof licenseObject>;
  isTeam?: boolean;
  grade: keyof typeof licenseObject;
}

const Index = ({
  grade,
  settingGrade,
  isTeam = false,
  ...props
}: IProps): JSX.Element => {
  const [selectGrade, setGrade] =
    React.useState<keyof typeof licenseObject>(grade);

  React.useEffect(() => {
    setGrade(grade);
  }, [grade]);

  const handleGrade = React.useCallback(e => {
    setGrade(e.target.value);
    settingGrade(e.target.value);
  }, []);

  return (
    <Select value={selectGrade} onChange={handleGrade} {...props}>
      {licenseType.map(
        classType =>
          isTeam === classType.isGroup && (
            <MenuItem key={classType.id} value={classType.id}>
              {classType.label}
            </MenuItem>
          ),
      )}
    </Select>
  );
};

export default Index;
