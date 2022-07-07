import styled from '@emotion/styled';
import { colorPalette } from 'marketing/style/color';

export const IndicatorWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 16px 24px;

  background: ${colorPalette.default_white};
  border: 1px solid ${colorPalette.border_gray};
  border-radius: 8px;
`;
