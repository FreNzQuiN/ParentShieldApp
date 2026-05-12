import { css } from '@emotion/css'

export const sModal = css`
    width: 100%;
    height: 100%;

    display: grid;
    place-items: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    padding: 24px;

    background-color: rgba(7, 18, 5, 0.56);
    backdrop-filter: blur(6px);
`

export const sModalContent = css`
    width: 100%;

    padding: 22px;

    display: flex;
    flex-direction: column;

    border-radius: 22px;
    border: 1px solid rgba(78, 119, 63, 0.08);
    box-shadow: 0 24px 60px rgba(16, 24, 40, 0.18);

    background: rgba(255, 255, 255, 0.98);
`

export const sModalHeader = css`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 18px;
`

export const sModalExit = css`
    cursor: pointer;

    display: grid;
    place-items: center;
`

export const sModalContentSmall = css`
    max-width: 400px;
`

export const sModalContentMedium = css`
    max-width: 700px;
`

export const sModalContentLarge = css`
    max-width: 900px;
`

export const sDeleteType = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px 20px;
    text-align: center;
`

export const sDeleteTypeContent = css`
    padding-top: 12px;
    max-width: 36ch;
    white-space: normal;
    line-height: 1.55;
`;



export const sDeleteName = css`
    font-weight: 600;
`
