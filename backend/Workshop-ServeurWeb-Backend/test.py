from firebase_admin import credentials, db, initialize_app

# Initialiser Firebase avec ta clé
cred = credentials.Certificate("firebase_key.json")
initialize_app(cred, {
    'databaseURL': 'https://workshop-d3ea2-default-rtdb.europe-west1.firebasedatabase.app'
})

# Créer une référence vers un chemin
ref = db.reference('makeup/1')

# Ajouter ou mettre à jour les données
ref.set({
    "student_id": 1,
    "session_id": 3,
    "new_date": "2025-03-10 10:00",
    "reason": "Absent pour maladie"
})

# Lire les données
data = ref.get()
print(data)
