from flask import Blueprint, request, jsonify
from models.db import mysql

proprietaires_bp = Blueprint('proprietaires', __name__)

@proprietaires_bp.route('/proprietaires', methods=['GET'])
def get_proprietaires():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM proprietaires")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@proprietaires_bp.route('/proprietaires', methods=['POST'])
def add_proprietaire():
    data = request.get_json()
    cur = mysql.connection.cursor()
    sql = "INSERT INTO proprietaires (nom, adresse, telephone, email) VALUES (%s,%s,%s,%s)"
    cur.execute(sql, (data['nom'], data['adresse'], data['telephone'], data['email']))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Propriétaire ajouté'}), 201
