import React, { useMemo } from 'react';
import { useInstitutions } from '../hooks/dashboardHooks';
import Table from '../ui/Table';
import { Institution } from '../types';
import PageLoader from '../../../ui/shared/PageLoader';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ColumnDef } from '@tanstack/react-table';
import { useMutation } from '@tanstack/react-query';
import { requestAcceptInstitution } from '../services/dashboardService';
import { useMessage } from '../../../contexts/MessageContext';

export default function Institutions() {
  const { data: institutions, isLoading } = useInstitutions();
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const acceptMutation = useMutation({
    mutationFn: requestAcceptInstitution,
    onSuccess: (data, variables) => {
      const action = variables.status === 'APPROVED' ? 'accepted' : 'rejected';
      showMessage({
        type: 'success',
        text: `Institution successfully ${action}.`,
      });
    },
    onError: (error, variables) => {
      const action = variables.status === 'APPROVED' ? 'accept' : 'reject';
      showMessage({
        type: 'error',
        text: `Failed to ${action} institution.`,
      });
    },
  });

  const columns: ColumnDef<Institution>[] = useMemo(
    () => [
      {
        header: 'Name',
        accessorFn: (row: Institution) => row.name,
        id: 'name',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        header: 'Email',
        accessorKey: 'email',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        header: 'Country',
        accessorKey: 'country',
      },
      {
        header: 'Rating',
        accessorKey: 'rating',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        header: 'Status',
        accessorKey: 'requestStatus',
        cell: ({ row }: { row: { original: Institution } }) => {
          const status = row.original.requestStatus;
          const statusStyles =
            status === 'PENDING'
              ? 'text-[#DF0004] bg-[#FEB6B6]'
              : status === 'APPROVED'
              ? 'text-[#037847] bg-[#ECFDF3]'
              : 'bg-[#F2F4F7]';

          return (
            <div className="flex items-start">
              <div
                className={`rounded-[19px] ps-1 py-1 pe-3 flex gap-[4px] items-center ${statusStyles}`}
              >
                <FiberManualRecordIcon sx={{ width: 10, height: 10 }} />
                {status.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
              </div>
            </div>
          );
        },
      },
      {
        header: '',
        accessorKey: '',
        id: 'actions',
      },
    ],
    []
  );

  const handleActionClick = (type: string, data: Institution) => {
    if (type === 'Accept') {
      acceptMutation.mutate({ status: 'APPROVED', id: data.id });
    } else if (type === 'Reject') {
      acceptMutation.mutate({ status: 'REJECTED', id: data.id });
    }
  };

  const getActions = (row: Institution) => (
    <>
      {row.requestStatus === 'PENDING' && (
        <>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleActionClick('Accept', row)}
          >
            Accept
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => handleActionClick('Reject', row)}
          >
            Reject
          </button>
        </>
      )}
      <button
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        onClick={() => navigate(`/institutions/detail/${row.id}`)}
      >
        View Details
      </button>
    </>
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="p-[34px] font-inter">
      <div className="flex flex-col border-[1px] border-[#EAECF0] w-full min-h-full">
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
              <DeleteOutlineIcon sx={{ height: 17, width: 17 }} />
              <span>Delete</span>
            </button>
            <button className="flex items-center gap-1 cursor-pointer p-[8px] hover:bg-primary-teal-surface rounded-[6px]">
              <FilterListIcon sx={{ height: 17, width: 17 }} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-1 cursor-pointer p-[8px] ms-[10px] border-[1px] border-[#EAECF0] hover:bg-primary-teal-surface rounded-[6px] ">
              <CloudDownloadOutlinedIcon sx={{ height: 17, width: 17 }} />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-1 cursor-pointer p-[8px] text-white bg-secondary-burgandy rounded-[6px] ms-[10px] ">
              <AddOutlinedIcon /> <span>Add new Institution</span>
            </button>
          </div>
        </div>
        <Table
          data={institutions ?? []}
          columns={columns}
          getActions={getActions}
          onRowClicked={(id) => navigate(`/institutions/detail/${id}`)}
        />
        {institutions?.length === 0 && (
          <p className="text-center text-sm mt-4 text-gray-500">
            No institutions found.
          </p>
        )}
      </div>
    </div>
  );
}
