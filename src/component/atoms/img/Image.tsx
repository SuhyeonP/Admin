import React from 'react';
import styled from '@emotion/styled';

export interface IImgProps {
  src: string;
  alt: string;
}

const ImgStyled = styled.img`
  width: 100%;
  height: 100%;
`;

const Image = ({ src, alt }: IImgProps): JSX.Element => {
  return <ImgStyled src={src} alt={alt} />;
};

export default Image;
