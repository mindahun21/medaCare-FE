import React, { useMemo } from 'react';
import { Appointment } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import Table from './Table';
import { useNavigate } from 'react-router-dom';

export interface TableHandlerProps {
  data: Appointment[];
}

export default function AppointmentsTable({ data }: TableHandlerProps) {
  const navigate = useNavigate();
  const columns: ColumnDef<Appointment>[] = useMemo(
    () => [
      {
        header: 'Date',
        accessorKey: 'appointmentDate',
        enableSorting: true,
        enableColumnFilter: true,
        cell: ({ getValue }) => {
          const dateStr = getValue() as string;
          const date = new Date(dateStr);
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        },
      },
      {
        header: 'Start Time',
        accessorKey: 'appointmentStartTime',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        header: 'End Time',
        accessorKey: 'appointmentEndTime',
      },
      {
        header: 'Duration',
        accessorFn: (row) => ({
          startTime: row.appointmentStartTime,
          endTime: row.appointmentEndTime,
        }),
        cell: ({ getValue }) => {
          const { startTime, endTime } = getValue() as {
            startTime: string;
            endTime: string;
          };
          const [sh, sm] = startTime.split(':').map(Number);
          const [eh, em] = endTime.split(':').map(Number);
          const start = sh * 60 + sm;
          const end = eh * 60 + em;
          const duration = end - start;
          const hours = Math.floor(duration / 60);
          const minutes = duration % 60;
          return (
            <span className="bg-[#2CA6FF] px-4 py-2 rounded-full text-white">
              {hours > 0 && `${hours}h `}
              {minutes}m
            </span>
          );
        },
      },
      {
        header: 'Meeting Link',
        accessorKey: 'meetingLink',
        cell: ({ getValue }) => {
          const url = getValue() as string;
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary-teal text-[20px] "
            >
              Link
            </a>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Table
        data={data ?? []}
        columns={columns}
        onRowClicked={(id) => navigate(`/home/appointments/detail/${id}`)}
      />
    </>
  );
}
