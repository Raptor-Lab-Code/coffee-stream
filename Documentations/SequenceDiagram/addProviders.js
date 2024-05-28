sequenceDiagram
participant Admin
participant Client
participant Serveur
participant Provider
participant Database

Admin->>+Client: Se connecter
Admin->>+Client: Naviguer sur /providers/Create
Admin->>+Client: Créer un nouveau provider
Admin->>+Client: Sélectionner provider dans la liste (ex. Twitch)
Admin->>+Client: Remplir les informations pour Twitch
Client->>+Serveur: Envoyer les informations du provider
Serveur->>Provider: Vérifier les informations du provider
Provider->>+Database : Check provider existe en base de donnée
alt Provider existe déjà
Provider->>Serveur: Retourner une erreur
Serveur->>Admin: Afficher un message d'erreur
else Provider n'existe pas
Provider->>+Database: Enregistrer les informations du provider
Database->>+Serveur: Confirmer l'enregistrement
Serveur->>Admin: Confirmation de l'ajout du provider
end
