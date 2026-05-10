import { css } from '@emotion/css';

export const sPagingWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 16px;
  font-weight: 600;

  > button {
    display: flex;
    width: 35px;
    height: 35px;
    padding: 8px 10px;
    justify-content: center;
    align-items: center;
    gap: 15px;
    border-radius: 10px;
    border: 1px solid rgba(78, 119, 63, 0.3);
    color: #4e773f;
    background: rgba(255, 255, 255, 0.92);
    cursor: pointer;

    :hover {
      background: #4e773f;
      color: #fff;
    }

    :active {
      opacity: 0.8;
    }

    :disabled {
      border: 1px solid #c6cec0;
      color: #9c9c9c;
    }
  }

  > div {
    display: flex;
    gap: 4px;
  }

  > div > button {
    display: flex;
    width: 35px;
    height: 35px;
    padding: 8px 10px;
    justify-content: center;
    align-items: center;
    gap: 15px;
    border-radius: 10px;
    border: 1px solid #c6cec0;
    color: #9c9c9c;
    background: rgba(255, 255, 255, 0.92);
    cursor: pointer;

    :hover {
      background: #4e773f;
      color: #fff !important;
    }

    :active {
      opacity: 0.8;
    }
  }

  > div > button.active {
    color: #4e773f;
    border: 1px solid rgba(78, 119, 63, 0.45);
    background: rgba(78, 119, 63, 0.08);
  }
`;