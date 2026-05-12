import { css } from '@emotion/css'

import { theme } from '@/styles'

export const sBase = css`
    width: 100%;
    height: 100%;

    position: fixed;

    display: flex;
    overflow: hidden;

    @media (max-width: 900px) {
        position: relative;
        flex-direction: column;
        overflow: auto;
    }
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

    @media (max-width: 900px) {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
        height: 100vh;
        max-width: 280px;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
        overflow-y: auto;
    }
`

export const sBaseSidebarOpen = css`
    @media (max-width: 900px) {
        transform: translateX(0);
    }
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
    position: relative;
    z-index: 999;

    @media (max-width: 900px) {
        padding: 20px 16px;
        justify-content: flex-start;
    }
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

    @media (max-width: 900px) {
        padding: 20px 16px 24px;
    }
`

export const sBaseSidebarToggle = css`
    display: none;
    width: 44px;
    height: 44px;
    min-width: 44px;
    border: 1px solid rgba(78, 119, 63, 0.16);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.92);
    padding: 10px;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex-direction: column;
    z-index: 60;
    box-shadow: 0 10px 24px rgba(16, 24, 40, 0.1);
    cursor: pointer;

    @media (max-width: 900px) {
        display: inline-flex;
        margin-right: 16px;
    }
`

export const sBaseSidebarToggleBar = css`
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: ${theme.color.primary.darkGreen};
`

export const sBaseSidebarOverlay = css`
    position: fixed;
    inset: 0;
    z-index: 40;
    background: rgba(7, 18, 5, 0.28);

    @media (min-width: 901px) {
        display: none !important;
    }
`
