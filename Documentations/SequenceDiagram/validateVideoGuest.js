sequenceDiagram
participant Admin
participant Client
participant Serveur
participant Video
participant Queue
participant Database

Admin->>+Client: Se connecter
Admin->>+Client: Naviguer sur /videos/validate
Admin->>+Client: Clic sur la vidéo pour voir les informations
Client->>+Serveur: Demander les informations de la vidéo
Serveur->>+Database: Récupérer les informations de la vidéo
Database->>-Serveur: Retourne les informations de la vidéo
Serveur->>-Client: Retourner les informations de la vidéo
alt Informations vidéo non conformes
Admin->>+Client: Editer les informations de la vidéo
Client->>+Serveur: Envoyer les informations éditées
Serveur->>+Database: Mettre à jour les informations de la vidéo
Database->>-Serveur: Confirme la mise à jour des informations
Serveur->>-Client: Confirme la mise à jour des informations
end
alt Vidéo acceptée
Admin->>+Client: Cliquer sur le bouton Accepter
Client->>+Serveur: Envoyer la demande de validation
Serveur->>+Database: Mettre à jour le statut de la vidéo à "accepted"
Database->>-Serveur: Confirme la mise à jour du statut
Serveur->>+Queue: Ajouter la vidéo dans la queue d'encodage
Queue->>-Serveur: Confirme l'ajout de la vidéo dans la queue
else Vidéo déclinée
Admin->>+Client: Cliquer sur le bouton Décliner
Client->>+Serveur: Envoyer la demande de rejet
Serveur->>+Database: Mettre à jour le statut de la vidéo à "declined"
Database->>-Serveur: Confirme la mise à jour du statut
Serveur->>+Video: Supprimer la vidéo dans le dossier public/pending
Video->>-Serveur: Confirme la suppression de la vidéo
end
Serveur->>Admin: Confirmer la validation ou le rejet de la vidéo