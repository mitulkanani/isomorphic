import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import LogisticsListPage from './logistics/shipments/page';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  // return <FileDashboard />;
  return <LogisticsListPage />;
}
