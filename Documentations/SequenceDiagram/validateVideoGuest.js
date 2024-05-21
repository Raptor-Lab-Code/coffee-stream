sequenceDiagram
participant Admin
participant Serveur
participant Video
participant Queue

Admin->>Serveur: Naviguer sur /videos/validate
Admin->>Serveur: Clic sur la vidéo pour voir les informations
alt Informations vidéo non conformes
Admin->>Serveur: Editer les informations de la vidéo
end
Admin->>Serveur: Cocher les vidéos acceptées
alt Video acceptée
Serveur->>Video: Mettre à jour le statut de la vidéo à "accepted"
Serveur->>Queue: Ajouter la vidéo dans la queue d'encodage
else Video déclinée
Serveur->>Video: Mettre à jour le statut de la vidéo à "declined"
Serveur->>Video: Supprimer la vidéo dans le dossier public/pending
end
Serveur->>Admin: Confirmer la validation des vidéos