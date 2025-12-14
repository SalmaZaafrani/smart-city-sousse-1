from flask import Blueprint, jsonify
from models import mysql

kpi_bp = Blueprint('kpi', __name__)

@kpi_bp.route('/kpi', methods=['GET'])
def get_kpi():
    cursor = mysql.connection.cursor()

    # Capteurs
    cursor.execute("SELECT COUNT(*) FROM capteurs")
    total_sensors = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM capteurs WHERE statut='active'")
    active_sensors = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM capteurs WHERE statut='maintenance'")
    maintenance_sensors = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM capteurs WHERE statut='offline'")
    offline_sensors = cursor.fetchone()[0]

    # Moyenne AQI (exemple pour capteurs air_quality)
    cursor.execute("SELECT AVG(value) FROM capteurs WHERE type='air_quality' AND statut='active'")
    average_aqi = cursor.fetchone()[0] or 0

    # Véhicules
    cursor.execute("SELECT COUNT(*) FROM vehicules")
    total_vehicles = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM vehicules WHERE type!='offline'")
    active_vehicles = cursor.fetchone()[0]

    # Total CO2 économisé
    cursor.execute("SELECT SUM(co2_sauve) FROM vehicules")
    total_co2_saved = cursor.fetchone()[0] or 0

    cursor.close()
    return jsonify({
        "totalSensors": total_sensors,
        "activeSensors": active_sensors,
        "maintenanceSensors": maintenance_sensors,
        "offlineSensors": offline_sensors,
        "averageAqi": round(average_aqi),
        "totalVehicles": total_vehicles,
        "activeVehicles": active_vehicles,
        "totalCo2Saved": float(total_co2_saved)
    })
