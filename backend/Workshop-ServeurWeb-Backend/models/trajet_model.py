class Trajet:
    def __init__(
        self,
        id,
        vehicule_id,
        origine,
        destination,
        duree,
        economie_co2
    ):
        self.id = id
        self.vehicule_id = vehicule_id
        self.origine = origine
        self.destination = destination
        self.duree = duree
        self.economie_co2 = economie_co2
