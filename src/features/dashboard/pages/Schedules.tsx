import React, { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import {
  addAvailability,
  deleteWorkingHour,
  TimeSlot,
  timeSlotSchema,
} from '../services/dashboardService';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import { SharedTextFieldProps } from '../../../utils/variables';
import SubmitButton from '../../../ui/shared/SubmitButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMessage } from '../../../contexts/MessageContext';
import { AxiosError } from 'axios';
import { useWorkingHours } from '../hooks/dashboardHooks';
import PageLoader from '../../../ui/shared/PageLoader';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Schedules() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { showMessage } = useMessage();
  const { data: workingHours, isLoading } = useWorkingHours();
  const methods = useForm<TimeSlot>({
    resolver: zodResolver(timeSlotSchema),
    defaultValues: {
      date: '',
      startTime: '',
      endTime: '',
    },
    mode: 'onTouched',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationFn: addAvailability,
    onSuccess: async (data) => {
      showMessage({
        type: 'success',
        text: data?.message || 'Availability added successfuly.',
      });
      queryClient.invalidateQueries({ queryKey: ['workingHours'] });
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

  const deleteMutation = useMutation({
    mutationFn: deleteWorkingHour,
    onSuccess: async (data) => {
      showMessage({
        type: 'success',
        text: data?.message || 'Working Hour deleted successfuly.',
      });
      queryClient.invalidateQueries({ queryKey: ['workingHours'] });
      setDeletingId(null);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred';

      showMessage({
        type: 'error',
        text: errorMessage,
      });
      setDeletingId(null);
    },
  });

  const onSubmit = (data: TimeSlot) => {
    mutation.mutate({ data: data });
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    deleteMutation.mutate(id);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-[34px] font-inter flex min-h-[calc(100vh-65px)] gap-[30px] ">
      <div className="w-2/5 bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
        <div className=" h-full  p-[25px] flex flex-col  rounded-[18px] bg-[#ffffff] ">
          <h1 className=" text-primary-teal text-[24px] font-semibold mb-[30px] ">
            Add Availability
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[30px]"
          >
            <div>
              <p className="font-semibold text-[18px] text-primary-teal mb-[16px] ">
                Select Date
              </p>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    error={!!errors.date}
                    helperText={errors.date?.message}
                    {...SharedTextFieldProps}
                  />
                )}
              />
            </div>
            <div>
              <p className="font-semibold text-[18px] text-primary-teal mb-[16px] ">
                Select Time
              </p>
              <div className="flex  gap-[20px] ">
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="time"
                      label="Start Time"
                      error={!!errors.startTime}
                      helperText={errors.startTime?.message}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      {...SharedTextFieldProps}
                    />
                  )}
                />

                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="time"
                      label="End Time"
                      error={!!errors.endTime}
                      helperText={errors.endTime?.message}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      {...SharedTextFieldProps}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <SubmitButton
                text="Add Availability"
                isPending={mutation.isPending}
                icon={<AddOutlinedIcon />}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="w-3/5 bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
        <div className=" h-full  p-[21px] ps-[40px] flex flex-col rounded-[18px] bg-[#ffffff] text-primary-teal ">
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              <h1 className=" text-primary-teal text-[24px] font-semibold mb-[30px] ">
                My Schedule
              </h1>
              <div className=" flex flex-col gap-[30px] w-full">
                <div className="flex mb-[20px]">
                  <p className="text-[20px] font-semibold w-1/3 ">Date</p>
                  <p className="text-[20px] font-semibold w-1/3 ">Time Slot</p>
                  <p className="text-[20px] font-semibold w-1/3 ">Action</p>
                </div>
                {workingHours?.map((workingHour, index) => (
                  <div className="flex mb-[20px]" key={index}>
                    <p className="text-[20px] font-semibold w-1/3 ">
                      {formatDate(workingHour.date)}
                    </p>
                    <p className="text-[20px] font-semibold w-1/3">
                      <span className="px-4 py-2 bg-primary-blues-200 rounded-full">
                        {workingHour.startTime}-{workingHour.endTime}
                      </span>
                    </p>
                    <div className=" ">
                      <button
                        className="text-[#DB0000] min-w-[100px] h-full "
                        onClick={() => handleDelete(workingHour.id)}
                      >
                        {deletingId == workingHour.id ? (
                          <span>deleting ...</span>
                        ) : (
                          <DeleteIcon />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
