from flask import Blueprint, jsonify
from models import mysql

sensors_bp = Blueprint('sensors', __name__)

@sensors_bp.route('/', methods=['GET'])
def get_sensors():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM capteurs")
    rows = cur.fetchall()
    cur.close()
    
    sensors = []
    for row in rows:
        sensors.append({
            'id': row[0],
            'uuid': row[1],
            'type': row[2],
            'localisation': row[3],
            'statut': row[4],
            'proprietaire_id': row[5],
            'date_installation': str(row[6])
        })
    return jsonify(sensors)
