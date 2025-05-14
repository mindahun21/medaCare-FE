import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAdminPhysicians } from '../hooks/dashboardHooks';
import PageLoader from '../../../ui/shared/PageLoader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Payload, pysicianActionService } from '../services/dashboardService';
import { useMessage } from '../../../contexts/MessageContext';
import { Physician, UploadedFiles } from '../types';
import { AxiosError } from 'axios';
import RejectionReason from '../ui/RejectionReason';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Table from '../ui/Table';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';
import { ColumnDef } from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../authentication/AuthSelectors';

export default function PhysicianDetail() {
  const { id } = useParams<{ id: string }>();
  const role = useSelector(selectUserRole);
  const { data: physicians, isLoading, isError } = useAdminPhysicians();
  const physician = physicians?.find((p) => p.id === Number(id));
  const [physicianDocuments, setPhysicianDocuments] = useState<
    UploadedFiles[] | null
  >(null);
  const [downloadedIds, setDownloadedIds] = useState<Set<string | number>>(
    new Set()
  );
  const { showMessage } = useMessage();
  const queryClient = useQueryClient();
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);

  useEffect(() => {
    if (physician) {
      const documents: UploadedFiles[] = Object.entries(physician)
        .filter(
          ([key, value]) =>
            key.endsWith('Url') &&
            typeof value === 'string' &&
            key !== 'profilePhotoUrl'
        )
        .map(([key, value]) => ({
          id: key,
          type: key
            .replace(/Url$/, '')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .toLowerCase()
            .replace(/^\w/, (c) => c.toUpperCase()),
          key: key,
          fileName: value.split('/').pop() || 'unknown',
          url: value,
        }));
      setPhysicianDocuments(documents);
    }
  }, [physician]);

  const columns: ColumnDef<UploadedFiles>[] = useMemo(
    () => [
      {
        header: 'Document Type',
        accessorKey: 'type',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        header: 'Document File',
        accessorKey: 'fileName',
        enableSorting: true,
        enableColumnFilter: true,
      },
      {
        header: 'Download',
        accessorKey: '',
        id: 'download',
        cell: ({ row }) => {
          const file = row.original;
          const isDownloaded = downloadedIds.has(file.id);

          const handleDownload = () => {
            if (isDownloaded) return;
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.fileName;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setDownloadedIds((prev) => new Set(prev).add(file.id));
          };

          return (
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-[#2CA6FF] flex items-center gap-2"
            >
              {isDownloaded ? (
                <FileDownloadDoneOutlinedIcon />
              ) : (
                <DownloadOutlinedIcon />
              )}
            </button>
          );
        },
      },
    ],
    [downloadedIds]
  );

  const actionMutation = useMutation({
    mutationFn: pysicianActionService,
    onSuccess: (data, variables) => {
      showMessage({
        type: 'success',
        text: data?.message,
      });

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

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div>Error loading physician details.</div>;
  }
  if (!physician) {
    return <div>Physician not found.</div>;
  }

  const handleReject = (payload: Payload) => {
    actionMutation.mutate({
      status: 'REJECTED',
      id: physician.id,
      payload: payload,
    });
  };

  return (
    <div className="p-[34px] flex flex-col min-h-[calc(100vh-65px)] ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-semibold text-[32px] leading-[100%] gradient-primary ">
            Physician Details
          </h1>
          <div className="flex gap-2 font-medium text-[12px] text-primary-teal pt-[10px] ">
            <Link to={'/home/dashboard'} className="hover:underline">
              Home
            </Link>
            <span>&gt;</span>
            <Link to={'/home/physicians'} className="hover:underline">
              Physicians
            </Link>
            <span>&gt;</span>
            <span className="text-[#1D586E99]">Physician Details</span>
          </div>
        </div>
        {physician.accountRequestStatus == 'PENDING' && role == 'ADMIN' ? (
          <div className="flex gap-5 items-center">
            <button
              onClick={() =>
                actionMutation.mutate({
                  status: 'APPROVED',
                  id: physician.id,
                })
              }
              disabled={actionMutation.isPending}
              className="px-[22px] py-[9px] rounded-[5px] border border-[#227F00] bg-[#0CEC004D] text-[15px] leading-[27px] text-[#227F00]  "
            >
              {actionMutation.isPending &&
              actionMutation.variables.status == 'APPROVED'
                ? 'Approving ...'
                : 'APPROVE'}
            </button>
            <button
              onClick={() => setIsRejectionOpen(true)}
              disabled={actionMutation.isPending}
              className="px-[22px] py-[9px] rounded-[5px] border border-[#B80000] bg-[#FF00004D] text-[15px] leading-[27px] text-[#B80000]"
            >
              {actionMutation.isPending &&
              actionMutation.variables.status == 'REJECTED'
                ? 'Rejecting ...'
                : 'REJECT'}
            </button>
          </div>
        ) : (
          <div
            className={`px-[22px] py-[9px] rounded-[5px] flex gap-2 items-center ${
              physician.accountRequestStatus == 'APPROVED'
                ? '  text-[#227F00]'
                : ' text-[#B80000]'
            } text-[20px] leading-[27px] `}
          >
            {physician.accountRequestStatus == 'APPROVED' ? (
              <CheckIcon />
            ) : (
              <CloseIcon />
            )}
            {physician.accountRequestStatus}
          </div>
        )}
      </div>
      <div className="my-[46px] bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
        <div className="p-[21px] flex justify-between items-end rounded-[18px] bg-[#DEF1FF]  ">
          <div className="flex flex-col">
            <div className="w-[233px] h-[158px] rounded-[8px] overflow-hidden">
              <img
                src={physician.profilePhotoUrl}
                alt="Profile"
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    '/images/doctor-hero.png';
                }}
              />
            </div>
            <h1 className="text-primary-teal font-inter font-semibold text-[28px] leading-[150%] mt-[11px]">
              {physician.firstName + ' ' + physician.lastName}
            </h1>
            <div className="flex gap-5 text-[#727272] text-[18px]">
              {physician.dateOfBirth && (
                <span>
                  {new Date().getFullYear() -
                    new Date(physician.dateOfBirth).getFullYear()}{' '}
                  years old
                </span>
              )}
              <span>
                {physician.gender.charAt(0).toUpperCase() +
                  physician.gender.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[32px] pe-20 pb-5">
            <div className="flex justify-start gap-4 text-[#2CA6FF] ">
              <LocalPhoneOutlinedIcon />
              <p className="text-[#727272] text-[18px] leading-[150%] ">
                {physician.phoneNumber}
              </p>
            </div>
            <div className="flex justify-start gap-4 text-[#2CA6FF] ">
              <EmailOutlinedIcon />
              <p className="text-[#727272] text-[18px] leading-[150%] ">
                {physician.email}
              </p>
            </div>
            <div className="flex justify-start gap-4 text-[#2CA6FF] ">
              <LocationOnOutlinedIcon />
              <p className="text-[#727272] text-[18px] leading-[150%] ">
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[45px]  ">
        <Table data={physicianDocuments ?? []} columns={columns} />
      </div>
      <RejectionReason
        isOpen={isRejectionOpen}
        onClose={() => setIsRejectionOpen(false)}
        onReject={handleReject}
      />
    </div>
  );
}
