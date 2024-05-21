sequenceDiagram
participant Admin
participant Serveur
participant Queue
participant QueueItem
participant Video
participant VideoEncoder

Admin->>Serveur: Ajouter une vidéo à la queue
Serveur->>Queue: Trouver ou créer une queue active
Queue->>QueueItem: Créer un nouvel item dans la queue
QueueItem->>Serveur: Retourner l'item de la queue
Serveur->>Admin: Confirmer l'ajout à la queue

Note over Queue: Traitement en arrière-plan

loop Jusqu'à ce que tous les items soient traités
Queue->>QueueItem: Récupérer le prochain item 'pending'
alt Aucun item 'pending'
Note over Queue: Attendre de nouveaux items
else Item 'pending' trouvé
Queue->>QueueItem: Mettre à jour le statut à 'processing'
QueueItem->>Video: Récupérer la vidéo associée
Video->>QueueItem: Retourner la vidéo
Queue->>VideoEncoder: Encoder la vidéo
alt Encodage réussi
VideoEncoder->>Video: Mettre à jour le chemin de la vidéo
Video->>QueueItem: Mettre à jour le statut à 'completed'
QueueItem->>Queue: Décrémenter le compteur d'encodage en cours
else Erreur d'encodage
VideoEncoder->>QueueItem: Mettre à jour le statut à 'failed'
QueueItem->>Queue: Décrémenter le compteur d'encodage en cours
end
Queue->>Queue: Continuer avec le prochain item
end
end

Serveur->>Admin: Notification de l'achèvement de la tâche (si nécessaire)
