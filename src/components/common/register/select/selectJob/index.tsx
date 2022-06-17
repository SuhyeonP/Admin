import React from 'react';
import { useInput } from 'custom-hook-react';
import { Grid, MenuItem, Select, Typography } from '@mui/material';
import ControlRuleInput from '../../../controlRuleInput/ControlRuleInput';
import { IDataVoid, IFormInputError } from '~/model/common';
import { jobs } from '~/model/common/etcValue';

interface IProps {
  settingJob: IDataVoid<string>;
  job?: string;
  isManager?: boolean;
  error?: IFormInputError;
}

const SelectJob = ({
  settingJob,
  job = '',
  isManager = false,
  error,
}: IProps): JSX.Element => {
  const [job_title, setJT] = React.useState<string>(
    jobs.includes(job) ? job : 'Etc',
  );
  const [jobValue, onChangeJV, setJV] = useInput<string>(
    jobs.includes(job) ? '' : job,
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  React.useLayoutEffect(() => {
    if (!loading) {
      if (job_title === 'Etc') {
        settingJob(jobValue);
      } else {
        settingJob(job_title);
      }
    }
  }, [loading, job_title, jobValue]);

  const handleJob = React.useCallback(e => {
    const value = e.target.value;
    setJT(value);
    // if (value !== 'Etc') {
    //   settingJob(value);
    // }
  }, []);

  return (
    <>
      <Grid container>
        <Typography sx={{ paddingBottom: '10px' }}>
          {isManager && '관리자'} 직무 (*)
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={job_title === 'Etc' ? 6 : 12}>
          <Select value={job_title} onChange={handleJob} fullWidth required>
            {jobs.map(item => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {job_title === 'Etc' && (
          <Grid xs={6} item>
            <ControlRuleInput
              value={jobValue}
              onChange={onChangeJV}
              error={error}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SelectJob;
