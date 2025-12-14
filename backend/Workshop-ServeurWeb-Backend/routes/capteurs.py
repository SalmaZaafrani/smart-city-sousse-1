from flask import Blueprint, request, jsonify
from models.db import mysql

capteurs_bp = Blueprint('capteurs', __name__)

# Récupérer tous les capteurs
@capteurs_bp.route('/capteurs', methods=['GET'])
def get_capteurs():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM capteurs")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

# Ajouter un capteur
@capteurs_bp.route('/capteurs', methods=['POST'])
def add_capteur():
    data = request.get_json()
    cur = mysql.connection.cursor()
    sql = "INSERT INTO capteurs (uuid, type, localisation, statut, proprietaire_id, date_installation) VALUES (%s,%s,%s,%s,%s,%s)"
    cur.execute(sql, (data['uuid'], data['type'], data['localisation'], data['statut'], data['proprietaire_id'], data['date_installation']))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Capteur ajouté'}), 201
