from flask import Blueprint, jsonify
from models import mysql

citizens_bp = Blueprint('citizens', __name__)

@citizens_bp.route('/', methods=['GET'])
def get_citizens():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM citoyens")
    rows = cur.fetchall()
    cur.close()
    
    citizens = []
    for row in rows:
        citizens.append({
            'id': row[0],
            'nom': row[1],
            'prenom': row[2],
            'adresse': row[3],
            'telephone': row[4],
            'email': row[5],
            'score_engagement': row[6],
            'preferences_mobilite': row[7],
            'historique_participation': row[8]
        })
    return jsonify(citizens)
