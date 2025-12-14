from flask import Blueprint, request, jsonify
from models.db import mysql

techniciens_bp = Blueprint('techniciens', __name__)

@techniciens_bp.route('/techniciens', methods=['GET'])
def get_techniciens():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM techniciens")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@techniciens_bp.route('/techniciens', methods=['POST'])
def add_technicien():
    data = request.get_json()
    cur = mysql.connection.cursor()
    sql = "INSERT INTO techniciens (nom, specialite, certifie) VALUES (%s,%s,%s)"
    cur.execute(sql, (data['nom'], data['specialite'], data['certifie']))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Technicien ajouté'}), 201
