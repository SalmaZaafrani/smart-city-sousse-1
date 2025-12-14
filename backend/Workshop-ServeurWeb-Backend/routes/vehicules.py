from flask import Blueprint, request, jsonify
from models.db import mysql

vehicules_bp = Blueprint('vehicules', __name__)

@vehicules_bp.route('/vehicules', methods=['GET'])
def get_vehicules():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM vehicules")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@vehicules_bp.route('/vehicules', methods=['POST'])
def add_vehicule():
    data = request.get_json()
    cur = mysql.connection.cursor()
    sql = "INSERT INTO vehicules (plaque, type, energie_utilisee) VALUES (%s,%s,%s)"
    cur.execute(sql, (data['plaque'], data['type'], data['energie_utilisee']))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Véhicule ajouté'}), 201
