import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sRoute = css`
    width: 100%;

    display: flex;
    gap: 20px;
    align-items: center;

    border-radius: 6px;

    padding: 12px 20px;

    cursor: pointer;

    transition: 0.2s all;

    text-decoration: none;

    &:hover {
        background-color: ${theme.color.primary.lightGreen};
    }
`

export const sRouteActive = css`
    background-color: ${theme.color.primary.lightGreen};
`

export const sRouteIcon = css`
    width: 100%;
    height: 100%;
    max-width: 30px;

    display: grid;
    place-items: center;
`
