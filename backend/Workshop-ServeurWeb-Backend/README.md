# 🧠 Workshop : Gestion des Sessions, Absences et Rattrapages avec FastAPI, SQLModel & Firebase

Ce workshop a pour objectif d'apprendre à construire une **API backend complète** permettant de gérer les enseignants, les étudiants, les sessions d’enseignement, les absences et les sessions de rattrapage.  
Le projet utilise une architecture professionnelle et des technologies modernes telles que **FastAPI**, **SQLModel**, **MySQL** et **Firebase Realtime Database**.

## 🚀 Technologies utilisées
- **FastAPI** – Framework rapide pour créer des API REST
- **SQLModel** – ORM moderne basé sur Pydantic + SQLAlchemy
- **MySQL** – Base de données relationnelle
- **Firebase Realtime Database** – Stockage en temps réel pour les rattrapages
- **Python 3.10+**

## 🎯 Objectifs du Workshop
- Comprendre le fonctionnement d’une API REST
- Manipuler MySQL à travers SQLModel
- Gérer les relations entre les différents modèles (Teacher, Student, Session, Absence, MakeUpSession)
- Enregistrer automatiquement les données des rattrapages dans Firebase
- Organiser un projet backend de manière propre et scalable

## 🏗 Architecture du Projet
```
project/
│── models/
│ ├── student.py
│ ├── teacher.py
│ ├── session.py
│ └── makeup.py
│
│── routes/
│ ├── student_routes.py
│ ├── teacher_routes.py
│ ├── session_routes.py
│ └── makeup_routes.py
│
│── firebase_config.py
│── database.py
│── main.py
```

## 🔁 Fonctionnalité principale : Rattrapage
Lorsqu'une session de rattrapage est créée, elle est :
- enregistrée dans **MySQL** via SQLModel
- envoyée automatiquement dans **Firebase Realtime Database**, en temps réel

Exemple d’objet envoyé :
```json
{
  "student_id": 1,
  "session_id": 3,
  "new_date": "2025-03-10 10:00",
  "reason": "Absent pour maladie"
}
```

Ce workshop est destiné aux étudiants, développeurs débutants en FastAPI, et toute personne souhaitant apprendre à construire un backend professionnel.

## ▶️ Comment exécuter le projet (RUN THE PROJECT)

Suivez les étapes ci-dessous pour lancer l’API sur votre machine :

---

### 1️⃣ Cloner le projet
```bash
git clone [https://github.com/ton-compte/workshop-fastapi.git](https://github.com/Helmisoudana/Workshop-ServeurWeb-Backend)
cd workshop-fastapi
```
### 2️⃣ Créer un environnement virtuel
Windows :

```bash
python -m venv venv
venv\Scripts\activate
```
Linux / macOS :
```bash
python3 -m venv venv
source venv/bin/activate
```
### 3️⃣ Installer les dépendances
```bash
pip install -r requirements.txt
```
### 4️⃣ Configurer la base MySQL
Créer une base :
```bash
CREATE DATABASE eniso;
```
Modifier database.py si nécessaire :

```bash
DATABASE_URL = "mysql+mysqlconnector://root:password@localhost:3306/eniso"
```
### 5️⃣ Ajouter la clé Firebase
Placez votre fichier :
```bash
firebase_key.json
```
à la racine du projet, puis vérifiez firebase_config.py :
```bash
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://YOUR_PROJECT_ID.firebaseio.com"
})
```
### 6️⃣ Lancer le serveur FastAPI 🚀
```bash
uvicorn main:app --reload
```
### 7️⃣ Tester l’API

Ouvrir Swagger UI :

👉 http://127.0.0.1:8000/docs

Vous y trouverez tous les endpoints CRUD prêts à être testés.

### 📬 Support

Si vous souhaitez améliorer ce workshop ou signaler un bug :

➡️ Ouvrez une issue ou envoyez un pull request dans ce repo.
