import React from 'react';

import { LoadingIcon, PlusIcon } from '@/assets';
import { Modal, Input, Button, Table } from '@/components';
import { useTablePaging } from '@/components/table/paging/hooks';

import { ChildrenViewsProps } from './types';
import {
  sChildren,
  sChildrenHeading,
  sChildrenLoading,
  sChildrenTableLeft,
  sChildrenModalButton,
  sChildrenAddButton,
  sChildrenDeleteButton,
  sChildrenTableButton,
  sChildrenAddIcon,
  sChildrenContent,
  sContentWrapper,
} from './styles';

const ChildrenViews = ({
  formData,
  isLoading,
  isAddModalOpen,
  isEditModalOpen,
  isDeleteModalOpen,
  isFormLoading,
  listOfChildren,
  openAddModalHandler,
  closeAddModalHandler,
  openEditModalHandler,
  closeEditModalHandler,
  openDeleteModalHandler,
  closeDeleteModalHandler,
  formAddOnSubmitHandler,
  formEditOnSubmitHandler,
  formDeleteOnSubmitHandler,
  inputAddOnChangeHandler,
  inputEditOnChangeHandler,
  inputDeleteOnChangeHandler,
}: ChildrenViewsProps) => {
  const tablePaging = useTablePaging({
    data: listOfChildren,
    itemsPerPage: 10,
    maxPageNumber: 5,
  });
  return (
    <>
      <Modal
        size="small"
        title="Add New Child"
        isOpen={isAddModalOpen}
        onClose={closeAddModalHandler}
      >
        <form onSubmit={formAddOnSubmitHandler}>
          <Input
            name="name"
            type="text"
            label="Name"
            value={formData.name}
            disabled={isFormLoading}
            onChange={inputAddOnChangeHandler}
          />
          <div className={sChildrenModalButton}>
            <Button variant="tertiary" onClick={closeAddModalHandler} fullWidth>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              Add
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        size="small"
        title="Edit Child"
        isOpen={isEditModalOpen}
        onClose={closeEditModalHandler}
      >
        <form onSubmit={formEditOnSubmitHandler}>
          <Input
            name="name"
            type="text"
            label="Name"
            value={formData.name}
            disabled={isFormLoading}
            onChange={inputEditOnChangeHandler}
          />
          <div className={sChildrenModalButton}>
            <Button
              variant="tertiary"
              onClick={closeEditModalHandler}
              fullWidth
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              Edit
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        size="small"
        title="Are you sure want to delete this child"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModalHandler}
        isDeleteType={true}
        name={formData.name ? formData.name : ''}
      >
        <form onSubmit={formDeleteOnSubmitHandler}>
          <div className={sChildrenModalButton}>
            <Button
              variant="tertiary"
              onClick={closeDeleteModalHandler}
              className={sChildrenDeleteButton}
            >
              Cancel
            </Button>
            <Button type="submit" className={sChildrenDeleteButton}>
              Yes
            </Button>
          </div>
        </form>
      </Modal>
      <div className={sChildren}>
        <div className={sChildrenHeading}>
          <div className={sChildrenAddButton}>
            <Button onClick={openAddModalHandler}>
              <span className={sChildrenAddIcon}>
                <PlusIcon />
              </span>
              Add New Child
            </Button>
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className={sChildrenLoading}>
              <LoadingIcon size="s" />
            </div>
          ) : (
            <div className={sContentWrapper}>
              <div className={sChildrenContent}>
                <Table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th style={{width: '100%'}}>Child Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listOfChildren.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className={sChildrenTableLeft}>{item.name}</td>
                          <td className={sChildrenTableButton}>
                            <Button
                              type="submit"
                              onClick={() =>
                                openEditModalHandler(item.id, item.name)
                              }
                            >
                              {' '}
                              Edit{' '}
                            </Button>
                            <Button
                              type="submit"
                              variant="danger"
                              onClick={() =>
                                openDeleteModalHandler(item.id, item.name)
                              }
                            >
                              {' '}
                              Delete{' '}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              {/* <div className={sPagingSection}>
                <Paging tablePaging={tablePaging} />
              </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChildrenViews;
