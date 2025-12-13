import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { sensors, Sensor } from '@/data/mockData';
import { SensorFilters } from '@/components/sensors/SensorFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wind, TrafficCone, Zap, Trash2, MapPin, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const sensorTypeConfig = {
  air_quality: { label: 'Air Quality', icon: Wind, color: 'text-success', bg: 'bg-success/10' },
  traffic: { label: 'Traffic', icon: TrafficCone, color: 'text-warning', bg: 'bg-warning/10' },
  energy: { label: 'Energy', icon: Zap, color: 'text-info', bg: 'bg-info/10' },
  waste: { label: 'Waste', icon: Trash2, color: 'text-chart-5', bg: 'bg-chart-5/10' },
};

const statusConfig = {
  active: { label: 'Active', color: 'bg-success/20 text-success border-success/30' },
  maintenance: { label: 'Maintenance', color: 'bg-warning/20 text-warning border-warning/30' },
  offline: { label: 'Offline', color: 'bg-destructive/20 text-destructive border-destructive/30' },
};

export default function SensorsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredSensors = sensors.filter((sensor) => {
    if (selectedType && sensor.type !== selectedType) return false;
    if (selectedStatus && sensor.status !== selectedStatus) return false;
    return true;
  });

  const handleResetFilters = () => {
    setSelectedType(null);
    setSelectedStatus(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sensors</h1>
          <p className="text-muted-foreground">
            Monitor and manage IoT sensors across Sousse
          </p>
        </div>

        {/* Filters */}
        <SensorFilters
          selectedType={selectedType}
          selectedStatus={selectedStatus}
          onTypeChange={setSelectedType}
          onStatusChange={setSelectedStatus}
          onReset={handleResetFilters}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredSensors.length}</span> of{' '}
            <span className="font-semibold text-foreground">{sensors.length}</span> sensors
          </p>
        </div>

        {/* Sensors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSensors.map((sensor) => {
            const typeConfig = sensorTypeConfig[sensor.type];
            const TypeIcon = typeConfig.icon;

            return (
              <Card
                key={sensor.id}
                className="bg-card border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
                          typeConfig.bg
                        )}
                      >
                        <TypeIcon className={cn('w-6 h-6', typeConfig.color)} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {sensor.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-mono">{sensor.id}</p>
                      </div>
                    </div>
                    <Badge className={cn('capitalize', statusConfig[sensor.status].color)}>
                      {sensor.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {sensor.location.district}
                      </span>
                    </div>

                    {sensor.value !== undefined && (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Current Value</span>
                        <span className={cn('text-lg font-bold', typeConfig.color)}>
                          {sensor.value} <span className="text-sm font-normal">{sensor.unit}</span>
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
                      <Clock className="w-3 h-3" />
                      <span>Last updated: {new Date(sensor.lastUpdate).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSensors.length === 0 && (
          <div className="text-center py-16">
            <Activity className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No sensors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}