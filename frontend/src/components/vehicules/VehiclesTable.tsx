import { vehicles, Vehicle } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Truck, Sparkles, Shield, Bus, Battery, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

const vehicleTypeConfig = {
  garbage_truck: { label: 'Garbage Truck', icon: Truck, color: 'text-warning' },
  street_sweeper: { label: 'Street Sweeper', icon: Sparkles, color: 'text-info' },
  patrol: { label: 'Patrol', icon: Shield, color: 'text-primary' },
  shuttle: { label: 'Shuttle', icon: Bus, color: 'text-success' },
};

const statusConfig = {
  active: { label: 'Active', variant: 'success' as const },
  charging: { label: 'Charging', variant: 'info' as const },
  maintenance: { label: 'Maintenance', variant: 'warning' as const },
};

export function VehiclesTable() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Autonomous Municipal Vehicles
            </h3>
            <p className="text-sm text-muted-foreground">
              Electric vehicle fleet status and environmental impact
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-info" />
              <span className="text-muted-foreground">
                Total Energy: <span className="font-semibold text-foreground">{vehicles.reduce((a, v) => a + v.energyUsed, 0).toFixed(1)} kWh</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">
                CO₂ Saved: <span className="font-semibold text-success">{vehicles.reduce((a, v) => a + v.co2Saved, 0).toFixed(1)} kg</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Vehicle</TableHead>
            <TableHead className="text-muted-foreground">Plate Number</TableHead>
            <TableHead className="text-muted-foreground">Type</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground text-right">Energy Used</TableHead>
            <TableHead className="text-muted-foreground text-right">CO₂ Saved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => {
            const typeConfig = vehicleTypeConfig[vehicle.type];
            const status = statusConfig[vehicle.status];
            const TypeIcon = typeConfig.icon;

            return (
              <TableRow
                key={vehicle.id}
                className="border-border hover:bg-secondary/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-lg bg-secondary flex items-center justify-center',
                      typeConfig.color
                    )}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      {vehicle.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono font-medium">{vehicle.plateNumber}</span>
                </TableCell>
                <TableCell>
                  <span className={cn('font-medium', typeConfig.color)}>
                    {typeConfig.label}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={status.variant === 'success' ? 'default' : 'secondary'}
                    className={cn(
                      'capitalize',
                      status.variant === 'success' && 'bg-success/20 text-success border-success/30',
                      status.variant === 'info' && 'bg-info/20 text-info border-info/30',
                      status.variant === 'warning' && 'bg-warning/20 text-warning border-warning/30'
                    )}
                  >
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Battery className="w-4 h-4 text-info" />
                    <span className="font-medium">{vehicle.energyUsed}</span>
                    <span className="text-muted-foreground text-xs">kWh</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Leaf className="w-4 h-4 text-success" />
                    <span className="font-semibold text-success">{vehicle.co2Saved}</span>
                    <span className="text-muted-foreground text-xs">kg</span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}