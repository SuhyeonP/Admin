import React from 'react';
import { useInput } from 'custom-hook-react';
import { Editor } from '@toast-ui/react-editor';
import styled from '@emotion/styled';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import TitleComponent from '~/components/common/layout/titleComponent/TitleComponent';
import { ControlRuleInput } from '~/components/common/controlRuleInput';
import { AlertContext, AuthContext, GlobalContext } from '~/model';
import {
  alertStore,
  IMakeRelease,
  IReleaseList,
  ISendMailForm,
  ISendToCustomer,
  versionStore,
} from '~/model/store';
import { EmailTemplate } from '~/components/common/globalContent';
import { checkErr } from '~/api/checkErr';
import { IResponseData } from '~/api/customAPI';

const EditorWrapperStyled = styled.div`
  width: 100%;
`;

const NoteForm = (): JSX.Element => {
  const { logout } = React.useContext(AuthContext);
  const { type, selected } = React.useContext(AlertContext);
  const { controlBackdrop, controlSnackbar } = React.useContext(GlobalContext);
  const [title, onChangeTitle, setTitle] = useInput('');
  const editorRef = React.createRef<any>();

  const getOut = React.useCallback((err: AxiosError) => {
    const checkError = checkErr(err);
    if (checkError.tokenInValid) {
      logout();
    }
  }, []);

  const testMutation = useMutation<
    IResponseData<any>,
    AxiosError,
    ISendMailForm
  >(alertStore.sendTestMail, {
    onSuccess: res => {
      if (res.ok) {
        controlSnackbar({
          view: true,
          severity: 'success',
          msg: 'send!',
        });
      }
    },
    onError: err => {
      getOut(err);
    },
  });

  const mailMutation = useMutation<
    IResponseData<any>,
    AxiosError,
    ISendToCustomer
  >(alertStore.sendRealMail, {
    onSuccess: res => {
      if (res.ok) {
        controlSnackbar({
          view: true,
          severity: 'success',
          msg: 'send!',
        });
      }
    },
    onError: err => {
      getOut(err);
    },
  });

  const releaseMutation = useMutation<
    IResponseData<Record<'link_release_notice_id', number>>,
    AxiosError,
    IMakeRelease
  >(versionStore.setReleaseNotice, {
    onSuccess: res => {
      if (res.ok) {
        controlSnackbar({
          view: true,
          severity: 'success',
          msg: 'send!',
        });
      }
    },
    onError: err => {
      getOut(err);
    },
  });

  React.useLayoutEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    if (type === 'Release' && selected) {
      const { release_note, description } = selected as IReleaseList;
      editorInstance.setMarkdown(release_note);
      setTitle(description);
    } else if (type === 'Email') {
      setTitle('');
      editorInstance.setMarkdown('');
    }
  }, [type, selected]);

  const getContent = React.useCallback(() => {
    const editorInstance = editorRef.current.getInstance();
    const get_html = editorInstance.getHTML();
    const get_md = editorInstance.getMarkdown();

    return [get_html, get_md];
  }, [editorRef]);

  const showPreview = React.useCallback(() => {
    const [html] = getContent();
    const temp = (
      <EmailTemplate title={title}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </EmailTemplate>
    );

    controlBackdrop({
      view: true,
      content: temp,
    });
  }, [editorRef, title, type, selected]);

  const sendTest = React.useCallback(() => {
    testMutation.mutate({
      title,
      content: getContent()[0].toString(),
    });
  }, [title, editorRef]);

  const sending = React.useCallback(() => {
    const [html, md] = getContent();
    if (type === 'Release') {
      const { link_ver, link_ver_major, link_ver_micro, link_ver_minor, id } =
        selected as IReleaseList;
      const temp: IMakeRelease = {
        link_release_id: id || 0,
        link_ver,
        link_ver_major,
        link_ver_micro,
        link_ver_minor,
        notice: md,
        registered_at: new Date().toISOString(),
      };
      releaseMutation.mutate(temp);
    } else {
      mailMutation.mutate({
        customer_ids: alertStore.selectedCustomer.map(ele => ele.customer_id),
        title,
        content: html,
      });
    }
  }, [type, editorRef, title]);

  return (
    <>
      <TitleComponent title="제목">
        <ControlRuleInput value={title} onChange={onChangeTitle} />
      </TitleComponent>
      <TitleComponent title="내용">
        <EditorWrapperStyled>
          <Editor
            previewStyle="vertical"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={editorRef}
            height="600px"
          />
        </EditorWrapperStyled>
      </TitleComponent>
      <Grid container m={5} justifyContent="center">
        <ButtonGroup>
          <Button onClick={showPreview}>미리보기</Button>
          {type === 'Email' && (
            <Button onClick={sendTest}>테스트 메일 발송</Button>
          )}
          <Button onClick={sending}>발송</Button>
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default NoteForm;
