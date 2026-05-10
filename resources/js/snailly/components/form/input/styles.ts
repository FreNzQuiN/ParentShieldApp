import { css } from '@emotion/css'
import { theme } from '@/styles'

export const sInputWrapper = css`
    width: 100%;

    display: flex;
    gap: 8px;
    flex-direction: column;

    text-align: left;
`

export const sInput = css`
    width: 100%;

    outline: none;

    border-radius: 14px;

    font-size: ${theme.font.size[16]};

    padding: 12px 16px;

    border: 1px solid rgba(78, 119, 63, 0.24);
    background: rgba(255, 255, 255, 0.92);
    color: ${theme.color.secondary.black};

    transition: 0.2s all;

    &:focus {
        border: 1px solid ${theme.color.primary.darkGreen};
        box-shadow: 0 0 0 4px rgba(78, 119, 63, 0.12);
    }

    &:disabled {
        background-color: ${theme.color.secondary.lightGrey};
        color: ${theme.color.secondary.grey};
    }
`
