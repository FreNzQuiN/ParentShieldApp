import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sHomeModule = css`
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    display: grid;
    place-items: center;

    background:
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.12), transparent 28%),
        radial-gradient(circle at bottom right, rgba(145, 166, 89, 0.18), transparent 24%),
        linear-gradient(180deg, #4e773f 0%, #3f6134 100%);
`

export const sHomeModuleContent = css`
    width: 100%;
    max-width: 360px;

    display: flex;
    gap: 36px;
    flex-direction: column;

    padding: 24px;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.16);
`

export const sHomeModuleLogo = css`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const sHomeModuleHeading = css`
    width: 100%;

    text-align: center;
`

export const sHomeModuleRoleWrapper = css`
    width: 100%;

    display: flex;
    justify-content: space-around;
    gap: 18px;
`

export const sHomeModuleRole = css`
    width: 118px;
    height: 118px;

    border-radius: 18px;

    display: grid;
    place-items: center;

    cursor: pointer;

    background-color: transparent;

    border: 1px solid rgba(255, 255, 255, 0.35);
    color: ${theme.color.primary.white};

    transition: 0.25s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.14);
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.95);
    }
`

export const sHomeModuleRoleItem = css`
    display: flex;
    gap: 10px;
    align-items: center;
    flex-direction: column;

    > p {
        font-weight: 600;
    }
`
