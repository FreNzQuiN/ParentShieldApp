import { css } from "@emotion/css";


export const sSetting = css`
  width: 100%;
  height: 100%;
  padding: 12px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

export const sSettingHeading = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 4px;
`

export const sSettingForm = css`
    width: min(100%, 560px);
    
    display: flex;
    gap: 12px;
    flex-direction: column;
    padding-top: 18px;
`

export const sSettingLogo = css`
    display: flex;
    justify-content: center;
    height: 180px;
    border-bottom: 1px solid rgba(78, 119, 63, 0.12);
    margin-bottom: 12px;
`

export const sSettingDodo = css`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 35vh;
  z-index: -1;
  opacity: 0.95;
`

export const sSettingButton = css`
  padding-top: 10px;
`;