import React, { useMemo } from 'react';
import { Patient } from '../types';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import Table from './Table';

export interface TableHandlerProps {
  data: Patient[];
}

export default function PatientsTable({ data }: TableHandlerProps) {
  const navigate = useNavigate();
  const columns: ColumnDef<Patient>[] = useMemo(
    () => [
      {
        header: 'Phone Number',
        accessorFn: (row: Patient) => row.contactNumber,
        id: 'name',
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
        header: 'Gender',
        accessorKey: 'gender',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        header: 'Blood Type',
        accessorKey: 'bloodType',
        enableSorting: true,
        enableColumnFilter: true,
      },
    ],
    []
  );
  return (
    <>
      <Table
        data={data ?? []}
        columns={columns}
        onRowClicked={(id) => navigate(`/home/patients/detail/${id}`)}
      />
    </>
  );
}
