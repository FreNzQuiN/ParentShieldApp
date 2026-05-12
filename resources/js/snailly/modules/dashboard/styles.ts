import { theme } from '@/styles';
import { css } from '@emotion/css';

export const sDashboardLoading = css`
  width: 100%;

  margin-top: 48px;

  display: flex;
  justify-content: center;
`;

export const sDashboardHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const sDashboardButtonLock = css`
  background-color: transparent;
  padding: 4px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  :hover {
    background: rgba(78, 119, 63, 0.08);
  }
`;

export const sDashboardContent = css`
  width: 100%;

  display: flex;
  gap: 24px;
  flex-direction: column;
`;

export const sDashboardCardSection = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  justify-content: stretch;

  > section {
    width: 100%;
  }
`;

export const sDashboardNoLogActivity = css`
  width: 100%;

  margin-top: 48px;
  text-align: center;
`;

export const sDashboardTable = css`
  box-shadow: 0px 10px 28px rgba(16, 24, 40, 0.06);
  border-radius: 18px;
  overflow: hidden;
`;

export const sDashboardChart = css`
  padding: 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 10px 28px rgba(16, 24, 40, 0.06);
  flex: 1;

  @media (max-width: 900px) {
    padding: 18px;
  }
`;

export const sDashboardChartHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 20px;
`;

export const sDashboardPie = css`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #4e773f 0%, #416434 100%);
  min-height: 420px;
  padding: 24px 20px;
  width: 300px;
  border-radius: 20px;
  text-align: center;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 360px;
  }
`;

export const sDashboardViz = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const sTableLeft = css`
  text-align: left !important;
   max-width: 43ch;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const sTableLink = css`
  cursor: pointer;

  text-decoration: underline;
`;

export const sDatePicker = css`
  background-color: rgba(255, 255, 255, 0.72);
  border-radius: 12px;

  .MuiDatePickersPopper-root {
    z-index: 900 !important;
  }
`;

export const sDatePickerPieChart = css`
  background-color: rgba(255, 255, 255, 0.14);
  border-radius: 12px;

  input, svg, label {
    color: #fff;
  }

  .MuiDatePickersPopper-root {
    z-index: 900 !important;
  }
`;

export const sDashboardDatePickerWrapper = css`
  .MuiDatePickersPopper-root {
    z-index: 1001 !important;
  }
`;

export const sSelect = css`
  &:hover {
    background-color: ${theme.color.primary.lightGreen};
  }
`;


export const sActionButton = css`
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.6;
  }
`;


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
