import { useCallback, useState } from 'react';

type TablePagingProps = {
  data: any[];
  itemsPerPage: number;
  maxPageNumber: number;
};

const useTablePaging = ({
  data,
  itemsPerPage,
  maxPageNumber,
}: TablePagingProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleJumpToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= getTotalPage()) {
      setCurrentPage(pageNumber);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < getTotalPage()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getTotalPage = useCallback(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data]);

  const getLogDataForCurrentPage = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataForCurrentPage = data.slice(startIndex, endIndex);
    return dataForCurrentPage;
  }, [currentPage, itemsPerPage, data]);

  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const totalPages = getTotalPage();

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
  }, [maxPageNumber, data, currentPage]);

  return {
    handleJumpToPage,
    handlePreviousPage,
    handleNextPage,
    getTotalPage,
    currentPage,
    setCurrentPage,
    getLogDataForCurrentPage,
    getPageNumbers,
    maxPageNumber,
    itemsPerPage,
  };
};

export { useTablePaging };
