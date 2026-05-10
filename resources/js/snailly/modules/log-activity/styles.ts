import { css } from '@emotion/css';

export const sTitleSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const sLogActivityContainer = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const sContentWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const sContentBase = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const sLogDeleteButton = css`
  width: 106px;
  height: 45px;
  padding: 12px 10px 12px 10px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const sLogModalButton = css`
  width: 100%;

  margin-top: 20px;

  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const sContentTable = css`
  min-width: 0;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0px 10px 28px rgba(16, 24, 40, 0.06);
`;

export const sActionButton = css`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.6;
  }
`;

export const sPagingSection = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
