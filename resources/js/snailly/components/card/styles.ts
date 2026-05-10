import { css } from '@emotion/css';
import { theme } from '@/styles'


export const sCard = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 280px;
  min-height: 110px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 26px rgba(78, 119, 63, 0.08);
  border-radius: 16px;
  padding: 14px 16px;
  border: 1px solid rgba(78, 119, 63, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(78, 119, 63, 0.12);
  }
`;

export const sCardContent = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const sCardContentAll = css`
  color: ${theme.color.primary.lightGreen};
  font-size: ${theme.font.size[36]};
`;

export const sCardContentPositive = css`
  color: ${theme.color.secondary.blue};
  font-size: ${theme.font.size[36]};
`;

export const sCardContentNegative = css`
  color: ${theme.color.secondary.red};
  font-size: ${theme.font.size[36]};
`;

export const sCardIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  padding: 2px;
  background: linear-gradient(180deg, rgba(145, 166, 89, 0.18) 0%, rgba(78, 119, 63, 0.08) 100%);
`;