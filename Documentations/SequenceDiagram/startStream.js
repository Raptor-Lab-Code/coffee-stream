sequenceDiagram
participant Admin
participant Serveur
participant Timeline
participant Video
participant Stream
participant Provider

Admin->>Serveur: Se connecter
Admin->>Serveur: Naviguer sur /streams
Admin->>Serveur: Créer un nouveau stream
Admin->>Serveur: Remplir les informations du formulaire
Admin->>Timeline: Sélectionner la timeline
Admin->>Serveur: Sélectionner les providers et définir le provider primaire
Admin->>Stream: Lancer le stream
Stream->>Provider: Diffuser sur le provider primaire
Stream->>Serveur: Déclencher un timer callback à la fin de la durée vidéo
alt Stream uptime > 28h
alt Stream uptime > 7 jours
Serveur->>Stream: Attendre la fin de la vidéo en cours
Serveur->>Timeline: Générer un nouveau fichier de timeline avec la suite des vidéos
Server->>Serveur: Redémarrer le serveur
Serveur->>Stream: Relancer le stream avec le nouveau fichier de timeline
end
alt La suite de la timeline dure plus de 28h ?
    Serveur->>Timeline: Générer un nouveau fichier de timeline avec la suite des vidéos
else
Serveur->>Timeline: Générer un nouveau fichier de timeline avec la suite des vidéos en ajouter la timeline initial
end
Serveur->>Stream: Relancer le stream avec le nouveau fichier de timeline
end
Video->>Stream: Fin de la vidéo en cours de diffusion

Stream->>Serveur: Déclencher callback fin de la vidéo
Serveur->>Video: Récupérer la durée de la nouvelle vidéo
Video->>Stream: Mettre à jour les informations sur le stream
