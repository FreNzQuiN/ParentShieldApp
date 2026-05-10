import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sBase = css`
    width: 100%;
    height: 100%;

    position: fixed;

    display: flex;
    overflow: hidden;
`

export const sBaseNavigation = css`
    width: 100%;
    max-width: 272px;

    height: 100%;

    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: space-between;

    padding: 24px 16px;

    background-color: ${theme.color.primary.darkGreen};
    box-shadow: 8px 0 30px rgba(0, 0, 0, 0.12);
`

export const sBaseNavigationContent = css`
    width: 100%;

    display: flex;
    gap: 56px;
    flex-direction: column;
`

export const sBaseNavigationLogo = css`
    width: 100%;
    display: flex;
    justify-content: center; 
`

export const sBaseNavigationList = css`
    width: 100%;

    display: flex;
    gap: 6px;
    flex-direction: column;
`

export const sBaseNavigationFooter = css`
    width: 100%;

    text-align: center;
`

export const sBaseHeader = css`
    width: 100%;
    padding: 24px 28px;
    background: rgba(255, 255, 255, 0.68);
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 0 rgba(16, 24, 40, 0.06), 0 6px 20px rgba(16, 24, 40, 0.06);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`

export const sBaseContent = css`
    width: 100%;

    display: flex;
    flex-direction: column;
    min-width: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.22));
`

export const sBaseHeaderTitle = css`
    color: ${theme.color.primary.darkGreen};
`

export const sBaseChildrenWrapper = css`
    width: 100%;
    height: 100%;

    overflow: auto;

    padding: 30px 36px 36px;
`
