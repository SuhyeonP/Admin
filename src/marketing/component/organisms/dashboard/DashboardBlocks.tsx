import React from 'react';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { IndicatorWrapper } from '../../atom/IndicatorWrapper';
import IndicatorBox from 'marketing/component/molecules/IndicatorBox';
import { IDashboardBlock } from 'marketing/api/types';
import {
  downloadCSV,
  getDashboardCount,
  IDownloadProps,
  IStartEndDate,
} from 'marketing/api/marketingHandler';
import { fileDownload } from 'marketing/util/fileDownload';
import IndicatorTitle from 'marketing/component/molecules/IndicatorTitle';
import IndicatorFooter from 'marketing/component/molecules/IndicatorFooter';

interface IUniqueBlock {
  active_user: boolean;
  certified_user: boolean;
  updated_user: boolean;
}

interface IProps {
  local: IStartEndDate;
}

const DashboardBlocks = ({ local }: IProps): JSX.Element => {
  const tooltipContent = React.useMemo(() => {
    return {
      active_user:
        '하루 동안 해당 서비스를 이용한 사용자 수를 의미합니다.\n하루에 여러번 이용하더라도 1명으로 집계됩니다.\nUnique(순 사용자)를 체크할 경우 조회 기간동안 중복되는 사용자를 제외하여 집계합니다.',
      certified_user:
        '제품키를 입력하여 인증한 사용자 수를 의미합니다.\n하루에 여러번 인증하더라도 1명으로 집계됩니다.\nUnique(순 사용자)를 체크할 경우 조회 기간동안 중복되는 사용자를 제외하여 집계합니다.\n동일한 사용자가 2회 이상의 인증을 하는 대표적인 경우는 추가 디바이스에서 Link를 사용할 때입니다.',
      updated_user:
        '제품의 버전 업데이트를 실시한 사용자 수를 의미합니다.\n하루에 여러번 업데이트 하더라도 1명으로 집계됩니다.\n업데이트한 버전과 관계없이 모든 업데이트 이벤트를 집계합니다.\nUnique(순 사용자)를 체크할 경우 조회 기간동안 중복되는 사용자를 제외하여 집계합니다.',
    };
  }, []);
  const { register, watch } = useForm<IUniqueBlock>({});

  const date_range = React.useMemo(() => {
    return {
      start_date: new Date(local.start_date).toISOString(),
      end_date: new Date(local.end_date).toISOString(),
    };
  }, [local]);

  const { data } = useQuery<IStartEndDate, AxiosError, IDashboardBlock>(
    ['get-dashboard-block', date_range],
    () => getDashboardCount(date_range),
  );

  const downloadMutation = useMutation<any, AxiosError, IDownloadProps>(
    downloadCSV,
    {
      onSuccess: res => {
        fileDownload(res);
      },
    },
  );

  const download = React.useCallback(
    (path: string) => () => {
      downloadMutation.mutate({
        where: 'dashboard',
        path,
        start_date: date_range.start_date,
        end_date: date_range.end_date,
      });
    },
    [date_range],
  );
  const checkNormal = React.useCallback((check: boolean) => {
    return check ? 'unique' : 'normal';
  }, []);

  return (
    <>
      {data && (
        <Grid container spacing={3}>
          <Grid container spacing={3} item>
            <Grid item xs={6}>
              <IndicatorWrapper>
                <IndicatorTitle
                  title="활성 사용자"
                  tooltip={tooltipContent['active_user']}
                  unique={register('active_user')}
                />
                <IndicatorBox
                  count={
                    data.activated_user[checkNormal(watch('active_user'))]
                      .amount
                  }
                  before={
                    data.activated_user[checkNormal(watch('active_user'))]
                      .percent
                  }
                />
                <IndicatorFooter download={download('activated-user')} />
              </IndicatorWrapper>
            </Grid>
            <Grid item xs={6}>
              <IndicatorWrapper>
                <IndicatorTitle title="라이선스 신청자" />
                <IndicatorBox
                  count={data.license_subscriber.normal.amount}
                  before={data.license_subscriber.normal.percent}
                />
                <IndicatorFooter download={download('license-subscriber')} />
              </IndicatorWrapper>
            </Grid>
          </Grid>
          <Grid container spacing={3} item>
            <Grid item xs={4}>
              <IndicatorWrapper>
                <IndicatorTitle title="다운로드" />
                <IndicatorBox
                  count={data.download.normal.amount}
                  before={data.download.normal.percent}
                />
              </IndicatorWrapper>
            </Grid>
            <Grid item xs={4}>
              <IndicatorWrapper>
                <IndicatorTitle
                  title="인증 사용자"
                  tooltip={tooltipContent['certified_user']}
                  unique={register('certified_user')}
                />
                <IndicatorBox
                  count={
                    data.certified_user[checkNormal(watch('certified_user'))]
                      .amount
                  }
                  before={
                    data.certified_user[checkNormal(watch('certified_user'))]
                      .percent
                  }
                />
                <IndicatorFooter download={download('certified-user')} />
              </IndicatorWrapper>
            </Grid>
            <Grid item xs={4}>
              <IndicatorWrapper>
                <IndicatorTitle
                  title="업데이트 사용자"
                  tooltip={tooltipContent['updated_user']}
                  unique={register('updated_user')}
                />
                <IndicatorBox
                  count={
                    data.updated_user[checkNormal(watch('updated_user'))].amount
                  }
                  before={
                    data.updated_user[checkNormal(watch('updated_user'))]
                      .percent
                  }
                />
                <IndicatorFooter download={download('updated-user')} />
              </IndicatorWrapper>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DashboardBlocks;
