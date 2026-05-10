import { css } from '@emotion/css';

import { theme } from '@/styles';

export const sTableWrapper = css`
  padding: 0;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(78, 119, 63, 0.08);
  box-shadow: 0 14px 30px rgba(16, 24, 40, 0.06);
`;

export const sTable = css`
  width: 100%;
  border-radius: 6px;
  border-collapse: collapse;

  & > thead > tr > th {
    color: #4e773f;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    text-align: left;
    padding: 16px 14px;
    border-bottom: 1px solid rgba(78, 119, 63, 0.14);
    background: rgba(249, 251, 247, 0.96);
  }

  & > tbody > tr > td {
    text-align: left;
    color: #22301c;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    padding: 18px 14px;
    border-bottom: 1px solid rgba(78, 119, 63, 0.08);
  }

`;

export const sTableChild = css`
  width: 100%;
  border-radius: 6px;
  border-collapse: collapse;
  padding: 100px;
  overflow: hidden;

  & > thead > tr > th {
    color: #4e773f;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    text-align: left;
    padding: 16px 14px;
    border-bottom: 1px solid rgba(78, 119, 63, 0.14);
    background: rgba(249, 251, 247, 0.96);
  }

  & > thead > tr > th:nth-child(2) {
    width: 720px;
  }

  & > tbody > tr > td {
    text-align: left;
    color: #22301c;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    padding: 18px 14px;
    border-bottom: 1px solid rgba(78, 119, 63, 0.08);
  }

  & > tbody > tr > td:first-child {
    border-left: 1px solid rgba(78, 119, 63, 0.08);
  }

  & > tbody > tr > td:last-child {
    border-right: 1px solid rgba(78, 119, 63, 0.08);
  }

  & > tbody > tr > td:nth-child(2) {
    width: 720px;
  }
`;

export const sTableOverflowHidden = css`
  max-width: 43ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const sTableDateColumn = css`
  max-width: 26ch;
  white-space: normal;
`
