class Capteur:
    def __init__(self, uuid, type, localisation, statut, proprietaire_id, date_installation):
        self.uuid = uuid
        self.type = type
        self.localisation = localisation
        self.statut = statut
        self.proprietaire_id = proprietaire_id
        self.date_installation = date_installation
