from flask_mysqldb import MySQL

mysql = MySQL()

def init_db(app):
    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = '53641565Salma'
    app.config['MYSQL_DB'] = 'smart_city'
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
    mysql.init_app(app)
