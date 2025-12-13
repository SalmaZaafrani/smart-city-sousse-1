import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, MessageSquare, ThumbsUp, Clock, MapPin } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';

// Mock citizen engagement data
const citizenReports = [
  {
    id: 'CR-001',
    type: 'Infrastructure',
    description: 'Pothole on Avenue Habib Bourguiba',
    status: 'resolved',
    district: 'Centre Ville',
    date: '2024-01-14',
    likes: 24,
  },
  {
    id: 'CR-002',
    type: 'Environment',
    description: 'Overflowing garbage bin near the beach',
    status: 'in_progress',
    district: 'Plage Boujaafar',
    date: '2024-01-15',
    likes: 18,
  },
  {
    id: 'CR-003',
    type: 'Lighting',
    description: 'Street light not working on Rue de France',
    status: 'pending',
    district: 'Médina',
    date: '2024-01-15',
    likes: 12,
  },
  {
    id: 'CR-004',
    type: 'Traffic',
    description: 'Traffic signal malfunction at main junction',
    status: 'resolved',
    district: 'Sahloul',
    date: '2024-01-13',
    likes: 45,
  },
  {
    id: 'CR-005',
    type: 'Environment',
    description: 'Air quality concern near industrial zone',
    status: 'in_progress',
    district: 'Zone Industrielle',
    date: '2024-01-15',
    likes: 32,
  },
];

const statusConfig = {
  resolved: { label: 'Resolved', color: 'bg-success/20 text-success border-success/30' },
  in_progress: { label: 'In Progress', color: 'bg-info/20 text-info border-info/30' },
  pending: { label: 'Pending', color: 'bg-warning/20 text-warning border-warning/30' },
};

export default function CitizensPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Citizens</h1>
          <p className="text-muted-foreground">
            Community engagement and citizen feedback platform
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Active Citizens"
            value="12,458"
            subtitle="Registered users"
            icon={Users}
            variant="primary"
            trend={{ value: 8, positive: true }}
          />
          <KpiCard
            title="Reports This Month"
            value="156"
            subtitle="Community submissions"
            icon={MessageSquare}
            variant="info"
          />
          <KpiCard
            title="Resolved Issues"
            value="89%"
            subtitle="Resolution rate"
            icon={UserCheck}
            variant="success"
          />
          <KpiCard
            title="Avg Response Time"
            value="4.2h"
            subtitle="First response"
            icon={Clock}
            variant="warning"
          />
        </div>

        {/* Recent Reports */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Recent Citizen Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {citizenReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-start justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                      <Badge className={statusConfig[report.status as keyof typeof statusConfig].color}>
                        {statusConfig[report.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <p className="text-foreground font-medium mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {report.district}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{report.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}