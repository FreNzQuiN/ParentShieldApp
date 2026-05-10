import { css } from '@emotion/css'

export const sChildren = css`
    width: 100%;

    display: flex;
    gap: 24px;
    flex-direction: column;
`

export const sChildrenHeading = css`
    display: flex;
    justify-content: space-between;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
`

export const sChildrenContent = css`
    box-shadow: 0px 10px 28px rgba(16, 24, 40, 0.06);
    border-radius: 18px;
    overflow: hidden;
`;

export const sChildrenModalButton = css`
    width: 100%;

    margin-top: 20px;

    display: flex;
    justify-content: center;
    gap: 10px;
`

export const sChildrenAddButton = css`
    display: flex;
    justify-content: end;
`

export const sChildrenDeleteButton = css`
    width: 106px;
    height: 45px;
    padding: 12px 10px 12px 10px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const sChildrenAddIcon = css`
    padding-right: 10px;
`

export const sChildrenTableButton = css`
    display: flex;
    justify-content: start;
    gap: 5px;
    width: 100%;

    & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 40px;
        padding: 8px 16px 8px 16px;
        border-radius: 10px;
        margin: 0px 2.5px 0px 2.5px;
    }
`;

export const sChildrenTableLeft = css`
    text-align: left !important;
`

export const sChildrenLoading = css`
    width: 100%;

    margin-top: 40px;

    display: flex;
    justify-content: center;
`

export const sContentWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 24px;
`