sequenceDiagram
participant Admin
participant Serveur
participant Provider

Admin->>Serveur: Se connecter
Admin->>Serveur: Naviguer sur /providers
Admin->>Serveur: Créer un nouveau provider
Admin->>Serveur: Sélectionner Twitch dans la liste
Admin->>Serveur: Remplir les informations pour Twitch
Admin->>Serveur: Sauvegarder
Serveur->>Provider: Enregistrer les informations du provider
Serveur->>Admin: Confirmation de l'ajout du provider
