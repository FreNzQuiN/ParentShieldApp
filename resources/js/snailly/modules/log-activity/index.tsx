import { LoadingIcon } from '@/assets';
import { LockClosed, LockOpen } from '@/assets/lockaccess';
import { Status, Table, Button, Modal } from '@/components';
import Paging from '@/components/table/paging';
import {
  sTableDateColumn,
  sTableOverflowHidden,
} from '@/components/table/styles';
import { Tabs } from '@/components/tabs';
import { FILTER_PERIODE_TABS } from '@/constants/tabs';
import { LogActivity } from '@/models';
import { zustand } from '@/services';
import { axiosGet, axiosPut, displayErrorMessage } from '@/utils';
import { getFormattedDateIndonesia } from '@/utils/formateDate';
import { DatePicker } from '@mui/x-date-pickers';
import { useSnackbar } from 'notistack';
import moment, { Moment, MomentInput } from 'moment';
import { FormEvent, useEffect, useState } from 'react';
import { sChildrenLoading } from '../children/styles';
import {
  sDashboardButtonLock,
  sDashboardNoLogActivity,
  sTableLink,
} from '../dashboard/styles';

import {
  sLogActivityContainer,
  sTitleSection,
  sContentWrapper,
  sContentTable,
  sActionButton,
  sPagingSection,
  sContentBase,
  sLogModalButton,
  sLogDeleteButton,
} from './styles';
import { getStatusComponent } from '../dashboard/helpers';

const LogActivityModule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const [activeTab, setActiveTab] = useState(FILTER_PERIODE_TABS[0].value);
  const [logActivity, setLogActivity] = useState<LogActivity | null>(null);
  const [grantAccess, setGrantAccess] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [logId, setLogId] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [valueMonth, setValueMonth] = useState<Moment>(moment());
  const [valueDay, setValueDay] = useState<Moment>(moment());

  const state = {
    user: zustand((zustandState) => zustandState.user),
    childrenList: zustand((zustandState) => zustandState.childrenList),
    selectedChildId: zustand((zustandState) => zustandState.selectedChildId),
  };

  const getLogData = async (page: number = 1, limit: number = 10) => {
    setIsLoading(true);
    try {
      const response = await axiosGet(
        `/log/${state.selectedChildId || 'ALL'}?period=${activeTab}`,
        {
          headers: {
            Authorization: `Bearer ${state.user.accessToken}`,
          },
          params: {
            page,
            limit,
          },
        }
      );
      const data = response.data.data;
      setLogActivity(data);
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
    }
  };

  const getLogDataByDaily = async (page: number = 1, limit: number = 10) => {
    setIsLoading(true);
    const monthValue = valueDay.month() + 1;
    const yearValue = valueDay.year();
    const dayValue = valueDay.date();

    try {
      const response = await axiosGet(
        `/log/${state.selectedChildId || 'ALL'}?period=${activeTab}`,
        {
          headers: {
            Authorization: `Bearer ${state.user.accessToken}`,
          },
          params: {
            page,
            limit,
            month: monthValue + 1,
            year: yearValue,
            date: dayValue,
          },
        }
      );
      const data = response.data.data;
      setLogActivity(data);
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
    }
  };

  const getLogDataByMonth = async (
    page: number = 1,
    limit: number = 10,
    month = moment().month(),
    year = moment().year()
  ) => {
    setIsLoading(true);
    const monthValue = valueMonth.month() + 1;
    const yearValue = valueMonth.year();
    try {
      const response = await axiosGet(
        `/log/${state.selectedChildId || 'ALL'}?period=${activeTab}`,
        {
          headers: {
            Authorization: `Bearer ${state.user.accessToken}`,
          },
          params: {
            page,
            limit,
            month: monthValue + 1,
            year: yearValue,
          },
        }
      );
      const data = response.data.data;
      setLogActivity(data);
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
    }
  };

  const getDatePickerViews = () => {
    switch (activeTab) {
      case 'daily':
        return ['day'];
      case 'monthly':
        return ['day', 'month'];
      default:
        return ['day', 'month', 'year'];
    }
  };

  const updateGrantAccessByParent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dataGrantAccess = await axiosPut(
        `/log/grant-access/${logId}`,
        { grantAccess: grantAccess.toString() },
        {
          headers: {
            Authorization: `Bearer ${state.user.accessToken}`,
          },
        }
      );
      const updatedGrantAccess = dataGrantAccess.data.data.grantAccess;
      enqueueSnackbar(dataGrantAccess.data.message, { variant: 'success' });
      getLogDataByDaily();
      setIsEditModalOpen(false);
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModalHandler = (
    logId: string,
    grant_access: boolean,
    url: string
  ) => {
    setIsEditModalOpen(true);
    setLogId(logId);
    setGrantAccess(!grant_access);
    setUrl(url);
  };

  const closeEditModalHandler = () => {
    setIsEditModalOpen(false);
  };

  const dateChangeHandler = (date: Moment | null) => {
    if (date) {
      setValueMonth(date);
    }
  };

  const dateChangeHandlerDaily = (date: Moment | null) => {
    if (date) {
      setValueDay(date);
    }
  };

  const linkOpenHandler = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (activeTab === 'monthly') {
      getLogDataByMonth();
    } else if (activeTab === 'daily') {
      getLogDataByDaily();
    } else {
      getLogData();
    }
  }, [activeTab, state.selectedChildId, valueMonth, valueDay]);

  return (
    <>
      <Modal
        size="small"
        title={
          grantAccess === false
            ? 'Are you sure to lock this website?'
            : 'Are you sure to unlock this website?'
        }
        isOpen={isEditModalOpen}
        onClose={closeEditModalHandler}
        isGrantAccessType={true}
        name={url}
      >
        <form onSubmit={updateGrantAccessByParent}>
          <div className={sLogModalButton}>
            <Button
              variant="tertiary"
              onClick={closeEditModalHandler}
              className={sLogDeleteButton}
            >
              Cancel
            </Button>
            <Button type="submit" className={sLogDeleteButton}>
              Yes
            </Button>
          </div>
        </form>
      </Modal>
      <div className={sLogActivityContainer}>
        <div className={sTitleSection}>
          {activeTab === 'monthly' && (
            <DatePicker
              onChange={dateChangeHandler}
              views={['month', 'year']}
              label="Choose Month"
              value={valueMonth}
            />
          )}
          {activeTab === 'daily' && (
            <DatePicker
              onChange={dateChangeHandlerDaily}
              views={['day', 'month', 'year']}
              label="Choose Date"
              value={valueDay}
            />
          )}
          <div style={{marginLeft: 'auto'}}>
            <Tabs
              tabs={FILTER_PERIODE_TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
        <div className={sContentWrapper}>
          {isLoading && (
            <div className={sChildrenLoading}>
              <LoadingIcon size="s" />
            </div>
          )}
          {!isLoading && (
            <>
              {logActivity?.items.length > 0 && (
                <div className={sContentBase}>
                  <div className={sContentTable}>
                    <Table>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>URL</th>
                          <th>Date</th>
                          <th>Child Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logActivity?.items.map((log, index) => (
                          <tr key={index}>
                            <td>
                              {(logActivity.page - 1) * logActivity.limit +
                                index +
                                1}
                            </td>
                            <td className={sTableOverflowHidden} onClick={() => linkOpenHandler(log.url)}>
                              <p className={sTableLink}>{ log.url ? log.url : "unknown url" }</p>
                            </td>
                            <td className={sTableDateColumn}>
                              {getFormattedDateIndonesia(log.createdAt)}
                            </td>
                            <td>{log.child.name}</td>
                            <td>{getStatusComponent(log)}</td>
                            <td>
                              <Button
                                type="button"
                                className={sDashboardButtonLock}
                                onClick={() => {
                                  (log.grant_access !== null ||
                                    log.classified_url['FINAL_label'] !==
                                      null) &&
                                    openEditModalHandler(
                                      log.log_id,
                                      log.grant_access,
                                      log.url
                                    );
                                }}
                              >
                                {log.grant_access !== null ? (
                                  log.grant_access == true ? (
                                    <LockOpen />
                                  ) : (
                                    <LockClosed />
                                  )
                                ) : (
                                  <LockClosed />
                                )}{' '}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <div className={sPagingSection}>
                    <Paging
                      addCustomTablePaging={false}
                      page={logActivity.page}
                      limit={logActivity.limit}
                      totalPage={logActivity.totalPage}
                      handlePreviousPage={() => {
                        activeTab === 'daily'
                          ? getLogDataByDaily(logActivity.page - 1)
                          : activeTab === 'monthly'
                          ? getLogDataByMonth(logActivity.page - 1)
                          : getLogData(logActivity.page - 1); // Replace with your default case
                      }}
                      handleNextPage={() => {
                        activeTab === 'daily'
                          ? getLogDataByDaily(logActivity.page + 1)
                          : activeTab === 'monthly'
                          ? getLogDataByMonth(logActivity.page + 1)
                          : getLogData(logActivity.page + 1); // Replace with your default case
                      }}
                      handleJumpToPage={(pageNumber) => {
                        activeTab === 'daily'
                          ? getLogDataByDaily(pageNumber)
                          : activeTab === 'monthly'
                          ? getLogDataByMonth(pageNumber)
                          : getLogData(pageNumber); // Replace with your default case
                      }}
                      maxPageNumber={5}
                    />
                  </div>
                </div>
              )}
              {logActivity?.items.length === 0 && (
                <div className={sDashboardNoLogActivity}>
                  <p>There is no log activity</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LogActivityModule;
