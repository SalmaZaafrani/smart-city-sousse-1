import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wind, TrafficCone, Zap, Trash2, Filter, RefreshCw } from 'lucide-react';

interface SensorFiltersProps {
  selectedType: string | null;
  selectedStatus: string | null;
  onTypeChange: (type: string | null) => void;
  onStatusChange: (status: string | null) => void;
  onReset: () => void;
}

const sensorTypes = [
  { value: 'air_quality', label: 'Air Quality', icon: Wind },
  { value: 'traffic', label: 'Traffic', icon: TrafficCone },
  { value: 'energy', label: 'Energy', icon: Zap },
  { value: 'waste', label: 'Waste', icon: Trash2 },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'offline', label: 'Offline' },
];

export function SensorFilters({
  selectedType,
  selectedStatus,
  onTypeChange,
  onStatusChange,
  onReset,
}: SensorFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span className="font-medium">Filters:</span>
      </div>

      {/* Sensor Type Filter */}
      <Select
        value={selectedType || 'all'}
        onValueChange={(v) => onTypeChange(v === 'all' ? null : v)}
      >
        <SelectTrigger className="w-[160px] bg-secondary border-border">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {sensorTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              <div className="flex items-center gap-2">
                <type.icon className="w-4 h-4" />
                {type.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        value={selectedStatus || 'all'}
        onValueChange={(v) => onStatusChange(v === 'all' ? null : v)}
      >
        <SelectTrigger className="w-[140px] bg-secondary border-border">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {statusOptions.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Quick Type Buttons */}
      <div className="hidden md:flex items-center gap-2 ml-auto">
        {sensorTypes.map((type) => (
          <Button
            key={type.value}
            variant={selectedType === type.value ? 'default' : 'outline'}
            size="sm"
            onClick={() =>
              onTypeChange(selectedType === type.value ? null : type.value)
            }
            className="gap-2"
          >
            <type.icon className="w-4 h-4" />
            <span className="hidden lg:inline">{type.label}</span>
          </Button>
        ))}
      </div>

      {/* Reset Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <RefreshCw className="w-4 h-4" />
        Reset
      </Button>
    </div>
  );
}