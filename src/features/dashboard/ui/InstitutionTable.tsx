import Table from './Table';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  institutionActionService,
  Payload,
} from '../services/dashboardService';
import { useMessage } from '../../../contexts/MessageContext';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import RejectionReason from './RejectionReason';
import { Institution } from '../types';

export interface TableHandlerProps {
  data: Institution[];
}

export default function InstitutionTable({ data }: TableHandlerProps) {
  const { showMessage } = useMessage();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [rejectData, setRejectData] = useState<Institution | null>(null);
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);

  const actionMutation = useMutation({
    mutationFn: institutionActionService,
    onSuccess: (data, variables) => {
      showMessage({
        type: 'success',
        text:
          data?.message ??
          (variables.status === 'DELETE'
            ? 'Institution deleted successfully.'
            : 'Action completed successfully.'),
      });
      if (variables.status === 'DELETE') {
        queryClient.setQueryData<Institution[]>(['institutions'], (oldData) =>
          oldData?.filter((institution) => institution.id !== variables.id)
        );
      } else {
        queryClient.setQueryData<Institution[]>(['institutions'], (oldData) =>
          oldData?.map((institution) =>
            institution.id === variables.id
              ? {
                  ...institution,
                  requestStatus:
                    variables.status as Institution['requestStatus'],
                }
              : institution
          )
        );
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred';

      showMessage({
        type: 'error',
        text: errorMessage,
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
        header: 'Institution Type',
        accessorKey: 'type',
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
            status === 'REJECTED'
              ? 'text-[#DF0004] bg-[#FEB6B6]'
              : status === 'APPROVED'
              ? 'text-[#037847] bg-[#ECFDF3]'
              : 'bg-[#F2F4F7]';

          return (
            <div className="flex items-start">
              {actionMutation.isPending &&
              actionMutation.variables?.id === row.original.id ? (
                <div className="rounded-[19px] ps-1 py-1 pe-3 flex gap-[4px] items-center bg-primary-teal text-white ">
                  <FiberManualRecordIcon sx={{ width: 10, height: 10 }} />

                  {'Processing...'}
                </div>
              ) : (
                <div
                  className={`rounded-[19px] ps-1 py-1 pe-3 flex gap-[4px] items-center ${statusStyles}`}
                >
                  <FiberManualRecordIcon sx={{ width: 10, height: 10 }} />
                  {status.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                </div>
              )}
            </div>
          );
        },
      },
      {
        header: 'actions',
        accessorKey: '',
        id: 'actions',
      },
    ],
    [actionMutation.isPending, actionMutation.variables]
  );

  const handleActionClick = (type: string, data: Institution) => {
    if (type === 'Accept') {
      actionMutation.mutate({ status: 'APPROVED', id: data.id });
    } else if (type === 'Reject') {
      setRejectData(data);
      setIsRejectionOpen(true);
    } else if (type === 'Delete') {
      actionMutation.mutate({ status: 'DELETE', id: data.id });
    }
  };

  const handleReject = (payload: Payload) => {
    if (rejectData) {
      actionMutation.mutate({
        status: 'REJECTED',
        id: rejectData.id,
        payload: payload,
      });
    }
  };

  const getActions = (row: Institution, closeDropdown: () => void) => (
    <>
      {row.requestStatus === 'PENDING' && (
        <>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              handleActionClick('Accept', row);
              closeDropdown();
            }}
          >
            Accept
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              handleActionClick('Reject', row);
              closeDropdown();
            }}
          >
            Reject
          </button>
        </>
      )}
      <button
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        onClick={() => {
          handleActionClick('Delete', row);
          closeDropdown();
        }}
      >
        Delete
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        onClick={() => {
          navigate(`/home/institutions/detail/${row.id}`);
          closeDropdown();
        }}
      >
        View Details
      </button>
    </>
  );

  return (
    <>
      <Table
        data={data ?? []}
        columns={columns}
        getActions={getActions}
        onRowClicked={(id) => navigate(`/home/institutions/detail/${id}`)}
      />
      <RejectionReason
        isOpen={isRejectionOpen}
        onClose={() => setIsRejectionOpen(false)}
        onReject={handleReject}
      />
    </>
  );
}
