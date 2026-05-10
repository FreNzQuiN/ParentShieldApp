import { css } from "@emotion/css";

export const sTabContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(78, 119, 63, 0.14);
`;

export const sTabButton = css`
  background: transparent;
  border: none;
  padding: 14px 18px;
  color: #7b8d73;
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  cursor: pointer;
  border-radius: 12px 12px 0 0;
  transition: background 0.2s ease, color 0.2s ease;

  :hover {
    background: rgba(78, 119, 63, 0.06);
    color: #4e773f;
  }

  :active {
    opacity: 0.7;
  }
`;

export const sTabButtonActive = css`
  color: #4e773f;
  font-size: 15px;
  font-weight: 700;
  background: rgba(78, 119, 63, 0.08);
  box-shadow: inset 0 -3px 0 #4e773f;
`;