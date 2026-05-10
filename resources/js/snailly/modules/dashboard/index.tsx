import { useSnackbar } from 'notistack';
import React, { useState, useEffect, FormEvent } from 'react';

import { axiosGet, axiosPut, displayErrorMessage } from '@/utils';
import { zustand } from '@/services';
import { LogActivity, StatisticMonth, StatisticYear, Summary } from '@/models';

import DashboardViews from './views';
import moment, { Moment, MomentInput } from 'moment';

const DashboardModule = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { user, selectedChildId } = zustand();
  
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [logActivity, setLogActivity] = useState<LogActivity | null>(null);
  const [listOfSummary, setListOfSummary] = useState<Summary>({
    totalSafeWebsite: 0,
    totalDangerousWebsite: 0,
    persentageSafeWebsite: 0,
    persentageDangerousWebsite: 0,
  });
  const [listStatisticYear, setListStatisticYear] = useState<StatisticYear[]>([]);
  const [listStatisticMonth, setListStatisticMonth] = useState<StatisticMonth[]>([]);
  const [valueDate, setValueDate] = useState<MomentInput>(moment().format("YYYY-MM"));
  const [valueYear, setValueYear] = useState<MomentInput>(moment().year().toString());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [grantAccess, setGrantAccess] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [logId, setLogId] = useState<string>("");

  const linkOpenHandler = (url: string) => {
    window.open(url, '_blank');
  };

  const getListSummary = async () => {
    setIsLoading(true);
    try {
      const dataSummary = await axiosGet(`/log/summary/${selectedChildId || 'ALL'}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const summary = dataSummary.data.data;
      setListOfSummary(summary);
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
    }
  };

  const getListLogActivityChildren = async (childId?: string) => {
    try {
      const dataLogActivity = await axiosGet(`/log/${childId || 'ALL'}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        params: {
          page: 1,
          limit: 5
        }
      });
      const logActivities = dataLogActivity.data.data;
      setLogActivity(logActivities);
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatisticByYear = async (year: any) => {
    try {
      const dataStatisticYear = await axiosGet(
        `/log/statistic-year/${selectedChildId || 'ALL'}?year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      const statisticYear = dataStatisticYear.data.data;
      setListStatisticYear(statisticYear);
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
    }
  };

   const getStatisticByMonth = async (date: any) => {
     try {
       const dataStatisticMonth = await axiosGet(
         `/log/statistic-month/${selectedChildId || "ALL"}?date=${date}`,
         {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
       });

       const statisticMonth = dataStatisticMonth.data.data;
       setListStatisticMonth(statisticMonth);
     } catch (error) {
       displayErrorMessage(error, enqueueSnackbar);
     } finally {
        setIsLoading(false);
      }
  };
  
  const updateGrantAccessByParent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const dataGrantAccess = await axiosPut(
        `/log/grant-access/${logId}`,
        { grantAccess: grantAccess.toString() },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      enqueueSnackbar(dataGrantAccess.data.message, { variant: "success" });
      getListLogActivityChildren(selectedChildId)
      setIsEditModalOpen(false);
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModalHandler = (logId: string, grant_access: boolean, url: string) => {
    setIsEditModalOpen(true);
    setLogId(logId);
    setGrantAccess(!grant_access);
    setUrl(url);
  };

  const closeEditModalHandler = () => {
    setIsEditModalOpen(false);
  };

  const dateChangeHandler = (date: Moment) => {
    const formatedDate = date.format("YYYY-MM");
    setValueDate(formatedDate);
  };

  const yearChangeHandler = (date: Moment) => {
    const formatedYear = date.format("YYYY");
    setValueYear(formatedYear);
  };

  
  useEffect(() => {
    getListSummary()
    getListLogActivityChildren(selectedChildId)
  }, [selectedChildId])
  
  useEffect(() => {
    getListSummary()
    getStatisticByYear(valueYear)
    getStatisticByMonth(valueDate)
  }, [valueYear, valueDate, selectedChildId])

  return (
    <DashboardViews
      isLoading={isLoading}
      linkOpenHandler={linkOpenHandler}
      logActivity={logActivity}
      listOfSummary={listOfSummary}
      listStatisticMonth={listStatisticMonth}
      listStatisticYear={listStatisticYear}
      dateChangeHandler={dateChangeHandler}
      yearChangeHandler={yearChangeHandler}
      date={valueDate}
      year={valueYear}
      logId={logId}
      url={url}
      setLogId={setLogId}
      grantAccess={grantAccess}
      setGrantAccess={setGrantAccess}
      updateGrantAccess={updateGrantAccessByParent}
      openEditModalHandler={openEditModalHandler}
      closeEditModalHandler={closeEditModalHandler}
      isEditModalOpen={isEditModalOpen}
    />
  );
};

export default DashboardModule;
