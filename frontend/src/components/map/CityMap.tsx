import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { sensors, pollutionHeatmapData, Sensor } from '@/data/mockData';
import { Wind, TrafficCone, Zap, Trash2 } from 'lucide-react';

// Fix Leaflet default icon issue

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Sousse coordinates
const SOUSSE_CENTER: L.LatLngExpression = [35.8254, 10.6084];
const SOUSSE_ZOOM = 13;

// Sensor type configurations
const sensorConfig = {
  air_quality: { color: '#22c55e', label: 'Air Quality', icon: '🌬️' },
  traffic: { color: '#f59e0b', label: 'Traffic', icon: '🚗' },
  energy: { color: '#3b82f6', label: 'Energy', icon: '⚡' },
  waste: { color: '#8b5cf6', label: 'Waste', icon: '♻️' },
};

const statusColors = {
  active: '#22c55e',
  maintenance: '#f59e0b',
  offline: '#ef4444',
};

interface CityMapProps {
  showHeatmap?: boolean;
  selectedSensorType?: string | null;
  onSensorClick?: (sensor: Sensor) => void;
}

export function CityMap({
  showHeatmap = true,
  selectedSensorType = null,
  onSensorClick,
}: CityMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const heatLayerRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainer.current, {
      center: SOUSSE_CENTER,
      zoom: SOUSSE_ZOOM,
      zoomControl: true,
    });

    // Add tile layer (dark theme compatible)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Initialize markers layer group
    markersRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when sensor type filter changes
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    // Clear existing markers
    markersRef.current.clearLayers();

    // Filter sensors
    const filteredSensors = selectedSensorType
      ? sensors.filter((s) => s.type === selectedSensorType)
      : sensors;

    // Add markers
    filteredSensors.forEach((sensor) => {
      const config = sensorConfig[sensor.type];
      const statusColor = statusColors[sensor.status];

      // Create custom icon
      const iconHtml = `
        <div style="
          width: 36px;
          height: 36px;
          background: ${config.color};
          border: 3px solid ${statusColor};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          ${sensor.status === 'active' ? 'animation: pulse 2s infinite;' : ''}
        ">
          ${config.icon}
        </div>
      `;

      const icon = L.divIcon({
        html: iconHtml,
        className: 'custom-sensor-icon',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
      });

      const marker = L.marker([sensor.location.lat, sensor.location.lng], {
        icon,
      });

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; font-family: 'Inter', sans-serif;">
          <div style="
            background: linear-gradient(135deg, ${config.color}20, ${config.color}10);
            padding: 12px;
            border-radius: 8px 8px 0 0;
            border-bottom: 1px solid ${config.color}30;
          ">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">${config.icon}</span>
              <div>
                <h3 style="margin: 0; font-size: 14px; font-weight: 600;">${sensor.name}</h3>
                <span style="
                  font-size: 11px;
                  color: ${statusColor};
                  text-transform: uppercase;
                  font-weight: 500;
                ">${sensor.status}</span>
              </div>
            </div>
          </div>
          <div style="padding: 12px;">
            <div style="display: grid; gap: 8px; font-size: 12px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #888;">ID:</span>
                <span style="font-weight: 500; font-family: monospace;">${sensor.id}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #888;">Type:</span>
                <span style="font-weight: 500;">${config.label}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #888;">District:</span>
                <span style="font-weight: 500;">${sensor.location.district}</span>
              </div>
              ${
                sensor.value !== undefined
                  ? `
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #888;">Value:</span>
                <span style="font-weight: 600; color: ${config.color};">${sensor.value} ${sensor.unit}</span>
              </div>
              `
                  : ''
              }
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #888;">Last Update:</span>
                <span style="font-weight: 500;">${new Date(sensor.lastUpdate).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-popup',
        closeButton: true,
      });

      marker.on('click', () => {
        onSensorClick?.(sensor);
      });

      markersRef.current?.addLayer(marker);
    });
  }, [selectedSensorType, onSensorClick]);

  // Add/remove heatmap layer
  useEffect(() => {
    if (!mapRef.current) return;

    const loadHeatmap = async () => {
      if (showHeatmap && !heatLayerRef.current) {
        // Dynamically import leaflet.heat
        const L = await import('leaflet');
        await import('leaflet.heat');

        heatLayerRef.current = L.heatLayer(pollutionHeatmapData, {
          radius: 35,
          blur: 25,
          maxZoom: 17,
          max: 1.0,
          gradient: {
            0.0: '#22c55e', // Green - good air quality
            0.3: '#84cc16', // Light green
            0.5: '#fbbf24', // Yellow - moderate
            0.7: '#f97316', // Orange - unhealthy for sensitive
            0.9: '#ef4444', // Red - unhealthy
            1.0: '#dc2626', // Dark red - very unhealthy
          },
        });

        heatLayerRef.current.addTo(mapRef.current!);
      } else if (!showHeatmap && heatLayerRef.current) {
        mapRef.current!.removeLayer(heatLayerRef.current);
        heatLayerRef.current = null;
      }
    };

    loadHeatmap();
  }, [showHeatmap]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-border">
      <div ref={mapContainer} className="w-full h-full" />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <h4 className="text-xs font-semibold text-foreground mb-2">Sensor Types</h4>
        <div className="space-y-1.5">
          {Object.entries(sensorConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <span>{config.icon}</span>
              <span className="text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-2 pt-2">
          <h4 className="text-xs font-semibold text-foreground mb-1.5">Status</h4>
          <div className="flex gap-3">
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-1 text-xs">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-muted-foreground capitalize">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap Legend */}
      {showHeatmap && (
        <div className="absolute bottom-4 right-4 z-[1000] bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <h4 className="text-xs font-semibold text-foreground mb-2">
            Air Pollution Level
          </h4>
          <div className="w-32 h-3 rounded-full bg-gradient-to-r from-success via-warning to-destructive" />
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      )}

      {/* CSS for marker pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
        }
        .custom-sensor-icon {
          background: transparent !important;
          border: none !important;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          padding: 0;
          overflow: hidden;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
      `}</style>
    </div>
  );
}