import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

import { LoadingIcon, Globe, BadFace, SmileFace } from '@/assets';
import { Table, Card, Button, Modal } from '@/components';
import { Paragraph } from '@/typography';
import { getFormattedDateIndonesia } from '@/utils/formateDate';

import { DashboardViewsProps } from './types';
import {
  sTableLeft,
  sTableLink,
  sDashboardContent,
  sDashboardLoading,
  sDashboardNoLogActivity,
  sDashboardCardSection,
  sDashboardHeader,
  sDashboardTable,
  sDashboardChart,
  sDashboardChartHeader,
  sDashboardPie,
  sDashboardViz,
  sDatePickerPieChart,
  sDashboardButtonLock,
  sActionButton,
  sLogDeleteButton,
  sLogModalButton,
} from "./styles";
import { calculateGoodPercentage, getStatusComponent } from './helpers';
import { LockClosed, LockOpen } from '@/assets/lockaccess';

const DashboardViews = ({
  isLoading,
  linkOpenHandler,
  logActivity,
  listOfSummary,
  listStatisticYear,
  listStatisticMonth,
  date,
  year,
  logId,
  grantAccess,
  setLogId,
  setGrantAccess,
  url,
  dateChangeHandler,
  yearChangeHandler,
  updateGrantAccess,
  openEditModalHandler,
  closeEditModalHandler,
  isEditModalOpen
}: DashboardViewsProps) => {
  const dataYear = listStatisticYear.map((item) => {
    return {
      month: item.month,
      Good: item.Good,
      Bad: item.Bad,
    };
  })

  const dataMonth = listStatisticMonth.map((item) => {    
    return {
      name: item.name,
      value: item.name === "Good" && item.value === 0 ? 1 : item.value,
      fill: item.name === "Good" ? "#FFBC57" : "#FF5757",
    };
  })

  const renderPieChartLabel = (props) => {
    const { cx, cy } = props;
    return (
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill="#fff"
        fontSize={32}
        fontWeight={700}
      >
        {props.name === 'Good' ? `${calculateGoodPercentage(dataMonth)}%` : ''}
      </text>
    );
  };

  return (
    <>
      <Modal
        size="small"
        title={grantAccess === false ? "Are you sure to lock this website?" : "Are you sure to open this website?"}
        isOpen={isEditModalOpen}
        onClose={closeEditModalHandler}
        isGrantAccessType={true}
        name={url}
      >
        <form onSubmit={updateGrantAccess}>
          <div className={sLogModalButton}>
            <Button variant="tertiary" onClick={closeEditModalHandler} className={sLogDeleteButton}>
              No
            </Button>
            <Button type="submit" className={sLogDeleteButton}>
              Yes
            </Button>
          </div>
        </form>
      </Modal>
      {isLoading ? (
        <div className={sDashboardLoading}>
          <LoadingIcon size="s" />
        </div>
      ) : (
        <div className={sDashboardContent}>
          <section className={sDashboardCardSection}>
            <Card title="Total Accessed Content" icon={<Globe />}>
              {listOfSummary.totalSafeWebsite + listOfSummary.totalDangerousWebsite}
            </Card>
            <Card title="Total Positive Content" icon={<SmileFace />} variant="positive">
              {listOfSummary.totalSafeWebsite}
            </Card>
            <Card title="Total Negative Content" icon={<BadFace />} variant="negative">
              {listOfSummary.totalDangerousWebsite}
            </Card>
          </section>

          <div className={sDashboardViz}>
            <div className={sDashboardChart}>
              <div className={sDashboardChartHeader}>
                <Paragraph variant="l" weight="semibold">
                  Statistics Accessed Content
                </Paragraph>
                <DatePicker views={["year"]} label="Choose year" onChange={yearChangeHandler} value={moment(year)} />
              </div>

              <ResponsiveContainer width="99%" height={400}>
                <BarChart data={dataYear}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" dy={30} height={70} tickFormatter={(tick) => tick.substring(0, 3)} />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
                  <Bar dataKey="Good" fill="#4E773F" />
                  <Bar dataKey="Bad" fill="#FF5757" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className={sDashboardPie}>
              <Paragraph variant="l" weight="semibold" white>
                Monthly Percentage
              </Paragraph>
              <DatePicker
                  views={["month", "year"]}
                  label="Choose month"
                  className={sDatePickerPieChart}
                  onChange={dateChangeHandler}
                  value={moment(date)}
              />
              <PieChart width={170} height={250}>
                  <Legend
                    verticalAlign="top"
                    formatter={(value, _entry, _payload) => <span style={{ color: "#fff" }}>{value}</span>}
                  />
                   <Pie
                    data={dataMonth}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    labelLine={false}
                    label={renderPieChartLabel}
                    style={{ outline: "none" }}
                  />
              </PieChart>
              <Paragraph variant="m" white>
                Your child accessed {calculateGoodPercentage(dataMonth)}% positive content
              </Paragraph>
            </div>
          </div>

          <div className={sDashboardTable}>
            <Paragraph variant="l" weight="semibold">
              New Activity
            </Paragraph>
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>URL</th>
                  <th>Date</th>
                  <th>Children Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {logActivity?.items.map((item, index) => {
              // const title = new URL(item.url).hostname;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td onClick={() => linkOpenHandler(item.url)} className={sTableLeft}>
                        <p className={sTableLink}>{item.url ? item.url : "unknown"}</p>
                      </td>
                      <td>{getFormattedDateIndonesia(item.createdAt)}</td>
                      <td>{item.child.name}</td>
                      <td>{getStatusComponent(item)}</td>
                      <td>
                        <span className={sActionButton}>
                          <Button
                                type="button"
                            className={sDashboardButtonLock}
                            onClick={() => {
                              (item.grant_access !== null || item.classified_url["FINAL_label"] !== null) && openEditModalHandler(item.log_id, item.grant_access, item.url);
                            }}
                          >
                            {item.grant_access !== null ? (
                              item.grant_access == true ? (
                                <LockOpen />
                              ) : (
                                <LockClosed />
                              )
                            ) : (
                              <LockClosed /> // Default jika grant_access tidak terdefinisi
                            )}{" "}
                          </Button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {logActivity?.items.length === 0 && (
              <div className={sDashboardNoLogActivity}>
                <p>No Log Activity Available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardViews;
