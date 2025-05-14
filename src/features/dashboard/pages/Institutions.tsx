import React, { useMemo, useState } from 'react';
import { useInstitutions } from '../hooks/dashboardHooks';
import PageLoader from '../../../ui/shared/PageLoader';
import FilterListIcon from '@mui/icons-material/FilterList';
import InstitutionTable from '../ui/InstitutionTable';

export default function Institutions() {
  const { data: institutions, isLoading, isError } = useInstitutions();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const numberOfPages = institutions
    ? Math.ceil(institutions.length / itemsPerPage)
    : 0;

  const sortedInstitutions = useMemo(() => {
    if (!institutions) return [];

    const priority = {
      PENDING: 0,
      REJECTED: 1,
      APPROVED: 2,
    };

    return [...institutions].sort((a, b) => {
      const aPriority = priority[a.requestStatus] ?? 99;
      const bPriority = priority[b.requestStatus] ?? 99;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [institutions]);

  const currentPageData = useMemo(() => {
    if (!sortedInstitutions) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedInstitutions.slice(startIndex, endIndex);
  }, [currentPage, sortedInstitutions]);

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    const visiblePages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(1, '...', currentPage, '...', totalPages);
      }
    }

    return visiblePages;
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="p-[34px] font-inter flex flex-col min-h-[calc(100vh-65px)] justify-between">
      <div className="flex flex-col border-[1px] border-[#EAECF0] w-full flex-1">
        <div className="w-full flex px-[20px] h-[80px] justify-between items-center ">
          <div className="flex flex-col">
            <p className="font-inter font-medium text-[15px] leading-[23px] ">
              Registered Institutions
            </p>
            <p className="font-normal font-inter text-[11px] leading-[16px] text-[#667085] ">
              Institutions registered in medacare platform
            </p>
          </div>
          <div className="flex text-[#344054] text-[12px]  ">
            <button className="flex items-center gap-1 cursor-pointer p-[8px] hover:bg-primary-teal-surface rounded-[6px]">
              <FilterListIcon sx={{ height: 17, width: 17 }} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <InstitutionTable data={currentPageData ?? []} />
        {(institutions?.length === 0 || isError) && (
          <p className="text-center text-xl mt-4 text-gray-500">
            No institutions found.
          </p>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-end mt-4 items-center">
        <p className="pe-[63px] text-[12px] leading-[100%]">
          Showing Page <span>{currentPage}</span> /{' '}
          <span>{numberOfPages || 1}</span>
        </p>

        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="rounded-full flex items-center justify-center text-[13px] bg-primary-blues-200 py-2 px-4 me-[25px]"
          >
            Previous
          </button>
        )}

        {getVisiblePages(currentPage, numberOfPages).map((page, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 ${
              page !== '...' && index !== 0 && 'ms-[17px]'
            } rounded-full ${
              currentPage === page
                ? 'bg-primary-teal text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <div className="w-[69px]">
          {currentPage < numberOfPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="rounded-full flex items-center justify-center text-[13px] bg-primary-blues-200 py-2 px-4 ms-[25px]"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
