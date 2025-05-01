import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { useDashboardContext } from '../context/DashBoardContext';

export interface TableProps<T extends { id: string | number }> {
  data: T[];
  columns: ColumnDef<T>[];
  getActions?: (row: T) => React.ReactNode;
  onRowClicked: (id: string | number) => void;
}

export default function Table<T extends { id: string | number }>({
  data,
  columns,
  getActions,
  onRowClicked,
}: TableProps<T>) {
  const { globalFilter } = useDashboardContext();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="min-w-full table-auto border">
      <thead className="bg-primary-teal-100 text-left h-[52px] text-[#667085] font-medium text-[14px]">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="p-2 cursor-pointer select-none"
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="flex items-center gap-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <span>
                    {header.column.getIsSorted() === 'asc' &&
                      header.id !== 'actions' && (
                        <ArrowUpwardOutlinedIcon sx={{ fontSize: 16 }} />
                      )}
                    {header.column.getIsSorted() === 'desc' &&
                      header.id !== 'actions' && (
                        <ArrowDownwardOutlinedIcon sx={{ fontSize: 16 }} />
                      )}
                    {header.column.getIsSorted() === false &&
                      header.id !== 'actions' && (
                        <ArrowDownwardOutlinedIcon sx={{ fontSize: 16 }} />
                      )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-primary-teal-surface h-[52px] text-[16px] cursor-pointer"
            onClick={() => onRowClicked(row.original.id)}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`p-2 border-b-[1px] border-[#EAECF0] ${
                  cell.column.id === 'name' ? 'font-medium' : 'text-[#667085]'
                }`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                {cell.column.id === 'actions' && (
                  <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="p-2 hover:bg-gray-200 rounded-full z-40"
                      onClick={() =>
                        setOpenRowId((prev) =>
                          prev === row.id ? null : row.id
                        )
                      }
                    >
                      <MoreVertOutlinedIcon />
                    </button>
                    {openRowId === row.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border-[1px] border-[#2CA6FF] rounded shadow-lg z-10">
                        {getActions && getActions(row.original)}
                      </div>
                    )}
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
