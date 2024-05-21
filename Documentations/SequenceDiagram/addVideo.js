sequenceDiagram
participant Admin
participant Serveur
participant Video
participant Queue
participant VideoEncoding

Admin->>Serveur: Se connecter
Admin->>Serveur: Naviguer sur /videos
Admin->>Serveur: Créer une nouvelle vidéo
Admin->>Serveur: Remplir le formulaire (titre, desccription,..)
Admin->>Serveur: Ajouter la vidéo dans l'input
Admin->>Serveur: Ajouter l'utilisateur
Admin->>Serveur: Confirmer la vidéo
Serveur->>Video: Créer une nouvelle entrée vidéo
alt La video est deja dans le bon format ?
    Video->>Serveur: Déplacer dans la vidéo dans le dossier public
Video->>Serveur: Sauvegarder ne base de donnée
else
Serveur->>Queue: Envoyer la vidéo dans la file d'encodage
end
Serveur->>Admin: Confirmation de l'ajout de la vidéo