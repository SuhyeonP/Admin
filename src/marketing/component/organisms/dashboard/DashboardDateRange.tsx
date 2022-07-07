import React from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import DateRangePicker from 'marketing/component/molecules/DateRangePicker';
import { IStartEndDate } from 'marketing/api/marketingHandler';
import FormTitle from 'marketing/component/molecules/TextStyle/FormTitle';
import TimeInfo from 'marketing/component/atom/TimeInfo';
import { makeDateTimeInfo } from 'marketing/util/date';

const DashboardDateRangeStyled = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 40px;
`;

interface IProps {
  local: IStartEndDate;
  setting: (data: IStartEndDate) => void;
}

const DashboardDateRange = ({ local, setting }: IProps): JSX.Element => {
  const [now] = React.useState(new Date());

  const { setValue, control, watch } = useForm<IStartEndDate>({
    defaultValues: local,
  });
  const { setValue: setOriginValue, watch: watchOriginDate } =
    useForm<IStartEndDate>({
      defaultValues: local,
    });

  React.useEffect(() => {
    const subscribe = watchOriginDate((state, { name }) => {
      if (name) {
        if (name === 'end_date') {
          setting(state as IStartEndDate);
        }
      }
    });
    return () => subscribe.unsubscribe();
  }, []);

  return (
    <>
      <DashboardDateRangeStyled>
        <FormTitle>조회 기간</FormTitle>
        <DateRangePicker
          setValue={setValue}
          setOriginDateValue={setOriginValue}
          start_date={watch('start_date')}
          end_date={watch('end_date')}
          control={control}
          needIcon
        />
      </DashboardDateRangeStyled>
      <TimeInfo time={makeDateTimeInfo(now)} />
    </>
  );
};

export default DashboardDateRange;
