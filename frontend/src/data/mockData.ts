export interface Sensor {
  id: string;
  type: 'air_quality' | 'traffic' | 'energy' | 'waste';
  name: string;
  location: {
    lat: number;
    lng: number;
    district: string;
  };
  status: 'active' | 'maintenance' | 'offline';
  lastUpdate: string;
  value?: number;
  unit?: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: 'garbage_truck' | 'street_sweeper' | 'patrol' | 'shuttle';
  energyUsed: number; // kWh
  co2Saved: number; // kg
  status: 'active' | 'charging' | 'maintenance';
  lastPosition: {
    lat: number;
    lng: number;
  };
  route?: { lat: number; lng: number }[];
}

export interface AirQualityReading {
  timestamp: string;
  aqi: number;
  pm25: number;
  pm10: number;
  co2: number;
}

export interface DistrictStats {
  name: string;
  activeSensors: number;
  totalSensors: number;
}

// Sousse coordinates: 35.8254° N, 10.6084° E
const SOUSSE_CENTER = { lat: 35.8254, lng: 10.6084 };

export const sensors: Sensor[] = [
  // Air Quality Sensors
  {
    id: 'AQ-001',
    type: 'air_quality',
    name: 'Médina Air Monitor',
    location: { lat: 35.8288, lng: 10.6385, district: 'Médina' },
    status: 'active',
    lastUpdate: '2024-01-15T14:30:00Z',
    value: 42,
    unit: 'AQI',
  },
  {
    id: 'AQ-002',
    type: 'air_quality',
    name: 'Port El Kantaoui Monitor',
    location: { lat: 35.8925, lng: 10.5914, district: 'Port El Kantaoui' },
    status: 'active',
    lastUpdate: '2024-01-15T14:28:00Z',
    value: 35,
    unit: 'AQI',
  },
  {
    id: 'AQ-003',
    type: 'air_quality',
    name: 'Khezama Monitor',
    location: { lat: 35.8356, lng: 10.5842, district: 'Khezama' },
    status: 'maintenance',
    lastUpdate: '2024-01-15T10:00:00Z',
    value: 58,
    unit: 'AQI',
  },
  {
    id: 'AQ-004',
    type: 'air_quality',
    name: 'Industrial Zone Monitor',
    location: { lat: 35.7985, lng: 10.6152, district: 'Zone Industrielle' },
    status: 'active',
    lastUpdate: '2024-01-15T14:32:00Z',
    value: 78,
    unit: 'AQI',
  },
  // Traffic Sensors
  {
    id: 'TR-001',
    type: 'traffic',
    name: 'Avenue Habib Bourguiba Traffic',
    location: { lat: 35.8276, lng: 10.5998, district: 'Centre Ville' },
    status: 'active',
    lastUpdate: '2024-01-15T14:31:00Z',
    value: 856,
    unit: 'vehicles/h',
  },
  {
    id: 'TR-002',
    type: 'traffic',
    name: 'Route de Tunis Junction',
    location: { lat: 35.8412, lng: 10.5756, district: 'Sahloul' },
    status: 'active',
    lastUpdate: '2024-01-15T14:30:00Z',
    value: 1234,
    unit: 'vehicles/h',
  },
  {
    id: 'TR-003',
    type: 'traffic',
    name: 'Corniche Traffic Monitor',
    location: { lat: 35.8198, lng: 10.6285, district: 'Corniche' },
    status: 'offline',
    lastUpdate: '2024-01-14T22:15:00Z',
    value: 0,
    unit: 'vehicles/h',
  },
  // Energy Sensors
  {
    id: 'EN-001',
    type: 'energy',
    name: 'Solar Grid Station Alpha',
    location: { lat: 35.8156, lng: 10.5685, district: 'Hammam Sousse' },
    status: 'active',
    lastUpdate: '2024-01-15T14:29:00Z',
    value: 245.8,
    unit: 'kW',
  },
  {
    id: 'EN-002',
    type: 'energy',
    name: 'Smart Grid Monitor Beta',
    location: { lat: 35.8452, lng: 10.6125, district: 'Jawhara' },
    status: 'active',
    lastUpdate: '2024-01-15T14:30:00Z',
    value: 189.3,
    unit: 'kW',
  },
  // Waste Sensors
  {
    id: 'WS-001',
    type: 'waste',
    name: 'Smart Bin Cluster Médina',
    location: { lat: 35.8265, lng: 10.6342, district: 'Médina' },
    status: 'active',
    lastUpdate: '2024-01-15T14:25:00Z',
    value: 72,
    unit: '%',
  },
  {
    id: 'WS-002',
    type: 'waste',
    name: 'Smart Bin Cluster Beach',
    location: { lat: 35.8312, lng: 10.6458, district: 'Plage Boujaafar' },
    status: 'active',
    lastUpdate: '2024-01-15T14:28:00Z',
    value: 45,
    unit: '%',
  },
  {
    id: 'WS-003',
    type: 'waste',
    name: 'Recycling Hub Sahloul',
    location: { lat: 35.8489, lng: 10.5823, district: 'Sahloul' },
    status: 'active',
    lastUpdate: '2024-01-15T14:30:00Z',
    value: 28,
    unit: '%',
  },
];

export const vehicles: Vehicle[] = [
  {
    id: 'VH-001',
    plateNumber: '123 TUN 4567',
    type: 'garbage_truck',
    energyUsed: 45.2,
    co2Saved: 128.5,
    status: 'active',
    lastPosition: { lat: 35.8234, lng: 10.6125 },
    route: [
      { lat: 35.8234, lng: 10.6125 },
      { lat: 35.8298, lng: 10.6285 },
      { lat: 35.8356, lng: 10.6342 },
    ],
  },
  {
    id: 'VH-002',
    plateNumber: '234 TUN 5678',
    type: 'street_sweeper',
    energyUsed: 32.8,
    co2Saved: 89.3,
    status: 'active',
    lastPosition: { lat: 35.8412, lng: 10.5856 },
  },
  {
    id: 'VH-003',
    plateNumber: '345 TUN 6789',
    type: 'patrol',
    energyUsed: 28.5,
    co2Saved: 72.1,
    status: 'charging',
    lastPosition: { lat: 35.8156, lng: 10.5985 },
  },
  {
    id: 'VH-004',
    plateNumber: '456 TUN 7890',
    type: 'shuttle',
    energyUsed: 58.9,
    co2Saved: 156.8,
    status: 'active',
    lastPosition: { lat: 35.8925, lng: 10.5914 },
  },
  {
    id: 'VH-005',
    plateNumber: '567 TUN 8901',
    type: 'garbage_truck',
    energyUsed: 52.1,
    co2Saved: 142.3,
    status: 'maintenance',
    lastPosition: { lat: 35.8089, lng: 10.5756 },
  },
  {
    id: 'VH-006',
    plateNumber: '678 TUN 9012',
    type: 'street_sweeper',
    energyUsed: 38.4,
    co2Saved: 98.7,
    status: 'active',
    lastPosition: { lat: 35.8356, lng: 10.6085 },
  },
];

export const airQualityHistory: AirQualityReading[] = Array.from({ length: 24 }, (_, i) => {
  const hour = 23 - i;
  const baseAqi = 45 + Math.sin(hour / 3) * 15;
  return {
    timestamp: `${hour.toString().padStart(2, '0')}:00`,
    aqi: Math.round(baseAqi + Math.random() * 10),
    pm25: Math.round(20 + Math.random() * 15),
    pm10: Math.round(35 + Math.random() * 20),
    co2: Math.round(380 + Math.random() * 40),
  };
}).reverse();

export const districtStats: DistrictStats[] = [
  { name: 'Médina', activeSensors: 8, totalSensors: 10 },
  { name: 'Sahloul', activeSensors: 6, totalSensors: 7 },
  { name: 'Khezama', activeSensors: 4, totalSensors: 5 },
  { name: 'Port El Kantaoui', activeSensors: 5, totalSensors: 5 },
  { name: 'Hammam Sousse', activeSensors: 3, totalSensors: 4 },
  { name: 'Zone Industrielle', activeSensors: 4, totalSensors: 6 },
];

export const co2SavingsData = [
  { month: 'Jan', savings: 1250, vehicles: 4 },
  { month: 'Feb', savings: 1480, vehicles: 5 },
  { month: 'Mar', savings: 1720, vehicles: 5 },
  { month: 'Apr', savings: 1890, vehicles: 6 },
  { month: 'May', savings: 2150, vehicles: 6 },
  { month: 'Jun', savings: 2340, vehicles: 6 },
];

// Heatmap data points for air pollution visualization
export const pollutionHeatmapData: [number, number, number][] = [
  [35.8288, 10.6385, 0.4], // Médina - moderate
  [35.8925, 10.5914, 0.2], // Port El Kantaoui - low
  [35.8356, 10.5842, 0.5], // Khezama - moderate
  [35.7985, 10.6152, 0.8], // Industrial Zone - high
  [35.8276, 10.5998, 0.6], // Centre Ville - moderate-high
  [35.8412, 10.5756, 0.5], // Sahloul - moderate
  [35.8198, 10.6285, 0.3], // Corniche - low
  [35.8156, 10.5685, 0.3], // Hammam Sousse - low
  [35.8452, 10.6125, 0.4], // Jawhara - moderate
  [35.8265, 10.6342, 0.5], // Médina bins area - moderate
  [35.8312, 10.6458, 0.2], // Beach area - low
  [35.8489, 10.5823, 0.4], // Sahloul recycling - moderate
];

// KPI Summary
export const kpiData = {
  totalSensors: sensors.length,
  activeSensors: sensors.filter(s => s.status === 'active').length,
  maintenanceSensors: sensors.filter(s => s.status === 'maintenance').length,
  offlineSensors: sensors.filter(s => s.status === 'offline').length,
  averageAqi: Math.round(
    sensors
      .filter(s => s.type === 'air_quality' && s.status === 'active')
      .reduce((acc, s) => acc + (s.value || 0), 0) /
      sensors.filter(s => s.type === 'air_quality' && s.status === 'active').length
  ),
  totalCo2Saved: vehicles.reduce((acc, v) => acc + v.co2Saved, 0).toFixed(1),
  totalVehicles: vehicles.length,
  activeVehicles: vehicles.filter(v => v.status === 'active').length,
};