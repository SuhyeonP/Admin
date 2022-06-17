import React from 'react';
import { Button } from '@mui/material';
import {
  DialogActionLayout,
  DialogContentLayout,
} from '~/components/common/globalContent';
import { alertStore, ISelectedCustomer } from '~/model/store';
import MiniCustomerTable from '~/components/organism/alert/MiniCustomerTable';
import { GlobalContext } from '~/model';

const SelectCustomer = (): JSX.Element => {
  const { closeDialog } = React.useContext(GlobalContext);
  const [tempSelected, setTS] = React.useState<ISelectedCustomer[]>(
    alertStore.selectedCustomer.slice(),
  );

  const close = React.useCallback(() => {
    closeDialog();
    setTS(alertStore.selectedCustomer.slice());
  }, [alertStore.selectedCustomer]);

  const selectCustomer = React.useCallback(() => {
    alertStore.selectedCustomer = tempSelected;
    closeDialog();
  }, [tempSelected]);

  return (
    <>
      <DialogContentLayout>
        <MiniCustomerTable setTS={setTS} tempSelected={tempSelected} />
      </DialogContentLayout>
      <DialogActionLayout>
        <Button onClick={close}>취소</Button>
        <Button onClick={selectCustomer}>추가</Button>
      </DialogActionLayout>
    </>
  );
};

export default SelectCustomer;
