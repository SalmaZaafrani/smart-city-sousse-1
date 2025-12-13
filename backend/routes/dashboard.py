from flask import Blueprint, jsonify
from models import mysql

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/kpi', methods=['GET'])
def get_kpi():
    cur = mysql.connection.cursor()
    
    # Total capteurs
    cur.execute("SELECT COUNT(*) FROM capteurs")
    total_sensors = cur.fetchone()[0]
    
    # Capteurs actifs
    cur.execute("SELECT COUNT(*) FROM capteurs WHERE statut='actif'")
    active_sensors = cur.fetchone()[0]
    
    # Total véhicules
    cur.execute("SELECT COUNT(*) FROM vehicules")
    total_vehicles = cur.fetchone()[0]
    
    # Total CO2 économisé
    cur.execute("SELECT SUM(economie_co2) FROM vehicules")
    total_co2_saved = cur.fetchone()[0] or 0
    
    cur.close()
    
    kpi = {
        'total_sensors': total_sensors,
        'active_sensors': active_sensors,
        'total_vehicles': total_vehicles,
        'total_co2_saved': float(total_co2_saved)
    }
    
    return jsonify(kpi)
