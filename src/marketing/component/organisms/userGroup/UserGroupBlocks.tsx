import React from 'react';
import { Grid } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { IndicatorWrapper } from '../../atom/IndicatorWrapper';
import IndicatorBox from 'marketing/component/molecules/IndicatorBox';
import {
  dateRange,
  IndicateDates,
  makeDateTimeInfo,
} from 'marketing/util/date';
import {
  downloadCSV,
  getIdleCount,
  getUserCount,
  IDownloadProps,
  IStartEndDate,
} from 'marketing/api/marketingHandler';
import { IIdleUser, IUserGroupBlock } from 'marketing/api/types';
import TimeInfo from 'marketing/component/atom/TimeInfo';
import { fileDownload } from 'marketing/util/fileDownload';
import IndicatorTitle from 'marketing/component/molecules/IndicatorTitle';
import IndicatorFooter from 'marketing/component/molecules/IndicatorFooter';

const UserGroupBlocks = (): JSX.Element => {
  const [selectDate, setSelectDate] = React.useState<IndicateDates>('last7');

  const now = React.useMemo(() => {
    return new Date().toISOString();
  }, []);

  const { data: userGroup } = useQuery<
    Pick<IStartEndDate, 'end_date'>,
    AxiosError,
    IUserGroupBlock
  >(['get-user-group-block'], () => getUserCount({ end_date: now }), {});

  const date_range = React.useMemo(() => {
    const [start, end] = dateRange[selectDate];
    return {
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    };
  }, [selectDate]);

  const { data: idleData } = useQuery<IIdleUser>(
    ['user-group-idle', date_range],
    () => getIdleCount(date_range),
    {},
  );

  const tooltipContent = React.useMemo(() => {
    return {
      uncertified_user:
        '라이선스 신청 후 제품키 인증을 하지 않은 사용자입니다.',
      certified_unused_user:
        '제품키 인증 후 제품을 사용하지 않은 경우를 의미합니다.\n제품키 인증일의 사용 기록은 미사용으로 간주합니다.\n제품키 인증일 이후 일자부터의 제품 사용을 사용으로 간주합니다.',
      idle_user:
        '최근 제품 사용일로부터 N일간 제품을 사용하지 않은 경우를 의미합니다.\n제품키 인증일 이후부터의 사용 기록을 최근 제품 사용일로 간주하기 때문에 “인증 외 미사용자”와는 중복되지 않습니다.',
    };
  }, []);

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
      const req: IDownloadProps = {
        where: 'user-group',
        path,
      };
      if (path !== 'idle_user') {
        req['end_date'] = now;
      } else {
        req['start_date'] = date_range.start_date;
        req['end_date'] = date_range.end_date;
      }
      downloadMutation.mutate(req);
    },
    [date_range, now],
  );

  return (
    <>
      <TimeInfo time={makeDateTimeInfo(now)} />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <IndicatorWrapper>
            <IndicatorTitle
              title="미인증 사용자"
              tooltip={tooltipContent['uncertified_user']}
            />
            <IndicatorBox count={userGroup!.uncertified_user} />
            <IndicatorFooter download={download('uncertified_user')} />
          </IndicatorWrapper>
        </Grid>
        <Grid item xs={4}>
          <IndicatorWrapper>
            <IndicatorTitle
              title="인증 외 미사용자"
              tooltip={tooltipContent['certified_unused_user']}
            />
            <IndicatorBox count={userGroup!.certified_unused_user} />
            <IndicatorFooter download={download('certified_unused_user')} />
          </IndicatorWrapper>
        </Grid>
        <Grid item xs={4}>
          <IndicatorWrapper>
            <IndicatorTitle
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              tooltip={tooltipContent['idle_user']}
            />
            <IndicatorBox count={idleData!.idle_user || 0} />
            <IndicatorFooter download={download('idle_user')} />
          </IndicatorWrapper>
        </Grid>
      </Grid>
    </>
  );
};

export default UserGroupBlocks;
