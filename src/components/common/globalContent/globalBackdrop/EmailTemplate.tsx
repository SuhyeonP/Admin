import React from 'react';
import { css } from '@emotion/react';
import { LogoLight } from '~/asset/icon';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const EmailTemplate = ({ title, children }: IProps): JSX.Element => {
  return (
    <div
      css={css`
        width: 60vw;
        min-height: 80vh;
        background: white;
        padding: 32px;
      `}
    >
      <div>
        <LogoLight />
      </div>
      <div>
        <h3
          css={css`
            font-weight: 700;
            font-size: 30px;
            line-height: 43px;

            color: #464555;
          `}
        >
          {title}
        </h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default EmailTemplate;
