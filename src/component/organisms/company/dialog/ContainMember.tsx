import React from 'react';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import SimpleMembersTable from './SimpleMembersTable';
import { DoubleButtonWrapper } from '~/src/component/molecules/wrapper';
import { DoubleButton } from '~/src/component/atoms';
import { IContainMember, ISimpleMember } from '~/src/util/types';
import SelectRadio from '~/src/component/molecules/select/SelectRadio';
import { SelectSearch } from '~/src/component/molecules/select';
import { AddMemberForm } from '~/src/component/molecules/form';
import { useAppDispatch } from '~/src/redux/hook';
import { globalActions } from '~/src/redux/slice';
import { FormStyled } from '~/src/globalStyles';

const dummy: ISimpleMember[] = [
  {
    id: 2,
    email: 'skdjfksd@skdjf.sdf',
    first_name: 'sdkfj',
    last_name: 'skdfj',
  },
  {
    id: 22,
    email: 'iu.sdkfj@skdjf.sdf',
    first_name: 'fdg',
    last_name: 'asd',
  },
  {
    id: 12,
    email: 'sss@skdjf.sdf',
    first_name: 'ssss',
    last_name: 'sdf',
  },
  {
    id: 1232,
    email: 'sss@skdjf.sdf',
    first_name: 'ssss',
    last_name: 'sdf',
  },
  {
    id: 712,
    email: 'sss@skdjf.sdf',
    first_name: 'ssss',
    last_name: 'sdf',
  },
  {
    id: 44,
    email: 'sss@skdjf.sdf',
    first_name: 'ssss',
    last_name: 'sdf',
  },
];

const selectType = [
  {
    label: '기존 회원으로 추가',
    value: 'origin',
  },
  {
    label: '회원 생성으로 추가',
    value: 'new',
  },
];

const ContainMember = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = React.useState<number[]>([]);

  const { control, watch, handleSubmit } = useForm<IContainMember>({
    defaultValues: {
      selectType: 'origin',
      search: 'email',
      searchInput: '',
      email: '',
      first_name: '',
      last_name: '',
      job_title: 'Data_Analyst',
    },
  });

  const close = React.useCallback(() => {
    dispatch(globalActions.closeDialog());
  }, []);

  const checkChecked = React.useMemo(() => {
    if (selected.length === 0 || dummy.length === 0) return 0;

    const mix = selected
      .slice()
      .concat(dummy.map(ele => ele.id))
      .sort((a, b) => a - b);

    return mix.filter((ele, idx) => ele === mix[idx - 1]).length;
  }, [selected, dummy]);

  const selectAll = React.useCallback(
    e => {
      const copy = selected.slice();

      if (dummy.length === 0) {
        return;
      }

      if (selected.length === 0 || checkChecked !== dummy.length) {
        for (let i = 0; i < dummy.length; i++) {
          const checkId = dummy[i].id;

          if (copy.indexOf(checkId) === -1) {
            copy.push(checkId);
          }
        }
      } else {
        for (let i = 0; i < dummy.length; i++) {
          const checkId = dummy[i].id;
          const findIdx = copy.indexOf(checkId);
          copy.splice(findIdx, 1);
        }
      }

      setSelected(copy);
    },
    [selected, dummy],
  );

  const checkContain = React.useCallback(
    (id: number) => {
      return selected.indexOf(id) !== -1;
    },
    [selected],
  );

  const selectMember = React.useCallback(
    (id: number) => () => {
      setSelected(prev => {
        const findIdx = prev.indexOf(id);

        if (findIdx === -1) {
          prev.push(id);
        } else {
          prev.splice(findIdx, 1);
        }

        return prev.map(ele => ele);
      });
    },
    [selected],
  );

  const addMember = React.useCallback((data: IContainMember) => {
    console.log(data);
  }, []);

  const addTableMember = React.useCallback((data: IContainMember) => {
    console.log(data.searchInput);
    console.log(data.search);
    console.log(data.selectType);
  }, []);

  const getSelected = React.useCallback(() => {
    console.log(selected);
  }, [selected]);

  return (
    <>
      <DialogTitle>구성원추가</DialogTitle>
      <DialogContent>
        <Box display="block" minWidth="650px">
          <SelectRadio
            selects={selectType}
            control={control}
            name="selectType"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              padding: '0 0 30px 17px',
            }}
          />
          <Grid container>
            {watch('selectType') === 'origin' ? (
              <FormStyled onSubmit={handleSubmit(addTableMember)}>
                <SelectSearch control={control} hiddenLabel />
                <SimpleMembersTable
                  total={dummy.length}
                  members={dummy}
                  selected={selected}
                  selectAll={selectAll}
                  selectMember={selectMember}
                  checkContain={checkContain}
                  checkChecked={checkChecked}
                />
              </FormStyled>
            ) : (
              <FormStyled onSubmit={handleSubmit(addMember)}>
                <AddMemberForm control={control} isContain />
              </FormStyled>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <DoubleButtonWrapper
          rightBtn={
            watch('selectType') === 'origin' ? (
              <DoubleButton is_right btn_size="125px" onClick={getSelected}>
                {`선택된 ${selected.length}명 추가`}
              </DoubleButton>
            ) : (
              <DoubleButton
                is_right
                btn_size="133px"
                onClick={handleSubmit(addMember)}
              >
                회원 생성 및 추가
              </DoubleButton>
            )
          }
          leftBtn={
            <DoubleButton onClick={close} btn_size="58px">
              취소
            </DoubleButton>
          }
        />
      </DialogActions>
    </>
  );
};

export default ContainMember;
