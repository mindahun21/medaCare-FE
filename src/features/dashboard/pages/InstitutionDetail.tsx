import { Link, useParams } from 'react-router-dom';
import { useInstitutions } from '../hooks/dashboardHooks';
import PageLoader from '../../../ui/shared/PageLoader';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';
import {
  institutionActionService,
  Payload,
} from '../services/dashboardService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMessage } from '../../../contexts/MessageContext';
import { Institution, UploadedFiles } from '../types';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import RejectionReason from '../ui/RejectionReason';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ColumnDef } from '@tanstack/react-table';
import Table from '../ui/Table';

export default function InstitutionDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: institutions, isLoading, isError } = useInstitutions();
  const institution = institutions?.find((inst) => inst.id === Number(id));
  const [institutionDocuments, setInstitutionDocuments] = useState<
    UploadedFiles[] | null
  >(null);
  const [downloadedIds, setDownloadedIds] = useState<Set<string | number>>(
    new Set()
  );

  const { showMessage } = useMessage();
  const queryClient = useQueryClient();

  const [isRejectionOpen, setIsRejectionOpen] = useState(false);

  const actionMutation = useMutation({
    mutationFn: institutionActionService,
    onSuccess: (data, variables) => {
      showMessage({
        type: 'success',
        text: data?.message,
      });

      queryClient.setQueryData<Institution[]>(['institutions'], (oldData) =>
        oldData?.map((institution) =>
          institution.id === variables.id
            ? {
                ...institution,
                requestStatus: variables.status as Institution['requestStatus'],
              }
            : institution
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

  useEffect(() => {
    if (institution) {
      const documents: UploadedFiles[] = Object.entries(institution)
        .filter(
          ([key, value]) => key.endsWith('Url') && typeof value === 'string'
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
      setInstitutionDocuments(documents);
    }
  }, [institution]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <div>Error loading institution details.</div>;
  }

  if (!institution) {
    return <div>Institution not found.</div>;
  }

  const handleReject = (payload: Payload) => {
    actionMutation.mutate({
      status: 'REJECTED',
      id: institution.id,
      payload: payload,
    });
  };

  return (
    <div className="p-[34px] flex flex-col min-h-[calc(100vh-65px)] ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-semibold text-[32px] leading-[100%] gradient-primary ">
            Institution Details
          </h1>
          <div className="flex gap-2 font-medium text-[12px] text-primary-teal pt-[10px] ">
            <Link to={'/home/dashboard'} className="hover:underline">
              Home
            </Link>
            <span>&gt;</span>
            <Link to={'/home/institutions'} className="hover:underline">
              Institutions
            </Link>
            <span>&gt;</span>
            <span className="text-[#1D586E99]">Institution Details</span>
          </div>
        </div>
        {institution.requestStatus == 'PENDING' ? (
          <div className="flex gap-5 items-center">
            <button
              onClick={() =>
                actionMutation.mutate({
                  status: 'APPROVED',
                  id: institution.id,
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
              institution.requestStatus == 'APPROVED'
                ? '  text-[#227F00]'
                : ' text-[#B80000]'
            } text-[20px] leading-[27px] `}
          >
            {institution.requestStatus == 'APPROVED' ? (
              <CheckIcon />
            ) : (
              <CloseIcon />
            )}
            {institution.requestStatus}
          </div>
        )}
      </div>
      <div className="my-[46px] bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
        <div className="p-[21px] flex justify-between items-end rounded-[18px] bg-[#DEF1FF]  ">
          <div className="flex flex-col">
            <div className="w-[233px] h-[158px] rounded-[8px] overflow-hidden">
              <img
                src="/images/hospital_image.png"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-primary-teal font-inter font-semibold text-[28px] leading-[150%] mt-[11px]">
              {institution.name}
            </h1>
            <div className="flex gap-5 text-[#727272] text-[18px]">
              {institution.type && (
                <span>
                  {institution.type
                    .split('_')
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(' ')}
                  ,{' '}
                </span>
              )}
              <span>
                {institution.country.charAt(0).toUpperCase() +
                  institution.country.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[32px] pe-20 pb-5">
            <div className="flex justify-start gap-4 text-[#2CA6FF] ">
              <LocalPhoneOutlinedIcon />
              <p className="text-[#727272] text-[18px] leading-[150%] ">
                (+251)-912-34-56-78
              </p>
            </div>
            <div className="flex justify-start gap-4 text-[#2CA6FF] ">
              <EmailOutlinedIcon />
              <p className="text-[#727272] text-[18px] leading-[150%] ">
                {institution.email}
              </p>
            </div>
            <div className="flex justify-start gap-4 text-[#2CA6FF] ">
              <LocationOnOutlinedIcon />
              <p className="text-[#727272] text-[18px] leading-[150%] ">
                {institution.regionOrState
                  .split(' ')
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(' ')}
                , {institution.country}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[45px]  ">
        <Table data={institutionDocuments ?? []} columns={columns} />
      </div>
      <RejectionReason
        isOpen={isRejectionOpen}
        onClose={() => setIsRejectionOpen(false)}
        onReject={handleReject}
      />
    </div>
  );
}
