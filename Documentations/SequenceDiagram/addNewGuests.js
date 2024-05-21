sequenceDiagram
participant Admin
participant Serveur
participant Autorisation

Admin->>Serveur: Se connecter
Admin->>Serveur: Naviguer sur /authorises
Admin->>Serveur: Créer un nouvel utilisateur autorisé
Admin->>Serveur: Remplir le formulaire
Admin->>Serveur: Sauvegarder
Serveur->>Autorisation: Enregistrer les informations de l'utilisateur autorisé
Serveur->>Admin: Confirmation de l'ajout de l'utilisateur autorisé
