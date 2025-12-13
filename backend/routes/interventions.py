from flask import Blueprint, jsonify
from models import mysql

interventions_bp = Blueprint('interventions', __name__)

@interventions_bp.route('/', methods=['GET'])
def get_interventions():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM interventions")
    rows = cur.fetchall()
    cur.close()
    
    interventions = []
    for row in rows:
        interventions.append({
            'id': row[0],
            'capteur_uuid': row[1],
            'date_heure': str(row[2]),
            'nature': row[3],
            'duree': row[4],
            'cout': float(row[5]),
            'impact_co2': float(row[6])
        })
    return jsonify(interventions)
