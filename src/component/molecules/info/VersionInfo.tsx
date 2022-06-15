import React from 'react';
import { FormStyled } from '~/src/globalStyles';
import {
  DivideSide,
  TitleWithEditWrapper,
} from '~/src/component/molecules/wrapper';
import { EditInputValue } from '~/src/component/molecules/info/index';
import { versionStatus } from '~/src/util/initalValue';

const VersionInfo = (): JSX.Element => {
  const version = {
    version: '0.6.3',
    create_date: '2022-10-22 13:33',
    status: 'ongoing',
    last_update_date: '2022-12-11 11:11',
    last_write_date: '2022-11-11 11:11',
  };

  return (
    <FormStyled>
      <TitleWithEditWrapper title="기본">
        <DivideSide
          rightElement={<EditInputValue label="버전" value={version.version} />}
        />
        <DivideSide
          rightElement={
            <EditInputValue
              label="운영 상태"
              value={versionStatus[version.status]}
            />
          }
          leftElement={
            <EditInputValue label="등록일" value={version.create_date} />
          }
        />
        <DivideSide
          rightElement={
            <EditInputValue
              label="최근 배포일"
              value={version.last_update_date}
            />
          }
          leftElement={
            <EditInputValue
              label="최근 노트 작성일"
              value={version.last_write_date}
            />
          }
        />
      </TitleWithEditWrapper>
    </FormStyled>
  );
};

export default VersionInfo;
