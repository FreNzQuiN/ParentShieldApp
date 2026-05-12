import { css } from '@emotion/css';

export const sSelectChildWrapper = css`
  position: relative;
  z-index: 999;
`;

export const sSelectChildBoxContainer = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 292px;
  padding: 12px 16px;
  justify-content: space-between;
  gap: 8px;
  overflow: hidden;

  border-radius: 16px;
  border: 1px solid rgba(78, 119, 63, 0.28);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.06);
  cursor: pointer;

  :hover {
    background-color: rgba(78, 119, 63, 0.08);
  }

  :active {
    opacity: 0.85;
  }
`;

export const sSelectChildPreviewBox = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  min-width: 0;
`;

export const sSelectChildIcon = css`
  padding: 4px;
`;

export const sSelectChildPreview = css`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  align-items: flex-start;
`;

export const sSelectChildPreviewLabel = css`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  color: #5f6f56;
`;

export const sSelectChildPreviewChildName = css`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  color: #20311a;
`;

export const sSelectChildChevron = css`
  min-width: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const sChildListContainer = css`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  z-index: 999;

  display: flex;
  width: 440px;
  max-height: 310px;
  overflow: scroll;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  border-radius: 18px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0px 18px 40px rgba(0, 0, 0, 0.18);

  > * {
    width: 100%;
  }
`;

export const sChildSearchWrapper = css`
  position: relative;

  input[type='text'] {
    width: 100%;
    padding: 12px 16px 12px 48px;
    border-radius: 12px;
    border: 1px solid rgba(78, 119, 63, 0.22);
    outline: none;

    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: #f9fbf7;
    color: #20311a;

    ::placeholder {
      color: #94a08d;
    }

    :focus {
      border-color: #4e773f;
      box-shadow: 0 0 0 4px rgba(78, 119, 63, 0.12);
    }
  }
`;

export const sChildrenListWrapper = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;

  div {
    width: 100%;
    border-radius: 12px;
    padding: 10px 14px;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
    :hover {
      background: rgba(78, 119, 63, 0.08);
    }
    :active {
      opacity: 0.85;
    }
  }

  div.active {
    background: #4e773f;
    color: #fff;
  }
`;

export const sChildSearchIcon = css`
  position: absolute;
  left: 15px;
  top: 10px;
`;
