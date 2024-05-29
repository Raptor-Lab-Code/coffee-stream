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

    // v2

sequenceDiagram
participant Guest(visitor)
participant Client
participant Serveur
participant Guest
participant Video
participant Database

Guest(visitor)->>+Client: Accéder à la page de téléchargement
Guest(visitor)->>+Client: Remplir les informations (username, email, comptes réseaux sociaux)
Guest(visitor)->>Client: Résoudre le Captcha
Client->>+Guest(visitor): Captcha résolu
Client->>Serveur: Envoyer les informations avec la vidéo
Serveur->>Database: Vérifier si le Guest existe déjà (GET /guests)
alt Guest existe déjà avec le même email mais un pseudo différent
Serveur->>Guest(visitor): Erreur - Email existe, mais informations du compte non conformes
else if Guest existe déjà et l'IP correspond
Serveur->>Video: Associer la vidéo à l'utilisateur existant
else if Guest existe déjà mais l'IP ne correspond pas
Serveur->>Guest: Créer un nouveau Guest avec un pseudo hashé
else Guest n'existe pas
Serveur->>Guest: Créer un nouveau Guest
end
Client->>Serveur: Télécharger la vidéo
Serveur->>Video: Créer une nouvelle entrée vidéo avec le statut "pending"
Serveur->>Database: Sauvegarder les informations de la vidéo
Serveur->>Guest(visitor): Confirmation de l'ajout de la vidéo
