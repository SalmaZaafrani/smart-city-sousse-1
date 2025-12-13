import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VehiclesTable } from '@/components/vehicules/VehiclesTable';
import { vehicles } from '@/data/mockData';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { Co2SavingsChart } from '@/components/dashboard/Co2SavingsChart';
import { Car, Battery, Leaf, Wrench } from 'lucide-react';

export default function VehiclesPage() {
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((v) => v.status === 'active').length;
  const chargingVehicles = vehicles.filter((v) => v.status === 'charging').length;
  const maintenanceVehicles = vehicles.filter((v) => v.status === 'maintenance').length;
  const totalEnergy = vehicles.reduce((a, v) => a + v.energyUsed, 0);
  const totalCo2Saved = vehicles.reduce((a, v) => a + v.co2Saved, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Autonomous Vehicles</h1>
          <p className="text-muted-foreground">
            Electric municipal vehicle fleet management
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Vehicles"
            value={totalVehicles}
            subtitle={`${activeVehicles} currently active`}
            icon={Car}
            variant="primary"
          />
          <KpiCard
            title="Active Fleet"
            value={activeVehicles}
            subtitle={`${chargingVehicles} charging, ${maintenanceVehicles} maintenance`}
            icon={Battery}
            variant="info"
          />
          <KpiCard
            title="Total Energy Used"
            value={`${totalEnergy.toFixed(1)} kWh`}
            subtitle="Today's consumption"
            icon={Battery}
            variant="warning"
          />
          <KpiCard
            title="CO₂ Saved"
            value={`${totalCo2Saved.toFixed(1)} kg`}
            subtitle="Environmental impact"
            icon={Leaf}
            variant="success"
            trend={{ value: 15, positive: true }}
          />
        </div>

        {/* CO2 Savings Chart */}
        <Co2SavingsChart />

        {/* Vehicles Table */}
        <VehiclesTable />
      </div>
    </DashboardLayout>
  );
}