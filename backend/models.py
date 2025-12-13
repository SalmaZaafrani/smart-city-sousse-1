# models.py
from flask_mysqldb import MySQL

mysql = MySQL()

def get_capteurs():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM capteurs")
    result = cur.fetchall()
    cur.close()
    return result

def get_vehicules():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM vehicules")
    result = cur.fetchall()
    cur.close()
    return result

def get_citoyens():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM citoyens")
    result = cur.fetchall()
    cur.close()
    return result
