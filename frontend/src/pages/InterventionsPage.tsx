import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Wrench,
  Zap,
  AlertOctagon,
} from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { cn } from '@/lib/utils';

// Mock interventions data
const interventions = [
  {
    id: 'INT-001',
    title: 'Power Grid Maintenance',
    type: 'maintenance',
    priority: 'high',
    status: 'in_progress',
    location: 'Khezama District',
    assignedTeam: 'Energy Team Alpha',
    startTime: '2024-01-15T08:00:00Z',
    estimatedCompletion: '2024-01-15T16:00:00Z',
  },
  {
    id: 'INT-002',
    title: 'Traffic Sensor Repair',
    type: 'repair',
    priority: 'medium',
    status: 'pending',
    location: 'Corniche Area',
    assignedTeam: 'IoT Maintenance',
    startTime: '2024-01-15T14:00:00Z',
    estimatedCompletion: '2024-01-15T17:00:00Z',
  },
  {
    id: 'INT-003',
    title: 'Air Quality Alert Response',
    type: 'emergency',
    priority: 'critical',
    status: 'in_progress',
    location: 'Zone Industrielle',
    assignedTeam: 'Environmental Response',
    startTime: '2024-01-15T10:30:00Z',
    estimatedCompletion: '2024-01-15T18:00:00Z',
  },
  {
    id: 'INT-004',
    title: 'Smart Bin Collection Route',
    type: 'routine',
    priority: 'low',
    status: 'completed',
    location: 'Médina',
    assignedTeam: 'Waste Management',
    startTime: '2024-01-15T06:00:00Z',
    estimatedCompletion: '2024-01-15T12:00:00Z',
  },
  {
    id: 'INT-005',
    title: 'EV Charging Station Setup',
    type: 'installation',
    priority: 'medium',
    status: 'scheduled',
    location: 'Port El Kantaoui',
    assignedTeam: 'Infrastructure Team',
    startTime: '2024-01-16T09:00:00Z',
    estimatedCompletion: '2024-01-16T17:00:00Z',
  },
];

const priorityConfig = {
  critical: { label: 'Critical', color: 'bg-destructive/20 text-destructive border-destructive/30', icon: AlertOctagon },
  high: { label: 'High', color: 'bg-warning/20 text-warning border-warning/30', icon: AlertTriangle },
  medium: { label: 'Medium', color: 'bg-info/20 text-info border-info/30', icon: Zap },
  low: { label: 'Low', color: 'bg-success/20 text-success border-success/30', icon: CheckCircle },
};

const statusConfig = {
  completed: { label: 'Completed', color: 'text-success' },
  in_progress: { label: 'In Progress', color: 'text-info' },
  pending: { label: 'Pending', color: 'text-warning' },
  scheduled: { label: 'Scheduled', color: 'text-muted-foreground' },
};

const typeConfig = {
  emergency: 'Emergency',
  maintenance: 'Maintenance',
  repair: 'Repair',
  routine: 'Routine',
  installation: 'Installation',
};

export default function InterventionsPage() {
  const activeInterventions = interventions.filter(
    (i) => i.status === 'in_progress' || i.status === 'pending'
  ).length;
  const criticalCount = interventions.filter((i) => i.priority === 'critical').length;
  const completedToday = interventions.filter((i) => i.status === 'completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Interventions</h1>
          <p className="text-muted-foreground">
            Municipal response and maintenance operations
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Active Interventions"
            value={activeInterventions}
            subtitle="Currently ongoing"
            icon={Wrench}
            variant="primary"
          />
          <KpiCard
            title="Critical Alerts"
            value={criticalCount}
            subtitle="Require immediate attention"
            icon={AlertTriangle}
            variant="warning"
          />
          <KpiCard
            title="Teams Deployed"
            value={3}
            subtitle="Field teams active"
            icon={Users}
            variant="info"
          />
          <KpiCard
            title="Completed Today"
            value={completedToday}
            subtitle="Successfully resolved"
            icon={CheckCircle}
            variant="success"
          />
        </div>

        {/* Interventions List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Active & Scheduled Interventions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interventions.map((intervention) => {
                const priority = priorityConfig[intervention.priority as keyof typeof priorityConfig];
                const status = statusConfig[intervention.status as keyof typeof statusConfig];
                const PriorityIcon = priority.icon;

                return (
                  <div
                    key={intervention.id}
                    className={cn(
                      'p-4 rounded-lg border transition-all hover:shadow-md',
                      intervention.priority === 'critical'
                        ? 'border-destructive/30 bg-destructive/5'
                        : 'border-border bg-secondary/20'
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            intervention.priority === 'critical' && 'bg-destructive/20',
                            intervention.priority === 'high' && 'bg-warning/20',
                            intervention.priority === 'medium' && 'bg-info/20',
                            intervention.priority === 'low' && 'bg-success/20'
                          )}
                        >
                          <PriorityIcon
                            className={cn(
                              'w-5 h-5',
                              intervention.priority === 'critical' && 'text-destructive',
                              intervention.priority === 'high' && 'text-warning',
                              intervention.priority === 'medium' && 'text-info',
                              intervention.priority === 'low' && 'text-success'
                            )}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {intervention.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-mono">
                            {intervention.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={priority.color}>{priority.label}</Badge>
                        <span className={cn('text-sm font-medium', status.color)}>
                          {status.label}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {intervention.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {intervention.assignedTeam}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          ETA: {new Date(intervention.estimatedCompletion).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}