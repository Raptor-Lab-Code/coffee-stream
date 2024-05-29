sequenceDiagram
participant Admin
participant Client
participant Serveur
participant Timeline
participant Database

Admin->>+Client: Se connecter
Admin->>+Client: Naviguer sur /timelines/create
Admin->>+Client: Ajouter les informations de la timeline
alt Ajouter des vidéos à la timeline
Admin->>+Client: Ajouter des vidéos à la timeline
else Ajouter des playlists à la timeline
Admin->>+Client: Ajouter des playlists à la timeline
end
Admin->>+Client: Réorganiser l'ordre des vidéos/playlists
alt Supprimer une vidéo/playlist de la timeline
Admin->>+Client: Supprimer une vidéo/playlist de la timeline
end
Admin->>+Client: Sauvegarder la timeline
Client->>Serveur: Envoyer les informations de la timeline
alt Vérifier les éléments de la timeline
Serveur->>+Database: Vérifier l'existence des vidéos/playlists
alt Les éléments existent
Database->>+Serveur: Les éléments existent
Serveur->>+Timeline: Créer une nouvelle entrée de timeline
Timeline->>+Database: Enregistrer la nouvelle timeline
Timeline->>-Serveur: Confirmer l'enregistrement
Serveur->>Admin: Confirmation de la création de la timeline
else Les éléments n'existent pas
Database->>Serveur: Erreur - Élément(s) manquant(s)
Serveur->>Admin: Erreur - Élément(s) manquant(s)
end
else Erreur - Pas d'éléments dans la timeline
Serveur->>Admin: Erreur - Pas d'éléments dans la timeline
end


// v2


sequenceDiagram
participant Admin
participant Client
participant Serveur
participant Timeline
participant TimelineItem
participant Database

Admin->>+Client: Se connecter
Admin->>+Client: Naviguer sur /timelines/create
Admin->>+Client: Ajouter les informations de la timeline
Admin->>+Client: Ajouter des éléments (vidéos ou playlists) à la timeline
Client->>+Serveur: Envoyer les informations de la timeline
Serveur->>+Timeline: Créer une nouvelle entrée de timeline
Timeline->>+Database: Enregistrer les informations de la timeline
loop Pour chaque élément dans la playlist
alt Type de l'élément est "video"
Serveur->>Database: Vérifier l'existence de la vidéo
Database->>Serveur: Confirmer l'existence de la vidéo
Serveur->>TimelineItem: Créer un nouvel élément de timeline
TimelineItem->>Database: Enregistrer l'élément de timeline
Database->>TimelineItem: Confirmer l'enregistrement de l'élément de timeline
else Type de l'élément est "playlist"
Serveur->>+Database: Vérifier l'existence de la playlist
Database->>Serveur: Confirmer l'existence de la playlist
Serveur->>TimelineItem: Créer un nouvel élément de timeline
TimelineItem->>Database: Enregistrer l'élément de timeline
end

Serveur->>Timeline: Générer le fichier de playlist m3u8
Timeline->>Database: Enregistrer le chemin du fichier de playlist
Database->>Serveur: Confirmer l'enregistrement
end
Serveur->>Admin: Confirmation de la création de la timeline
