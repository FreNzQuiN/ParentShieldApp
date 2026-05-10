import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sAuth = css`
    width: 100%;
    height: 100%;

    display: flex;
    gap: 50px;

    position: fixed;
    overflow: hidden;

    background:
        radial-gradient(circle at top left, rgba(78, 119, 63, 0.16), transparent 35%),
        radial-gradient(circle at bottom right, rgba(145, 166, 89, 0.14), transparent 25%),
        linear-gradient(180deg, #f7faf5 0%, #eaf1e4 100%);
`

export const sAuthLeft = css`
    width: 100%;

    padding: 92px 32px 28px 40px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const sAuthLeftText = css`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 12px;

    & h1 {
        color: ${theme.color.primary.darkGreen};
        font-size: ${theme.font.size[64]};
        line-height: ${theme.font.height[64]};
    }

    & p {
        color: ${theme.color.primary.lightGreen};
        max-width: 560px;
        font-size: ${theme.font.size[18]};
        line-height: ${theme.font.height[18]};
    }
`

export const sAuthLeftIcon = css`
    width: 100%;
    max-width: 520px;

    position: relative;
    top: 20px;

    margin: 0 auto;
`

export const sAuthRight = css`
    width: 100%;
    max-width: 420px;

    padding: 36px 32px;

    overflow: auto;

    background-color: ${theme.color.primary.darkGreen};
    box-shadow: -16px 0 36px rgba(0, 0, 0, 0.14);
`

export const sAuthRightLogo = css`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 32px;

`
