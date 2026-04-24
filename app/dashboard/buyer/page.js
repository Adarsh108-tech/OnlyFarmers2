import DashboardLayout from "@/components/dashboard/DashboardLayout";
import BuyerDashboard from "@/components/dashboard/BuyerDashboard";

export default function BuyerDashboardPage() {
  return (
    <DashboardLayout role="buyer">
      <BuyerDashboard />
    </DashboardLayout>
  );
}
