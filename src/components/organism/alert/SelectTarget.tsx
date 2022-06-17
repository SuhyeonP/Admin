import React from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import { AlertContext, GlobalContext } from '~/model';
import { alertStore, IReleaseList, ISelectedCustomer } from '~/model/store';
import SelectCustomer from '~/components/organism/alert/SelectCustomer';
import TitleComponent from '~/components/common/layout/titleComponent/TitleComponent';

interface IProps {
  versionList: IReleaseList[];
}

const SelectTarget = ({ versionList }: IProps): JSX.Element => {
  const { controlDialog } = React.useContext(GlobalContext);
  const {
    type,
    setType,
    selected: selectedVer,
    setSelected: settingVersion,
  } = React.useContext(AlertContext);

  const [selected, setSelected] = React.useState<ISelectedCustomer[]>(
    alertStore.selectedCustomer,
  );

  React.useEffect(() => {
    setSelected(alertStore.selectedCustomer);
  }, [alertStore.selectedCustomer]);

  const onChangeType = React.useCallback(e => {
    setType(e.target.value);
  }, []);

  const onChangeVersion = React.useCallback(
    e => {
      const temp = versionList.find(item => item.link_ver === e.target.value);
      if (temp) {
        settingVersion(temp);
      }
    },
    [versionList],
  );

  const openSelect = React.useCallback(() => {
    controlDialog({
      view: true,
      title: '대상 선택',
      mainContent: <SelectCustomer />,
    });
  }, []);

  return (
    <TitleComponent title="대상선택">
      <Select
        value={type}
        onChange={onChangeType}
        sx={{ width: '140px', mr: '15px', textAlign: 'center' }}
      >
        <MenuItem value="Release">릴리즈</MenuItem>
        <MenuItem value="Email">공지</MenuItem>
      </Select>
      {type === 'Release' && selectedVer && (
        <Select
          value={(selectedVer as IReleaseList).link_ver}
          onChange={onChangeVersion}
          sx={{ width: '170px' }}
        >
          {versionList.map(ver => (
            <MenuItem value={ver.link_ver} key={ver.id}>
              {ver.link_ver}
            </MenuItem>
          ))}
        </Select>
      )}
      {type === 'Email' && (
        <Button
          sx={{ height: '100%', width: '170px' }}
          variant="outlined"
          onClick={openSelect}
        >
          {selected.reduce((a, b) => {
            return a + b.member_count;
          }, 0)}
          명
        </Button>
      )}
    </TitleComponent>
  );
};

export default SelectTarget;
