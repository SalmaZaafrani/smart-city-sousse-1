// src/api/api.ts

const BASE_URL = "http://127.0.0.1:5000";

/* ===========================
   CAPTEURS
=========================== */

// Lire tous les capteurs
export const getSensors = async () => {
  const response = await fetch(`${BASE_URL}/sensors`);
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des capteurs");
  }
  return response.json();
};

// Ajouter un capteur
export const addSensor = async (sensor: {
  uuid: string;
  type: string;
  localisation: string;
  statut?: string;
  proprietaire_id?: number;
  date_installation?: string;
}) => {
  const response = await fetch(`${BASE_URL}/sensors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sensor),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout du capteur");
  }

  return response.json();
};

/* ===========================
   PROPRIETAIRES
=========================== */

export const getProprietaires = async () => {
  const response = await fetch(`${BASE_URL}/proprietaires`);
  return response.json();
};

export const addProprietaire = async (data: {
  nom: string;
  adresse?: string;
  telephone?: string;
  email?: string;
}) => {
  const response = await fetch(`${BASE_URL}/proprietaires`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

/* ===========================
   CITOYENS
=========================== */

export const getCitoyens = async () => {
  const response = await fetch(`${BASE_URL}/citoyens`);
  return response.json();
};

export const addCitoyen = async (data: {
  nom: string;
  prenom?: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  score_engagement?: number;
  preferences_mobilite?: string;
}) => {
  const response = await fetch(`${BASE_URL}/citoyens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

/* ===========================
   VEHICULES
=========================== */

export const getVehicules = async () => {
  const response = await fetch(`${BASE_URL}/vehicules`);
  return response.json();
};

export const addVehicule = async (data: {
  plaque: string;
  type: string;
  energie_utilisee?: number;
  co2_sauve?: number;
}) => {
  const response = await fetch(`${BASE_URL}/vehicules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

/* ===========================
   TRAJETS
=========================== */

export const getTrajets = async () => {
  const response = await fetch(`${BASE_URL}/trajets`);
  return response.json();
};

export const addTrajet = async (data: {
  vehicule_id: number;
  origine: string;
  destination: string;
  duree: number;
  economie_co2?: number;
}) => {
  const response = await fetch(`${BASE_URL}/trajets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
export async function getAirQualityHistory() {
  const res = await fetch("http://127.0.0.1:5000/air-quality/history");
  if (!res.ok) {
    throw new Error("Erreur lors du chargement AQI");
  }
  return res.json();
}
export async function getCo2SavingsData() {
  const res = await fetch("http://127.0.0.1:5000/co2-savings");
  if (!res.ok) throw new Error("Erreur lors du chargement CO₂");
  return res.json();
}
export interface KpiData {
  totalSensors: number;
  activeSensors: number;
  maintenanceSensors: number;
  offlineSensors: number;
  averageAqi: number;
  totalCo2Saved: number;
  totalVehicles: number;
  activeVehicles: number;
}

export async function getKpiData(): Promise<KpiData> {
  const res = await fetch("http://127.0.0.1:5000/kpi");
  if (!res.ok) throw new Error("Erreur lors du chargement des KPI");
  return res.json();
}
