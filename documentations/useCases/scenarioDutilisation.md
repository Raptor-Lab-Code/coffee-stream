# Scénario d'utilisation du système

1. [Upload une vidéo par un guest](#upload-une-vidéo-par-un-guest)
2. [Créer un utilisateur autorisé](#créer-un-utilisateur-autorisé)
3. [Créer une nouvelle vidéo](#créer-une-nouvelle-vidéo)
4. [Créer une nouvelle playlist](#créer-une-nouvelle-playlist)
5. [Créer une nouvelle timeline](#créer-une-nouvelle-timeline)
6. [Créer un nouveau provider](#créer-un-nouveau-provider)
7. [Lancer un stream en direct sur un provider](#lancer-un-stream-en-direct-sur-un-provider)
8. [Valider une vidéo uploadée par un guest](#valider-une-vidéo-uploadée-par-un-guest)


## 1. Cas d'utilisation: Upload une vidéo par un guest
### Acteur principal: Guest
### Préconditions: Aucun
#### scénario : 
L'utilisateur se rend sur la page d'upload de vidéo, fournit des informations sur la vidéo comme son titre, sa catégorie, son pseudo et choisit le fichier à uploader. Il clique sur le bouton d'upload et la vidéo est envoyée sur le système. L'utilisateur reçoit un message de confirmation du système pour l'upload.

## 2. Cas d'utilisation: Créer un utilisateur autorisé
### Acteur principal: Utilisateur
### Préconditions: L'utilisateur est connecté à son compte
### scénario :
L'utilisateur authentifié se rend sur la page de gestion des utilisateurs autorisés, il fournit les informations nécessaires pour créer un nouveau guest autorisé comme son pseudo sur les réseaux sociaux ou Steam et si le guest a accepté d'être diffusé. l'utilisateur authentifié clique sur le bouton de validation et le système crée le guest autorisé.

## 3. Cas d'utilisation: Créer une nouvelle vidéo
### Acteur principal: Utilisateur
### Préconditions: L'utilisateur est connecté à son compte, l'utilisateur prossède une vidéo
### scénario :
L'utilisateur authentifié se rend sur la page de gestion des vidéos, il fournit les informations nécessaires pour créer une nouvelle vidéo comme son titre, sa catégorie, sa description, le fichier de la vidéo, si la vidéos est associé à un guest autorisé. l'utilisateur clique sur le bouton de validation et la vidéo est envoyé sur le système pour traitement.

## 4. Cas d'utilisation: Créer une nouvelle playlist
### Acteur principal: Utilisateur
### Préconditions: L'utilisateur est connecté à son compte
### scénario :
L'utilisateur authentifié se rend sur la page de gestion des playlists, il fournit les informations nécessaires pour créer une nouvelle playlist comme son titre, sa description et les vidéos qui la compose. L'utilsateur peut réarranger sa playlist en glissant les vidéos. l'utilisateur clique sur le bouton de validation et la playlist est créée.

## 5. Cas d'utilisation: Créer une nouvelle timeline
### Acteur principal: Utilisateur
### Préconditions: L'utilisateur est connecté à son compte
### scénario :
L'utilisateur authentifié se rend sur la page de gestion des timelines, il fournit les informations nécessaires pour créer une nouvelle timeline comme son titre. L'utilisateur peut piocher dans la liste de playlist précédemment créer ou ajouter directement des vidéos. L'utilisateur voit des informations sur la durée de lecture et peut choisir quels est la vidéo de transition, d'intro et outro. l'utilisateur clique sur le bouton de validation et la timeline est créée.

## 6. Cas d'utilisation: Créer un nouveau provider
### Acteur principal: Utilisateur
### Préconditions: L'utilisateur est connecté à son compte
### scénario :
L'utilisateur authentifié se rend sur la page de gestion des providers, il fournit les informations nécessaires pour créer un nouveau provider comme son nom, son url, son token, son lien RTMP, ses informations d'API. L'utilisateur clique sur le bouton de validation et le provider est créé.

## 7. Cas d'utilisation: Lancer un stream en direct sur un provider
### Acteur principal: Utilisateur
### Préconditions: L'utilisateur est connecté à son compte
### scénario :
L'utilisateur authentifié se rend sur la page de gestion des providers, il choisit le(s) provider(s) sur lequel il veut streamer définit si les providers sur lequel diffuser en live. L'utilisateur remplit les informations sur le stream comme la timeline a utilisé, le temps avant restart de l'instance, le bitrate et la résolution. L'utilisateur clique sur le bouton de validation et le stream est lancé.

## 8. Cas d'utilisation: Valider une vidéo uploadée par un guest
### Acteur principal: Utilisateur, Guest
### Préconditions: L'utilisateur est connecté à son compte, une vidéo a été uploadée par un guest
### scénario :
L'utilisateur authentifié se rend sur la page de gestion des vidéos et clique sur le lien pour accéder aux vidéos à vérifier. Il voit la vidéo uploadée par le guest, il peut voir les informations de la vidéo et la valider pour qu'elle soit visible dans la liste des vidéos à choix pour créer une playlist ou une timeline. La vidéo est envoyé dans le système pour traitement si nécessaire.
