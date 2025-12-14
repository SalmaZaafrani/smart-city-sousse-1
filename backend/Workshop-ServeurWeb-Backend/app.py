from flask import Flask
from database import init_db

# Import des blueprints
from routes.capteurs import capteurs_bp
from routes.proprietaires import proprietaires_bp
from routes.techniciens import techniciens_bp
from routes.interventions import interventions_bp
from routes.citoyens import citoyens_bp
from routes.vehicules import vehicules_bp
from routes.trajets import trajets_bp
from routes.kpi import kpi_bp
from seed import seed_data
app = Flask(__name__)
seed_data()

# Initialiser MySQL
init_db(app)

# Enregistrer les routes
app.register_blueprint(capteurs_bp, url_prefix='/capteurs')
app.register_blueprint(proprietaires_bp, url_prefix='/proprietaires')
app.register_blueprint(techniciens_bp, url_prefix='/techniciens')
app.register_blueprint(interventions_bp, url_prefix='/interventions')
app.register_blueprint(citoyens_bp, url_prefix='/citoyens')
app.register_blueprint(vehicules_bp, url_prefix='/vehicules')
app.register_blueprint(trajets_bp, url_prefix='/trajets')
app.register_blueprint(kpi_bp)
# Route de test
@app.route('/')
def home():
    return "Smart City API is running 🚀"

if __name__ == '__main__':
    # Lancer le serveur Flask
    app.run(debug=True)
