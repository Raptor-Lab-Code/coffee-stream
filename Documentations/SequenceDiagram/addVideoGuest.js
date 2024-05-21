sequenceDiagram
    participant Guest
    participant Serveur
    participant Vidéo

    Guest->>Serveur: Accéder à la page de téléchargement
    Guest->>Serveur: Remplir les informations (username, email, comptes réseaux sociaux)
    Serveur->>Serveur: Vérifier si le guest existe déjà
    alt Guest existe déjà
        Serveur->>Guest: Associer la vidéo à l'utilisateur existant
    else Guest n'existe pas
        Serveur->>Guest: Créer un nouveau Guest
    end
    Guest->>Serveur: Télécharger la vidéo
    Serveur->>Serveur: Déplacer la vidéo dans le dossier public "videos/pending"
    Serveur->>Vidéo: Créer une nouvelle entrée vidéo avec le statut "pending"
    Serveur->>Guest: Confirmation de l'ajout de la vidéo
