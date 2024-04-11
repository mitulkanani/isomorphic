'use client'
import { PiArrowLineUpBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import { exportToCSV } from '@/utils/export-to-csv';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useEffect, useState } from 'react';

type ExportButtonProps = {
  data: unknown[];
  header: string;
  fileName: string;
  className?: string;
};

interface filterDataType {
  id: string;
  assetID: string;
  date: string;
}

export default function ExportButton({
  data,
  header,
  fileName,
  className,
}: ExportButtonProps) {
  const { closeModal, openModal } = useModal();

  const handleExportClick = () => {
    openModal({
      view: <ModalView data={data} />,
    });
  };

  const ModalView = ({ data }: any) => {
    const keys = localStorage.getItem('selectedRowKeys');
    if (!keys) return;

    const hey = JSON.parse(keys) as string[]
    const filteredData = (data as filterDataType[]).filter((item) => hey.includes(item.id)); // Optional nullish coalescing for data
    console.log("🚀 ~ ModalView ~ filteredData:", filteredData)

    const handleDownload = async () => {
      if (filteredData.length > 0) {

        if (!filteredData || filteredData.length === 0) {
          throw new Error('No data selected for export');
        }
        await exportToCSV(filteredData, header, fileName);
      }
      closeModal()
    };
    const buttonText = filteredData.length <= 0 ? 'Cancel' : 'Download';
    return (
      <div className='p-5 flex flex-col justify-center items-center'>
        {filteredData.length > 0 ?
          <>
            {
              filteredData.map((item) => (
                <div key={item.id} className='flex gap-3'>
                  <div>Assets ID and Date: </div>
                  <div>{item.assetID}</div> -
                  <div>{item.date}</div>
                </div>
              ))
            }
          </> :
          <>
            <p>Please Select Table Row</p>
          </>
        }
        <button onClick={handleDownload} className='border-2 mt-7 hover:duration-500 rounded-md px-4 py-2 hover:border-white text-md font-semibold text-gray'>
          {buttonText}
        </button>
      </div>
    );
  };

  return (
    <Button variant="outline" onClick={handleExportClick} className={cn('w-full @lg:w-auto', className)}>
      <PiArrowLineUpBold className="me-1.5 h-[17px] w-[17px]" />
      Export
    </Button>
  );
}
