import { css } from "@emotion/css";


export const sAbout = css`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 28px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(78, 119, 63, 0.08);
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(16, 24, 40, 0.06);
`;

export const sAboutHeading = css`
  padding-top: 7px;
`

export const sAboutLogo = css`
    display: flex;
    justify-content: center;
    height: 160px;
    border-bottom: 1px solid rgba(78, 119, 63, 0.12);
    margin-bottom: 12px;
`

export const sAboutDodo = css`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 35vh;
  z-index: -1;
  opacity: 0.9;
`