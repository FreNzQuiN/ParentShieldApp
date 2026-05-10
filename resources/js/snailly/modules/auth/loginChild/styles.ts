import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sLoginChild = css`
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    display: grid;
    place-items: center;

    background-color: ${theme.color.primary.darkGreen};
`

export const sLoginChildContent = css`
    width: 100%;
    max-width: 300px;

    display: flex;
    gap: 40px;
    flex-direction: column;
`

export const sLoginChildLogo = css`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const sLoginChildHeader = css`
    width: 100%;

    text-align: center;
`

export const sLoginChildAccountWrapper = css`
    width: 100%;

    display: flex;
    gap: 20px;
    flex-direction: column;
`

export const sLoginChildAccount = css`
    width: 100%;

    display: flex;
    gap: 20px;
    align-items: center;

    text-align: left;

    background-color: transparent;

    border-radius: 6px;

    padding: 12px 10px;

    cursor: pointer;

    transition: 0.5s;

    border: 2px solid ${theme.color.primary.lightGreen};

    &:hover {
        background-color: ${theme.color.primary.lightGreen};
    }

    &:active {
        transform: scale(0.95);
    }
`

export const sLoginAsParent = css`
    width: 100%;

    text-align: center;

    display: flex;
    gap: 30px;
    align-items: center;
    flex-direction: column;
`

export const sLoadingContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
`
