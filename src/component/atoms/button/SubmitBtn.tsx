import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { defaultBlack, defaultWhite } from '~/src/component/style/color';

interface IProps extends IBtnStyled {
  label: string;
  isDoubleBtn?: boolean;
}

interface IBtnStyled {
  backgroundColor?: string;
  borderColor?: string;
  fontColor?: string;
  isAble?: boolean;
  btn_size?: string;
}

const SubmitBtnStyled = styled.input<IBtnStyled>(
  ({
    backgroundColor = defaultWhite,
    borderColor = defaultWhite,
    fontColor = defaultBlack,
    isAble = false,
  }) => {
    const common = css`
      width: 100%;
      padding: 10px 16px;
      outline: 0;
      border-radius: 4px;
    `;

    if (isAble) {
      return css`
        ${common};

        color: ${fontColor};
        background-color: ${backgroundColor};
        border: 1px solid ${borderColor};

        cursor: pointer;
      `;
    } else {
      return css`
        ${common};

        color: ${defaultWhite};
        background-color: grey;
        border: 1px solid grey;

        cursor: unset;
      `;
    }
  },
);

interface IBtnProps {
  btn_size?: string;
}

const DoubleBtn = styled.input(
  ({ btn_size }: IBtnProps) =>
    `
  border: 1px solid ${defaultBlack};
  border-radius: 4px;
  width: ${btn_size};
  height: 36px;

  align-items: center;

  text-overflow: ellipsis;
  white-space: nowrap;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  background-color: ${defaultBlack};
  color: ${defaultWhite};
`,
);

const SubmitBtn = ({
  label,
  backgroundColor,
  borderColor,
  fontColor,
  isAble,
  isDoubleBtn = false,
  btn_size = '103px',
}: IProps): JSX.Element => {
  return (
    <>
      {isDoubleBtn ? (
        <DoubleBtn
          isAble={isAble}
          disabled={!isAble}
          type="submit"
          value={label}
          btn_size={btn_size}
        />
      ) : (
        <SubmitBtnStyled
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          fontColor={fontColor}
          isAble={isAble}
          disabled={!isAble}
          type="submit"
          value={label}
        />
      )}
    </>
  );
};

export default SubmitBtn;
