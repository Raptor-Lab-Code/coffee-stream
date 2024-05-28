sequenceDiagram
participant Admin
participant Client
participant Serveur
participant Database

Admin->>+Client: Se connecter
Admin->>+Client: Naviguer sur /authorises
Admin->>+Client: Créer un nouvel utilisateur autorisé
Admin->>+Client: Remplir le formulaire
Admin->>+Client: Sauvegarder
Client->>+Serveur: Envoyer les informations du nouvel utilisateur autorisé
Serveur->>+Database: Enregistrer les informations de l'utilisateur autorisé
Database->>-Serveur: Confirme l'enregistrement des informations
Serveur->>Admin: Confirmation de l'ajout de l'utilisateur autorisé
Client->>-Admin: Fin du processus d'ajout
