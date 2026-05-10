import React, { useCallback, useMemo } from 'react';
import { useTablePaging } from './hooks';
import { sPagingWrapper } from './styles';

type TablePagingProps =
  | {
      addCustomTablePaging: true;
      tablePaging: ReturnType<typeof useTablePaging>;
      page?: never;
      limit?: never;
      totalPage?: never;
      maxPageNumber?: never;
      handlePreviousPage?: never;
      handleNextPage?: never;
      handleJumpToPage?: never;
    }
  | {
      addCustomTablePaging?: false;
      tablePaging?: never;
      page: number;
      limit: number;
      totalPage: number;
      maxPageNumber: number;
      handlePreviousPage: () => void;
      handleNextPage: () => void;
      handleJumpToPage: (pageNumber: number) => void;
    };

const PagingWithTablePaging = ({
  tablePaging,
}: {
  tablePaging: ReturnType<typeof useTablePaging>;
}) => {
  const {
    currentPage,
    handlePreviousPage,
    handleNextPage,
    handleJumpToPage,
    getPageNumbers,
  } = tablePaging;

  return (
    <>
      <div className={sPagingWrapper}>
        <button disabled={currentPage == 1} onClick={handlePreviousPage}>
          {'<'}
        </button>
        <div>
          {getPageNumbers().map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => handleJumpToPage(pageNumber)}
              className={pageNumber === currentPage ? 'active' : ''}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          disabled={
            currentPage == getPageNumbers()[getPageNumbers().length - 1]
          }
          onClick={handleNextPage}
        >
          {'>'}
        </button>
      </div>
    </>
  );
};

const PagingWithoutTablePaging = ({
  page,
  totalPage,
  maxPageNumber,
  handlePreviousPage,
  handleNextPage,
  handleJumpToPage,
}: {
  page: number;
  limit: number;
  totalPage: number;
  maxPageNumber?: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleJumpToPage: (pageNumber: number) => void;
}) => {
  const getPageNumber = () => {
    const pageNumbers = [];
    const totalPages = totalPage;
    const currentPage = page;

    if (totalPages <= maxPageNumber) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxPageNumber - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - (maxPageNumber - 2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className={sPagingWrapper}>
      <button disabled={page == 1} onClick={handlePreviousPage}>
        {'<'}
      </button>
      <div>
        {getPageNumber().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => handleJumpToPage(pageNumber)}
            className={pageNumber === page ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        disabled={page == getPageNumber()[getPageNumber().length - 1]}
        onClick={handleNextPage}
      >
        {'>'}
      </button>
    </div>
  );
};

const Paging = ({
  addCustomTablePaging = true,
  tablePaging,
  page,
  limit,
  totalPage,
  maxPageNumber,
  handlePreviousPage,
  handleNextPage,
  handleJumpToPage,
}: TablePagingProps) => {
  return (
    <>
      {addCustomTablePaging && (
        <PagingWithTablePaging tablePaging={tablePaging} />
      )}
      {!addCustomTablePaging && (
        <PagingWithoutTablePaging
          page={page}
          limit={limit}
          totalPage={totalPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handleJumpToPage={handleJumpToPage}
          maxPageNumber={maxPageNumber}
        />
      )}
    </>
  );
};

export default Paging;
