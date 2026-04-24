import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FarmerDashboard from "@/components/dashboard/FarmerDashboard";

export default function FarmerDashboardPage() {
  return (
    <DashboardLayout role="farmer">
      <FarmerDashboard />
    </DashboardLayout>
  );
}