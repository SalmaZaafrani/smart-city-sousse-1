class Intervention:
    def __init__(
        self,
        id,
        capteur_uuid,
        technicien_intervenant_id,
        technicien_validateur_id,
        type_intervention,
        date_intervention,
        duree,
        cout,
        impact_co2
    ):
        self.id = id
        self.capteur_uuid = capteur_uuid
        self.technicien_intervenant_id = technicien_intervenant_id
        self.technicien_validateur_id = technicien_validateur_id
        self.type_intervention = type_intervention
        self.date_intervention = date_intervention
        self.duree = duree
        self.cout = cout
        self.impact_co2 = impact_co2
