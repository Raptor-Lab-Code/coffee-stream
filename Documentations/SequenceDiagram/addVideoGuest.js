sequenceDiagram
participant Guest
participant Client
participant Serveur
participant Vidéo
participant Database

Guest->>+Client: Accéder à la page de téléchargement
Guest->>+Client: Remplir les informations (username, email, comptes réseaux sociaux)
Guest->>+Client: Télécharger la vidéo
Client->>+Serveur: Envoyer les informations et la vidéo
Serveur->>+Database: Vérifier si le guest existe déjà
alt Guest existe déjà
Database->>Serveur: Retourne les informations du guest existant
Serveur->>Database: Associer la vidéo à l'utilisateur existant
else Guest n'existe pas
Serveur->>Database: Créer un nouveau Guest
Database->>Serveur: Confirme la création du guest
end
Serveur->>+Vidéo: Déplacer la vidéo dans le dossier public "videos/pending"
Serveur->>+Database: Créer une nouvelle entrée vidéo avec le statut "pending"
Database->>Serveur: Confirme la création de l'entrée vidéo
Serveur->>Guest: Confirmation de l'ajout de la vidéo
Vidéo->>-Serveur: Terminer l'opération de déplacement de la vidéo
Database->>-Serveur: Terminer la vérification du guest
Serveur->>-Client: Fin de la vérification du guest
Client->>-Guest: Fin du processus d'upload
