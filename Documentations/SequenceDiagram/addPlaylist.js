sequenceDiagram
participant Admin
participant Client
participant Serveur
participant Playlist
participant Database

Admin->>+Client: Se connecter
Admin->>+Client: Naviguer sur /playlists/create
Admin->>+Client: Ajouter les informations de la playlist
Admin->>+Client: Ajouter des vidéos à la playlist
Admin->>+Client: Réorganiser les vidéos dans la playlist
alt Supprimer une Video dans la playlist
Admin->>+Client: Supprimer la vidéo de la playlist
end
Admin->>+Client: Sauvegarder la playlist
Client->>+Serveur: Envoyer les informations de la playlist
loop Pour chaque vidéo dans la playlist
Serveur->>+Database: Check vidéo existe en base de données
end
Serveur->>+Playlist: Enregistrer la nouvelle playlist
Playlist->>+Database: Sauvegarder la playlist en base de données
Database->>-Serveur: Confirmer l'enregistrement
Serveur->>Admin: Confirmation de la création de la playlist
