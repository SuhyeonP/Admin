import React from 'react';
import { Editor } from '@toast-ui/react-editor';
import { Box, BoxProps, styled } from '@mui/material';
import { ExtendOmit } from '~/src/util/types';
import { CommonBoxStyled } from '~/src/globalStyles';
import { defaultWhite } from '~/src/component/style/color';

interface IProps extends ExtendOmit<BoxProps> {
  setTemp: any;
  height?: string;
}

const EditorBoxStyled = styled(Box)`
  width: 100%;

  background-color: ${defaultWhite};
`;

const ReleaseNote = ({
  setTemp,
  height = '600px',
  ...props
}: IProps): JSX.Element => {
  const editorRef = React.createRef<any>();

  React.useEffect(() => {
    setTemp(editorRef.current.getInstance());
  }, [editorRef]);

  return (
    <CommonBoxStyled>
      <EditorBoxStyled {...props}>
        <Editor
          previewStyle="vertical"
          initialEditType="markdown"
          useCommandShortcut
          height={height}
          ref={editorRef}
        />
      </EditorBoxStyled>
    </CommonBoxStyled>
  );
};

export default ReleaseNote;
