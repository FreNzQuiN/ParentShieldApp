import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sStatus = css`
    font-size: ${theme.font.size[14]};

    padding: 7px 10px;
    border-radius: 999px;
    white-space: nowrap;
    align-items: center;
    display: inline-flex;
    font-weight: 600;
`

export const sStatusPositive = css`
  background-color: rgba(51, 170, 91, 0.12);
  color: #2f8a4c;
`;

export const sStatusNegative = css`
  background-color: rgba(255, 61, 61, 0.12);
  color: #d95353;
`;

export const sStatusNotLabelling = css`
  background-color: rgba(252, 186, 3, 0.12);
  color: #c68a00;
`;