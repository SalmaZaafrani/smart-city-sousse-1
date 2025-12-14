from flask import Blueprint, request, jsonify
from models.db import mysql

trajets_bp = Blueprint('trajets', __name__)

@trajets_bp.route('/trajets', methods=['GET'])
def get_trajets():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM trajets")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@trajets_bp.route('/trajets', methods=['POST'])
def add_trajet():
    data = request.get_json()
    cur = mysql.connection.cursor()
    sql = "INSERT INTO trajets (vehicule_id, origine, destination, duree, economie_co2) VALUES (%s,%s,%s,%s,%s)"
    cur.execute(sql, (
        data['vehicule_id'],
        data['origine'],
        data['destination'],
        data['duree'],
        data['economie_co2']
    ))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Trajet ajouté'}), 201
