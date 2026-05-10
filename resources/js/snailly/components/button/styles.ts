import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sButton = css`
    color: ${theme.color.primary.white};

    font-weight: bold;
    font-size: ${theme.font.size[16]};

    transition: 0.2s all;

    border: none;
    border-radius: 14px;

    cursor: pointer;

    padding: 11px 16px;
    box-shadow: 0 10px 20px rgba(16, 24, 40, 0.08);

    &:active {
        transform: translateY(1px) scale(0.99);
    }

    &:disabled {
        background-color: ${theme.color.secondary.lightGrey};
        box-shadow: none;
        cursor: not-allowed;
    }
`

export const sButtonPrimary = css`
    background-color: ${theme.color.primary.lightGreen};
`

export const sButtonSecondary = css`
    background-color: ${theme.color.secondary.lightOrange2};
`

export const sButtonTertiary = css`
    color: ${theme.color.secondary.grey};
    border: 1px solid rgba(102, 102, 102, 0.24);
    background-color: rgba(255, 255, 255, 0.92);

    &:hover {
        background-color: rgba(243, 242, 242, 0.96);
    }
`

export const sButtonRed = css`
    color: ${theme.color.primary.white};
    border: 1px solid ${theme.color.primary.lightRed};
    background-color: ${theme.color.primary.lightRed};

    &:hover {
        filter: brightness(0.98);
    }
`

export const sButtonFull = css`
    width: 100%;
`
