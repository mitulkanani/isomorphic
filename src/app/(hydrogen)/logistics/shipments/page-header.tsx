import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import { shipmentData } from '@/data/shipment-data';
import PageHeader from '@/app/shared/page-header';
import ExportButton from '@/app/shared/export-button';

const pageHeader = {
  title: 'All Assets',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'Assets List',
    },
  ],
};

interface HeaderProps {
  className?: string;
}

export default function ShipmentPageHeader({ className }: HeaderProps) {
  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <div className="mt-4 flex flex-col items-center gap-3 @sm:flex-row @lg:mt-0">
        <ExportButton
          data={shipmentData}
          fileName="Asset_Data"
          header="Asset ID,Serial No,Date,Product Name,Description,DepartMent,Location,ModelNo,Remark,Asset Category,OS,Mac_Address,IP "
        />
        <Link
          href={routes.logistics.createShipment}
          className="w-full @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Create Assets
          </Button>
        </Link>
      </div>
    </PageHeader>
  );
}
