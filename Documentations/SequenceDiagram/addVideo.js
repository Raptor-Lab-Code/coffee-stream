sequenceDiagram
participant Admin
participant Client
participant Serveur
participant Video
participant Queue
participant VideoEncoding

Admin->>+Client: Se connecter
Admin->>+Client: Naviguer sur /videos/create
Admin->>+Client: Remplir le formulaire (titre, description, etc.)
Admin->>+Client: Confirmer la vidéo
Client->>+Serveur: Envoyer les informations et la vidéo
Serveur->>+Video: Check si la vidéo est dans le bon format
alt La vidéo est déjà dans le bon format
Video->>Serveur: Déplacer la vidéo dans le dossier public
Video->>+Database: Sauvegarder en base de données
else La vidéo n'est pas dans le bon format
Serveur->>+Queue: Envoyer la vidéo dans la file d'encodage
Queue->>+VideoEncoding: Lancer l'encodage de la vidéo
VideoEncoding->>Queue: Confirmer l'encodage terminé
Queue->>Serveur: Informer que l'encodage est terminé
Serveur->>+Video: Déplacer la vidéo encodée dans le dossier public
Video->>+Database: Sauvegarder en base de données
end
Serveur->>Admin: Confirmation de l'ajout de la vidéo
