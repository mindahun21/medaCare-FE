import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMessage } from '../../../contexts/MessageContext';
import { Physician } from '../types';
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useMemo, useState } from 'react';
import { Payload, pysicianActionService } from '../services/dashboardService';
import { AxiosError } from 'axios';
import { ColumnDef } from '@tanstack/react-table';
import Table from './Table';
import RejectionReason from './RejectionReason';

export interface TableHandlerProps {
  data: Physician[];
}

export default function PhysicianTable({ data }: TableHandlerProps) {
  const { showMessage } = useMessage();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [rejectData, setRejectData] = useState<Physician | null>(null);
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);

  const actionMutation = useMutation({
    mutationFn: pysicianActionService,
    onSuccess: (data, variables) => {
      showMessage({
        type: 'success',
        text:
          data?.message ??
          (variables.status === 'DELETE'
            ? 'Physician deleted successfully.'
            : 'Action completed successfully.'),
      });
      if (variables.status === 'DELETE') {
        queryClient.setQueryData<Physician[]>(['adminPhysicians'], (oldData) =>
          oldData?.filter((physician) => physician.id !== variables.id)
        );
      } else {
        queryClient.setQueryData<Physician[]>(['adminPhysicians'], (oldData) =>
          oldData?.map((physician) =>
            physician.id === variables.id
              ? {
                  ...physician,
                  accountRequestStatus:
                    variables.status as Physician['accountRequestStatus'],
                }
              : physician
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

  const columns: ColumnDef<Physician>[] = useMemo(
    () => [
      {
        header: 'Name',
        accessorFn: (row: Physician) => `${row.firstName} ${row.lastName}`,
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
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        header: 'Age',
        accessorKey: 'age',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        header: 'Status',
        accessorKey: 'accountRequestStatus',
        cell: ({ row }: { row: { original: Physician } }) => {
          const status = row.original.accountRequestStatus;
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

  const handleActionClick = (type: string, data: Physician) => {
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

  const getActions = (row: Physician, closeDropdown: () => void) => (
    <>
      {row.accountRequestStatus === 'PENDING' && (
        <>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              handleActionClick('Reject', row);
              closeDropdown();
            }}
          >
            Reject
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              handleActionClick('Accept', row);
              closeDropdown();
            }}
          >
            Accept
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
          navigate(`/home/physicians/detail/${row.id}`);
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
        onRowClicked={(id) => navigate(`/home/physicians/detail/${id}`)}
      />
      <RejectionReason
        isOpen={isRejectionOpen}
        onClose={() => setIsRejectionOpen(false)}
        onReject={handleReject}
      />
    </>
  );
}
