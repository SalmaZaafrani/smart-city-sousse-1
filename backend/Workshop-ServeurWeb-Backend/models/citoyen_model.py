class Citoyen:
    def __init__(
        self,
        id,
        nom,
        adresse,
        email,
        telephone,
        score_ecologique,
        preferences_mobilite
    ):
        self.id = id
        self.nom = nom
        self.adresse = adresse
        self.email = email
        self.telephone = telephone
        self.score_ecologique = score_ecologique
        self.preferences_mobilite = preferences_mobilite
