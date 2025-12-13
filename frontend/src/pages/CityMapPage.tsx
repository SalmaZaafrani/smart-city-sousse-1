import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CityMap } from '@/components/map/CityMap';
import { SensorFilters } from '@/components/sensors/SensorFilters';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { sensors, Sensor } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Activity, Clock } from 'lucide-react';

export default function CityMapPage() {
  const [selectedSensorType, setSelectedSensorType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

  const handleResetFilters = () => {
    setSelectedSensorType(null);
    setSelectedStatus(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 h-full animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">City Map</h1>
            <p className="text-muted-foreground">
              Interactive visualization of Sousse smart infrastructure
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

        {/* Filters */}
        <SensorFilters
          selectedType={selectedSensorType}
          selectedStatus={selectedStatus}
          onTypeChange={setSelectedSensorType}
          onStatusChange={setSelectedStatus}
          onReset={handleResetFilters}
        />

        {/* Map and Details */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 h-[600px]">
            <CityMap
              showHeatmap={showHeatmap}
              selectedSensorType={selectedSensorType}
              onSensorClick={setSelectedSensor}
            />
          </div>

          {/* Sensor Details Panel */}
          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Sensor Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedSensor ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {selectedSensor.type === 'air_quality' && '🌬️'}
                        {selectedSensor.type === 'traffic' && '🚗'}
                        {selectedSensor.type === 'energy' && '⚡'}
                        {selectedSensor.type === 'waste' && '♻️'}
                      </span>
                      <div>
                        <h3 className="font-semibold">{selectedSensor.name}</h3>
                        <p className="text-xs text-muted-foreground font-mono">
                          {selectedSensor.id}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <span
                          className={
                            selectedSensor.status === 'active'
                              ? 'text-success'
                              : selectedSensor.status === 'maintenance'
                              ? 'text-warning'
                              : 'text-destructive'
                          }
                        >
                          {selectedSensor.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">District</span>
                        <span>{selectedSensor.location.district}</span>
                      </div>
                      {selectedSensor.value && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Value</span>
                          <span className="font-semibold text-primary">
                            {selectedSensor.value} {selectedSensor.unit}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coordinates</span>
                        <span className="font-mono text-xs">
                          {selectedSensor.location.lat.toFixed(4)}, {selectedSensor.location.lng.toFixed(4)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Last updated: {new Date(selectedSensor.lastUpdate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Click on a sensor to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Sensors</span>
                  <span className="font-semibold">{sensors.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active</span>
                  <span className="font-semibold text-success">
                    {sensors.filter((s) => s.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Maintenance</span>
                  <span className="font-semibold text-warning">
                    {sensors.filter((s) => s.status === 'maintenance').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Offline</span>
                  <span className="font-semibold text-destructive">
                    {sensors.filter((s) => s.status === 'offline').length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}