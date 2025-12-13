from flask import Flask
from flask_cors import CORS
from config import Config
from models import mysql

from routes.sensors import sensors_bp
from routes.vehicles import vehicles_bp
from routes.citizens import citizens_bp
from routes.interventions import interventions_bp
from routes.dashboard import dashboard_bp

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
mysql.init_app(app)

app.register_blueprint(sensors_bp, url_prefix='/api/capteurs')
app.register_blueprint(vehicles_bp, url_prefix='/api/vehicules')
app.register_blueprint(citizens_bp, url_prefix='/api/citoyens')
app.register_blueprint(interventions_bp, url_prefix='/api/interventions')
app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
