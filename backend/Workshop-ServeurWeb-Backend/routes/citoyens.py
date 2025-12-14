from flask import Blueprint, request, jsonify
from models.db import mysql

citoyens_bp = Blueprint('citoyens', __name__)

@citoyens_bp.route('/citoyens', methods=['GET'])
def get_citoyens():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM citoyens")
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

@citoyens_bp.route('/citoyens', methods=['POST'])
def add_citoyen():
    data = request.get_json()
    cur = mysql.connection.cursor()
    sql = """INSERT INTO citoyens 
             (nom, adresse, email, telephone, score_ecologique, preferences_mobilite) 
             VALUES (%s,%s,%s,%s,%s,%s)"""
    cur.execute(sql, (
        data['nom'],
        data['adresse'],
        data['email'],
        data['telephone'],
        data['score_ecologique'],
        data['preferences_mobilite']
    ))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message':'Citoyen ajouté'}), 201
