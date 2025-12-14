from firebase_admin import db, initialize_app, credentials

def init_firebase():
    """
    Initialise Firebase Realtime Database si ce n'est pas déjà fait.
    """
    try:
        cred = credentials.Certificate("firebase_key.json")
        initialize_app(cred, {
            "databaseURL": "https://workshop-d3ea2-default-rtdb.europe-west1.firebasedatabase.app"
        })
    except ValueError:
        # Firebase déjà initialisé
        pass

# Appel automatique pour initialiser à l'import
init_firebase()
