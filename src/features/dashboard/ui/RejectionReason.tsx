import { useState } from 'react';
import { Payload, payloadSchema } from '../services/dashboardService';

export default function RejectionReason({
  isOpen,
  onClose,
  onReject,
}: {
  isOpen: boolean;
  onClose: () => void;
  onReject: (payload: Payload) => void;
}) {
  const [formData, setFormData] = useState<Payload>({
    documentInvalid: false,
    licenseNotValid: false,
    identityUnverified: false,
    professionallyQualified: false,
    rejectionReasonNote: '',
  });

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange =
    (field: keyof Payload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]:
          e.target instanceof HTMLInputElement && e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.value,
      }));
    };

  const handleSubmit = () => {
    const parsed = payloadSchema.safeParse(formData);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      setError(issue.message);
      return;
    }
    setError(null);
    onReject(formData);
    setFormData({
      documentInvalid: false,
      licenseNotValid: false,
      identityUnverified: false,
      professionallyQualified: false,
      rejectionReasonNote: '',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 overflow-y-auto p-4 "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[528px] p-[30px] max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[20px] font-inter leading-[100%] font-semibold pb-[35px] text-center">
          Rejection Reason
        </h2>

        <div className="flex flex-col border-t-2 border-t-gray-100">
          <label className="flex gap-[15px] items-start p-[24px]">
            <input
              type="checkbox"
              checked={formData.documentInvalid}
              onChange={handleChange('documentInvalid')}
              className="mt-2"
            />
            <div className="flex flex-col">
              <p className="text-[20px] font-inter font-normal">
                Invalid document
              </p>
              <p className="text-[14px] pt-[8px] text-gray-600">
                The documents uploaded are of low quality or do not clearly show
                the property. Please upload high-quality images that showcase
                the property's features.
              </p>
            </div>
          </label>

          <label className="flex gap-[15px] items-start p-[24px] ">
            <input
              type="checkbox"
              checked={formData.licenseNotValid}
              onChange={handleChange('licenseNotValid')}
              className="mt-2"
            />
            <div className="flex flex-col">
              <p className="text-[20px] font-inter font-normal">
                License is not valid
              </p>
              <p className="text-[14px] pt-[8px] text-gray-600">
                The provided license is expired or not recognized. Please ensure
                the physician has a valid and active license.
              </p>
            </div>
          </label>

          <label className="flex gap-[15px] items-start p-[24px] ">
            <input
              type="checkbox"
              checked={formData.identityUnverified}
              onChange={handleChange('identityUnverified')}
              className="mt-2"
            />
            <div className="flex flex-col">
              <p className="text-[20px] font-inter font-normal">
                Identity not verified
              </p>
              <p className="text-[14px] pt-[8px] text-gray-600">
                The submitted identity documents could not be verified. Please
                upload government-issued ID clearly showing name and photo.
              </p>
            </div>
          </label>

          <label className="flex gap-[15px] items-start p-[24px] ">
            <input
              type="checkbox"
              checked={formData.professionallyQualified}
              onChange={handleChange('professionallyQualified')}
              className="mt-2"
            />
            <div className="flex flex-col">
              <p className="text-[20px] font-inter font-normal">
                Not professionally qualified
              </p>
              <p className="text-[14px] pt-[8px] text-gray-600">
                The applicant does not meet the professional qualifications
                required to be listed on the MedaCare platform.
              </p>
            </div>
          </label>
        </div>

        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-teal resize-none"
          placeholder="Enter the reason for rejection..."
          maxLength={255}
          value={formData.rejectionReasonNote}
          onChange={handleChange('rejectionReasonNote')}
        ></textarea>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-between mt-4 gap-2">
          <button
            onClick={() => {
              setFormData({
                documentInvalid: false,
                licenseNotValid: false,
                identityUnverified: false,
                professionallyQualified: false,
                rejectionReasonNote: '',
              });
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-secondary-burgandy text-white rounded-md hover:bg-primary-teal-dark"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
