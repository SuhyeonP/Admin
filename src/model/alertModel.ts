import React from 'react';
import { IReleaseList, SelectedTargetType } from '~/model/store';
import { ReactSetState } from '~/model/common';

interface IAlertContext {
  type: SelectedTargetType;
  setType: ReactSetState<SelectedTargetType>;
  setSelected: ReactSetState<IReleaseList | null>;
  selected: IReleaseList | null;
}

export const AlertContext = React.createContext<IAlertContext>({
  type: 'Release',
  setType: data => {
    //
  },
  setSelected: data => {
    //
  },
  selected: null,
});
