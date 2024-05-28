sequenceDiagram
participant User
participant Client
participant Server
participant Database

User->>+Client: Fournit les informations d'identification (email, mot de passe)
Client->>+Server: Envoie les informations d'identification via POST /auth/login
Server->>+Database: Vérifie les informations d'identification dans la base de données
Database->>-Server: Retourne les informations de l'utilisateur
Server->>Server: Génère un token JWT
Server->>-Client: Retourne le token JWT
Client->>-User: Stocke le token et confirme la connexion


sequenceDiagram
participant User
participant Client
participant Server
participant Database

User->>+Client: Se déconnecte
Client->>+Server: Envoie une requête de déconnexion via POST /auth/logout
Server->>+Database: Invalide le token dans la base de données
Database->>-Server: Confirme l'invalidation
Server->>-Client: Confirme la déconnexion
Client->>-User: Confirme la déconnexion


sequenceDiagram
participant User
participant Client
participant Server
participant Database

User->>+Client: Effectue une requête authentifiée
Client->>+Server: Envoie le token JWT via l'en-tête Authorization
Server->>Server: Vérifie le token JWT
alt Token expiré ou invalide
Server->>+Database: Vérifie l'état du token dans la base de données
Database->>Server: Confirme que le token a expiré
Server->>Client: Retourne une erreur 401 Unauthorized
Client->>User: Affiche un message d'erreur
else Token valide
Server->>Client: Retourne les données demandées
end
