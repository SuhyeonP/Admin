import React from 'react';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { AlertContext, AuthContext } from '~/model';
import {
  IReleaseList,
  IReleaseListResponse,
  SelectedTargetType,
  userStore,
  versionStore,
} from '~/model/store';
import { NoteForm, SelectTarget } from '~/components/organism/alert';
import { IResponseData } from '~/api/customAPI';
import { checkErr } from '~/api/checkErr';

const WrapperStyled = styled.div`
  @media (max-width: 1980px) {
    width: 50vw;
  }
  @media (min-width: 1981px) {
    width: 20vw;
  }

  display: flex;
  flex-direction: column;
`;

const AlertManager = (): JSX.Element => {
  const { logout } = React.useContext(AuthContext);
  const [type, setType] = React.useState<SelectedTargetType>('Release');
  const [selected, setSelected] = React.useState<IReleaseList | null>(null);
  const [versionList, setVersionList] = React.useState<IReleaseList[]>([]);

  const { isLoading, data, error } = useQuery<
    IResponseData<IReleaseListResponse>,
    AxiosError
  >(['getReleaseList'], async () => await versionStore.getReleaseList(), {
    retry: false,
    enabled: userStore.isAuthorized,
    staleTime: 5000,
    keepPreviousData: true,
  });

  React.useEffect(() => {
    if (error) {
      const checkError = checkErr(error);
      if (checkError.tokenInValid) {
        logout();
      }
    } else if (data) {
      const { ok, result, err } = data;
      if (ok) {
        setVersionList(result.link_releases);
        if (result.link_releases.length > 0) {
          setSelected(result.link_releases[0]);
        }
      }
    }
  }, [data, error]);

  return (
    <AlertContext.Provider
      value={{
        type,
        setType,
        selected,
        setSelected,
      }}
    >
      <WrapperStyled>
        {!isLoading && (
          <>
            <SelectTarget versionList={versionList} />
            <NoteForm />
          </>
        )}
      </WrapperStyled>
    </AlertContext.Provider>
  );
};

export default AlertManager;
