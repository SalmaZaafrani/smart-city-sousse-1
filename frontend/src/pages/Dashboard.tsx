import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { AirQualityChart } from '@/components/dashboard/AirQualityChart';
import { SensorAvailabilityChart } from '@/components/dashboard/SensorAvailabilityChart';
import { Co2SavingsChart } from '@/components/dashboard/Co2SavingsChart';
import { CityMap } from '@/components/map/CityMap';
import { SensorFilters } from '@/components/sensors/SensorFilters';
import { VehiclesTable } from '@/components/vehicules/VehiclesTable';
import { kpiData } from '@/data/mockData';
import {
  Cpu,
  Activity,
  Wind,
  Leaf,
  Car,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Dashboard() {
  const [selectedSensorType, setSelectedSensorType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);

  const handleResetFilters = () => {
    setSelectedSensorType(null);
    setSelectedStatus(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Real-time urban analytics for the city of Sousse
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="heatmap"
                checked={showHeatmap}
                onCheckedChange={setShowHeatmap}
              />
              <Label htmlFor="heatmap" className="text-sm text-muted-foreground cursor-pointer">
                Pollution Heatmap
              </Label>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Sensors"
            value={kpiData.totalSensors}
            subtitle={`${kpiData.activeSensors} active, ${kpiData.maintenanceSensors} maintenance`}
            icon={Cpu}
            variant="primary"
            trend={{ value: 12, positive: true }}
          />
          <KpiCard
            title="Active Sensors"
            value={kpiData.activeSensors}
            subtitle={`${Math.round((kpiData.activeSensors / kpiData.totalSensors) * 100)}% availability`}
            icon={Activity}
            variant="success"
          />
          <KpiCard
            title="Average Air Quality"
            value={kpiData.averageAqi}
            subtitle="AQI across all districts"
            icon={Wind}
            variant="info"
            trend={{ value: 8, positive: true }}
          />
          <KpiCard
            title="CO₂ Reduction"
            value={`${kpiData.totalCo2Saved} kg`}
            subtitle={`From ${kpiData.activeVehicles} active vehicles`}
            icon={Leaf}
            variant="success"
            trend={{ value: 15, positive: true }}
          />
        </div>

        {/* Filters */}
        <SensorFilters
          selectedType={selectedSensorType}
          selectedStatus={selectedStatus}
          onTypeChange={setSelectedSensorType}
          onStatusChange={setSelectedStatus}
          onReset={handleResetFilters}
        />

        {/* Map Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 h-[450px]">
            <CityMap
              showHeatmap={showHeatmap}
              selectedSensorType={selectedSensorType}
            />
          </div>
          <div className="space-y-6">
            <AirQualityChart />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SensorAvailabilityChart />
          <Co2SavingsChart />
        </div>

        {/* Vehicles Section */}
        <VehiclesTable />
      </div>
    </DashboardLayout>
  );
}