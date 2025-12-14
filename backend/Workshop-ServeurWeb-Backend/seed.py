from database import get_db

def seed_data():
    db = get_db()
    cursor = db.cursor()

    # =========================
    # 1️⃣ PROPRIETAIRES
    # =========================
    cursor.execute("SELECT COUNT(*) FROM proprietaires")
    if cursor.fetchone()[0] == 0:
        proprietaires = [
            ("Municipalité de Sousse", "Centre Ville", "73 000 000", "contact@sousse.tn"),
            ("GreenTech Partner", "Zone Industrielle", "70 111 222", "info@greentech.tn")
        ]
        cursor.executemany(
            """
            INSERT INTO proprietaires (nom, adresse, telephone, email)
            VALUES (%s, %s, %s, %s)
            """,
            proprietaires
        )

    # =========================
    # 2️⃣ CAPTEURS
    # =========================
    cursor.execute("SELECT COUNT(*) FROM capteurs")
    if cursor.fetchone()[0] == 0:
        capteurs = [
            ("AQ-001", "air_quality", "Médina", "active", 1, "2024-01-10"),
            ("AQ-002", "air_quality", "Port El Kantaoui", "active", 1, "2024-01-11"),
            ("TR-001", "traffic", "Centre Ville", "active", 2, "2024-01-12"),
            ("EN-001", "energy", "Hammam Sousse", "maintenance", 2, "2024-01-13"),
            ("WS-001", "waste", "Sahloul", "active", 1, "2024-01-14")
        ]
        cursor.executemany(
            """
            INSERT INTO capteurs
            (uuid, type, localisation, statut, proprietaire_id, date_installation)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            capteurs
        )

    # =========================
    # 3️⃣ TECHNICIENS
    # =========================
    cursor.execute("SELECT COUNT(*) FROM techniciens")
    if cursor.fetchone()[0] == 0:
        techniciens = [
            ("Ben Ali", "Ahmed", "Capteurs IoT"),
            ("Trabelsi", "Sana", "Maintenance prédictive"),
            ("Gharbi", "Youssef", "Systèmes intelligents")
        ]
        cursor.executemany(
            """
            INSERT INTO techniciens (nom, prenom, certification)
            VALUES (%s, %s, %s)
            """,
            techniciens
        )

    # =========================
    # 4️⃣ INTERVENTIONS
    # =========================
    cursor.execute("SELECT COUNT(*) FROM interventions")
    if cursor.fetchone()[0] == 0:
        interventions = [
            (1, 1, 2, "2024-02-01 10:30:00", "corrective", 60, 150.00, 12.5),
            (2, 2, 3, "2024-02-05 09:00:00", "predictive", 45, 100.00, 8.0)
        ]
        cursor.executemany(
            """
            INSERT INTO interventions
            (capteur_id, technicien_id, valide_par_id, date_heure, nature, duree, cout, impact_co2)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            interventions
        )

    # =========================
    # 5️⃣ CITOYENS
    # =========================
    cursor.execute("SELECT COUNT(*) FROM citoyens")
    if cursor.fetchone()[0] == 0:
        citoyens = [
            ("Chaabane", "Meriem", "Sahloul", "25 111 222", "meriem@mail.tn", 80, "transport public"),
            ("Haddad", "Ali", "Jawhara", "22 333 444", "ali@mail.tn", 60, "vélo"),
            ("Khalfallah", "Nour", "Médina", "28 999 888", "nour@mail.tn", 90, "marche")
        ]
        cursor.executemany(
            """
            INSERT INTO citoyens
            (nom, prenom, adresse, telephone, email, score_engagement, preferences_mobilite)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            citoyens
        )

    # =========================
    # 6️⃣ VEHICULES
    # =========================
    cursor.execute("SELECT COUNT(*) FROM vehicules")
    if cursor.fetchone()[0] == 0:
        vehicules = [
            ("123 TUN 4567", "garbage_truck", 45.2, 128.5),
            ("234 TUN 5678", "street_sweeper", 32.8, 89.3),
            ("345 TUN 6789", "patrol", 28.5, 72.1),
            ("456 TUN 7890", "shuttle", 58.9, 156.8)
        ]
        cursor.executemany(
            """
            INSERT INTO vehicules
            (plaque, type, energie_utilisee, co2_sauve)
            VALUES (%s, %s, %s, %s)
            """,
            vehicules
        )

    # =========================
    # 7️⃣ TRAJETS
    # =========================
    cursor.execute("SELECT COUNT(*) FROM trajets")
    if cursor.fetchone()[0] == 0:
        trajets = [
            (1, "Médina", "Décharge Sousse", 35, 18.5),
            (1, "Décharge Sousse", "Sahloul", 40, 20.2),
            (2, "Jawhara", "Centre Ville", 25, 10.0),
            (3, "Commissariat", "Port El Kantaoui", 30, 14.8)
        ]
        cursor.executemany(
            """
            INSERT INTO trajets
            (vehicule_id, origine, destination, duree, economie_co2)
            VALUES (%s, %s, %s, %s, %s)
            """,
            trajets
        )

    db.commit()
    cursor.close()
    db.close()

    print("✅ Données d'exemple insérées avec succès")
