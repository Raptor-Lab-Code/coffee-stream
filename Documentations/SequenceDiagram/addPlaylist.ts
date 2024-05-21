sequenceDiagram
participant Admin
participant Serveur
participant Playlist
participant Vidéo

Admin->>Serveur: Se connecter
Admin->>Serveur: Naviguer sur /playlists
Admin->>Serveur: Créer une nouvelle playlist
Admin->>Serveur: Ajouter les informations de la playlist
Admin->>Serveur: Ajouter des vidéos publiées à la playlist
Admin->>Serveur: Réorganiser les vidéos dans la playlist
alt Supprimer une vidéo
Admin->>Serveur: Supprimer la vidéo de la playlist
Serveur->>Playlist: Mettre à jour la playlist
end
Admin->>Serveur: Sauvegarder la playlist
Serveur->>Playlist: Enregistrer la nouvelle playlist
Serveur->>Admin: Confirmation de la création de la playlist
