from flask import Blueprint, jsonify
from models import mysql

vehicles_bp = Blueprint('vehicles', __name__)

@vehicles_bp.route('/', methods=['GET'])
def get_vehicles():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM vehicules")
    rows = cur.fetchall()
    cur.close()
    
    vehicles = []
    for row in rows:
        vehicles.append({
            'id': row[0],
            'plaque': row[1],
            'type': row[2],
            'energie_utilisee': row[3],
            'trajet_origine': row[4],
            'trajet_destination': row[5],
            'duree_trajet': row[6],
            'economie_co2': float(row[7])
        })
    return jsonify(vehicles)
