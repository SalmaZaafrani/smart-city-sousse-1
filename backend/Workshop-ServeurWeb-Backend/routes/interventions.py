from flask import Blueprint, request, jsonify
from models.db import mysql

interventions_bp = Blueprint('interventions', __name__)

@interventions_bp.route('/interventions', methods=['GET'])
def get_interventions():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM interventions")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@interventions_bp.route('/interventions', methods=['POST'])
def add_intervention():
    data = request.get_json()
    cur = mysql.connection.cursor()
    sql = """INSERT INTO interventions 
             (capteur_uuid, technicien_intervenant_id, technicien_validateur_id, type_intervention, date_intervention, duree, cout, impact_co2)
             VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"""
    cur.execute(sql, (
        data['capteur_uuid'],
        data['technicien_intervenant_id'],
        data['technicien_validateur_id'],
        data['type_intervention'],
        data['date_intervention'],
        data['duree'],
        data['cout'],
        data['impact_co2']
    ))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Intervention ajoutée'}), 201
