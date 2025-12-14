import { useEffect, useState } from "react";
import { KpiCard } from "./KpiCard";
import { getKpiData } from "@/api/api";
import { Activity, CheckCircle, AlertTriangle, Zap, Cloud } from "lucide-react";

export function KpiDashboard() {
  const [kpi, setKpi] = useState<any>(null);

  useEffect(() => {
    getKpiData().then(setKpi).catch(console.error);
  }, []);

  if (!kpi) return <div>Chargement...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard title="Capteurs Totaux" value={kpi.totalSensors} icon={Activity} variant="primary"/>
      <KpiCard title="Capteurs Actifs" value={kpi.activeSensors} icon={CheckCircle} variant="success"/>
      <KpiCard title="Capteurs Maintenance" value={kpi.maintenanceSensors} icon={AlertTriangle} variant="warning"/>
      <KpiCard title="CO₂ Économisé" value={`${kpi.totalCo2Saved} kg`} icon={Zap} variant="info"/>
      <KpiCard title="Véhicules Actifs" value={kpi.activeVehicles} icon={Cloud} variant="success"/>
    </div>
  );
}
