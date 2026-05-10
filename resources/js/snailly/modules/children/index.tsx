import { useSnackbar } from 'notistack';
import React, { useRef, useEffect, useState, FormEvent } from 'react';

import { UserChild, User } from '@/models';
import { zustand } from '@/services';
import {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
  displayErrorMessage,
} from '@/utils';

import { FormData } from './types';
import ChildrenViews from './views';
import {
  setChildrenList,
  setSelectedChildId,
} from '@/services/zustand/helpers';

const ChildrenModule = () => {
  const isFirstRender = useRef(true);

  const { enqueueSnackbar } = useSnackbar();

  const state = {
    user: zustand((zustandState) => zustandState.user),
    childrenList: zustand((zustandState) => zustandState.childrenList),
    setChildrenList: zustand((zustandState) => zustandState.setChildrenList),
    setSelectedChildId: zustand(
      (zustandState) => zustandState.setSelectedChildId
    ),
    selectedChildId: zustand((zustandState) => zustandState.selectedChildId),
  };

  const defaultFormData = {
    name: '',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [listOfChildren, setListOfChildren] = useState<UserChild[]>([]);
  const [childId, setChildId] = useState<UserChild['id']>();
  const [formData, setFormData] = useState<FormData>({
    ...defaultFormData,
  });

  const openAddModalHandler = () => {
    setIsAddModalOpen(true);
    setFormData({ ...defaultFormData });
  };

  const closeAddModalHandler = () => {
    setIsAddModalOpen(false);
  };

  const opedEditModalHandler = (id: User['id'], name: User['name']) => {
    setFormData({
      name: name,
    });
    setChildId(id);

    setIsEditModalOpen(true);
  };

  const closeEditModalHandler = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModalHandler = (id: User['id'], name: User['name']) => {
    setFormData({
      name: name,
    });
    setChildId(id);

    setIsDeleteModalOpen(true);
  };

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false);
  };

  const inputAddOnChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const inputEditOnChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const inputDeleteOnChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formAddOnSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { user, setChildrenList, childrenList } = state;

    try {
      setIsFormLoading(true);

      enqueueSnackbar('Tambah Data Anak', { variant: 'info' });

      const response = await axiosPost(
        'child/',
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      setIsAddModalOpen(false);
      const newChildrenList = [...childrenList, response.data.data];
      setChildrenList(newChildrenList);
      setFormData({ ...defaultFormData });

      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsFormLoading(false);
    }
  };

  const formEditOnSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { user, childrenList, setChildrenList } = state;

    try {
      setIsFormLoading(true);

      enqueueSnackbar('Edit Data Anak', { variant: 'info' });

      const response = await axiosPut(
        `child/${childId}`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      setIsEditModalOpen(false);
      const newChildrenList = [
        ...childrenList.filter((child) => child.id !== childId),
        response.data.data,
      ];
      setChildrenList(newChildrenList);
      setFormData({ ...defaultFormData });

      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsFormLoading(false);
    }
  };

  const formDeleteOnSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      user,
      childrenList,
      setChildrenList,
      selectedChildId,
      setSelectedChildId,
    } = state;

    try {
      setIsFormLoading(true);

      enqueueSnackbar('Adding children', { variant: 'info' });

      const response = await axiosDelete(
        `child/${childId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      setIsDeleteModalOpen(false);
      const newChildrenList = [
        ...childrenList.filter((child) => child.id !== childId),
      ];
      setChildrenList(newChildrenList);
      const newSelectedChildId =
        selectedChildId === childId ? '' : selectedChildId;
      setSelectedChildId(newSelectedChildId);
      setFormData({ ...defaultFormData });

      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsFormLoading(false);
    }
  };

  const getListOfChildren = async () => {
    const { user } = state;

    try {
      const response = await axiosGet('child/', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      const responseData = response.data.data;

      setListOfChildren(responseData);
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      setIsLoading(true);

      getListOfChildren();

      isFirstRender.current = false;
    } else {
      getListOfChildren();
    }
  }, [isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

  return (
    <ChildrenViews
      formData={formData}
      isLoading={isLoading}
      isAddModalOpen={isAddModalOpen}
      isEditModalOpen={isEditModalOpen}
      isDeleteModalOpen={isDeleteModalOpen}
      isFormLoading={isFormLoading}
      listOfChildren={listOfChildren}
      openAddModalHandler={openAddModalHandler}
      closeAddModalHandler={closeAddModalHandler}
      openEditModalHandler={opedEditModalHandler}
      closeEditModalHandler={closeEditModalHandler}
      openDeleteModalHandler={openDeleteModalHandler}
      closeDeleteModalHandler={closeDeleteModalHandler}
      formAddOnSubmitHandler={formAddOnSubmitHandler}
      formEditOnSubmitHandler={formEditOnSubmitHandler}
      formDeleteOnSubmitHandler={formDeleteOnSubmitHandler}
      inputAddOnChangeHandler={inputAddOnChangeHandler}
      inputEditOnChangeHandler={inputEditOnChangeHandler}
      inputDeleteOnChangeHandler={inputDeleteOnChangeHandler}
    />
  );
};

export default ChildrenModule;
