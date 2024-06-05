classDiagram
class BaseModel {
<<Interface>>
+save()
+delete()
+update()
+find()
}
class AuthFinder {
<<Interface>>
+findAuth(uid: string): User
+verifyCredentials(uid: string, password: string): boolean
}
class User {
+int id
+String email
+String password
+String fullName
+DateTime lastLoginAt
}
class Guest {
+int id
+String username
+String twitch
+Video[] videos
}
class Playlist {
+int id
+String name
+String filePath
+Video[] videos
+load() Promise
}
class Video {
+int id
+Guest guest
+String title
+String path
+int duration
+bool showInNext
+bool state
+getInformation(path: string) Promise
+getDuration(path: string) Promise
+elapsedTime() Promise
+getDurationInSeconds() Promise
+getDurationInMilliseconds() Promise
}
class Timeline {
+int id
+String name
+Video[] videos
+generateFile(type: string) Promise
+getCurrentVideo() Video
+getNextVideo(showTransition: boolean) Video
+getPreviousVideo() Video
+moveToNextVideo()
+removeCurrentVideo() Promise
+getAllVideos() Video[]
}
class TimelineElements {
+int id
+Timeline timeline
+int elementId
+String elementType
+int orders
}
class Stream {
+int id
+String name
+int pid
+String status
+DateTime startTimestamp
+DateTime endTimestamp
+String parameters
+Provider[] providers
+Timeline timeline

+getUptime() Promise
+updateRunnerText() Promise
+updateNextGameText() Promise
+nextVideo() Promise
+run() Promise
+startStream(Playlist) Promise
+restartStream() Promise
+stopStream() Promise
}
class Provider {
+int id
+String name
+String type
+String clientId
+String clientSecret
+String refreshToken
+String broadcasterId
+String authBearer
+String streamKey
+bool onPrimary
+createProvider(Provider) Promise
}
class Twitch {
-static instance: Twitch
-tmi.Client client
-changeCategory(String) Promise
-changeTitle(String, Video) Promise
-changeTags(String[]) Promise
-sendChatMessage()
-refreshTokenWhenExpired() Promise
-BASE_URL_API: String
}
class Queue {
-QueueItem[] queue
-bool isEncoding
-static instance: Queue
+int id
+DateTime createdAt
+DateTime updatedAt
+add(Video, string, string) Promise
-runEncoding() Promise
-processQueue() Promise
+static getInstance() Queue
}
class QueueItem {
<<Interface>>
+Video video
+string startTimeCode
+string endTimeCode
+resolve(value: string)
+reject(reason: any)
}
class VideoEncoder {
+int id
+DateTime createdAt
+DateTime updatedAt
+static encode(Video, string, string, string) Promise
}

AuthFinder <|-- User
BaseModel <|-- User
BaseModel <|-- Playlist
BaseModel <|-- Video
BaseModel <|-- Timeline
BaseModel <|-- Stream
BaseModel <|-- Provider
Provider <|-- Twitch
BaseModel <|-- Queue
BaseModel <|-- VideoEncoder
BaseModel <|-- Guest
Queue "1" -- "*" QueueItem
QueueItem "1" -- "1" Video
VideoEncoder -- Video

User "1" *-- "*" Playlist
User "1" *-- "*" Stream
User "1" -- "*" Timeline
Playlist "1" *-- "*" Video
Timeline "1" *-- "*" TimelineElements : contains
TimelineElements "0..1" -- "0..1" Video : video
TimelineElements "0..1" -- "0..1" Playlist : playlist
Stream "1" o-- "*" Provider
Stream "1" -- "1" Timeline
Guest "*" -- "0..*" Video : videos

// v3 :
classDiagram
class BaseModel {
<<Interface>>
    +save()
    +delete()
    +update()
    +find()
}
class AuthFinder {
<<Interface>>
    +findAuth(uid: string): User
    +verifyCredentials(uid: string, password: string): boolean
}
class User {
    +int id
    +String email
    +String password
    +String fullName
    +DateTime lastLoginAt
    +DateTime createdAt
    +DateTime updatedAt
    +streams: Stream[]
}
class Guest {
    +int id
    +String username
    +String twitch
    +Video[] videos
}
class Playlist {
    +int id
    +String title
    +String description
    +boolean isPublished
    +DateTime createdAt
    +DateTime updatedAt
    +Video[] videos
    +load() Promise
}
class Video {
    +int id
    +Guest guest
    +String title
    +String path
    +int duration
    +boolean showInNext
    +boolean state
    +DateTime createdAt
    +DateTime updatedAt
    +getInformation(path: string) Promise
    +getDuration(path: string) Promise
    +elapsedTime() Promise
    +getDurationInSeconds() Promise
    +getDurationInMilliseconds() Promise
}
class Timeline {
    +int id
    +String name
    +Video[] videos
    +generateFile(type: string) Promise
    +getCurrentVideo() Video
    +getNextVideo(showTransition: boolean) Video
    +getPreviousVideo() Video
    +moveToNextVideo()
    +removeCurrentVideo() Promise
    +getAllVideos() Video[]
}
class TimelineElements {
    +int id
    +Timeline timeline
    +int elementId
    +String elementType
    +int orders
}
class Stream {
    +int id
    +String name
    +int pid
    +String status
    +DateTime startTimestamp
    +DateTime endTimestamp
    +String parameters
    +Provider[] providers
    +Timeline timeline
    +DateTime createdAt
    +DateTime updatedAt
    +getUptime() Promise
    +updateRunnerText() Promise
    +updateNextGameText() Promise
    +nextVideo() Promise
    +run() Promise
    +startStream(Playlist) Promise
    +restartStream() Promise
    +stopStream() Promise
}
class Provider {
    +int id
    +String name
    +String type
    +String clientId
    +String clientSecret
    +String refreshToken
    +String broadcasterId
    +String authBearer
    +String streamKey
    +boolean onPrimary
    +DateTime createdAt
    +DateTime updatedAt
    +createProvider(Provider) Promise
}
class Twitch {
    -static instance: Twitch
    -tmi.Client client
    -changeCategory(String) Promise
    -changeTitle(String, Video) Promise
    -changeTags(String[]) Promise
    -sendChatMessage()
    -refreshTokenWhenExpired() Promise
    -BASE_URL_API: String
}
class Queue {
    -QueueItem[] queue
    -boolean isEncoding
    -static instance: Queue
    +int id
    +String title
    +boolean active
    +int maxSlots
    +int maxConcurrent
    +DateTime createdAt
    +DateTime updatedAt
    +add(Video, string, string) Promise
    -runEncoding() Promise
    -processQueue() Promise
    +static getInstance() Queue
}
class QueueItem {
    +int id
    +int queueId
    +int videoId
    +string startTimeCode
    +string endTimeCode
    +string status
    +DateTime createdAt
    +DateTime updatedAt
    +Video video
    +resolve(value: string)
    +reject(reason: any)
}
class VideoEncoder {
    +int id
    +DateTime createdAt
    +DateTime updatedAt
    +static encode(Video, string, string, string) Promise
}

AuthFinder <|-- User
BaseModel <|-- User
BaseModel <|-- Playlist
BaseModel <|-- Video
BaseModel <|-- Timeline
BaseModel <|-- Stream
BaseModel <|-- Provider
Provider <|-- Twitch
BaseModel <|-- Queue
BaseModel <|-- VideoEncoder
BaseModel <|-- Guest
Queue "1" -- "*" QueueItem
QueueItem "1" -- "1" Video
VideoEncoder -- Video

User "1" *-- "*" Playlist
User "1" *-- "*" Stream
User "1" -- "*" Timeline
Playlist "1" *-- "*" Video
Timeline "1" *-- "*" TimelineElements : contains
TimelineElements "0..1" -- "0..1" Video : video
TimelineElements "0..1" -- "0..1" Playlist : playlist
Stream "1" o-- "*" Provider
Stream "1" -- "1" Timeline
Guest "*" -- "0..*" Video : videos


/**** UML V4 ****/
classDiagram
class AuthFinder {
<<Interface>>
    +findAuth(uid: string): User
    +verifyCredentials(uid: string, password: string): boolean
}

class User {
    +int id
    +String email
    +String password
    +String fullName
    +DateTime lastLoginAt
    +DateTime createdAt
    +DateTime updatedAt
    +streams: Stream[]
}

class Guest {
    +int id
    +String email
    +String displayName
    +String ipAddress
    +String discordUsername
    +String steamUsername
    +String twitchUsername
    +String twitterUsername
    +String youtubeUsername
    +String telegramUsername
    +int canDiffuse
    +String notes
    +DateTime createdAt
    +DateTime updatedAt
}

class GuestToken {
    +int id
    +int guestId
    +int videoId
    +String token
    +String status
    +DateTime expiresAt
    +DateTime createdAt
    +DateTime updatedAt
}

class Playlist {
    +int id
    +String title
    +String description
    +boolean isPublished
    +int userId
    +DateTime createdAt
    +DateTime updatedAt
    +videos: Video[]
}

class PlaylistVideo {
    +int id
    +int playlistId
    +int videoId
    +int order
    +DateTime createdAt
    +DateTime updatedAt
}

class Provider {
    +int id
    +String name
    +String streamKey
    +String type
    +String authBearer
    +String clientId
    +String clientSecret
    +String refreshToken
    +String accessToken
    +String broadcasterId
    +int userId
    +DateTime createdAt
    +DateTime updatedAt
}

class Queue {
    +int id
    +String title
    +boolean active
    +int maxSlots
    +int maxConcurrent
    +DateTime createdAt
    +DateTime updatedAt
    +items: QueueItem[]
}

class QueueItem {
    +int id
    +int queueId
    +int videoId
    +String startTimeCode
    +String endTimeCode
    +int attempts
    +String status
    +DateTime createdAt
    +DateTime updatedAt
}

class Stream {
    +int id
    +String name
    +int pid
    +String status
    +int restartTimes
    +int currentIndex
    +String type
    +int userId
    +int providerId
    +int timelineId
    +String overlay
    +String guestFile
    +String cryptoFile
    +String logo
    +DateTime startTime
    +DateTime endTime
    +DateTime createdAt
    +DateTime updatedAt
    +providers: Provider[]
}

class Timeline {
    +int id
    +String title
    +String description
    +String filePath
    +boolean isPublished
    +boolean showInLive
    +int userId
    +int streamId
    +DateTime createdAt
    +DateTime updatedAt
    +items: TimelineItem[]
}

class TimelineItem {
    +int id
    +int timelineId
    +int order
    +String type
    +int itemId
    +DateTime createdAt
    +DateTime updatedAt
}

class Video {
    +int id
    +String title
    +String description
    +String path
    +int duration
    +String status
    +int showInLive
    +int userId
    +int guestId
    +DateTime createdAt
    +DateTime updatedAt
}

class VideoEncoder {
    +int id
    +DateTime createdAt
    +DateTime updatedAt
    +static encode(Video, string, string, string) Promise
}

AuthFinder <|-- User : uses
User "1" --> "*" Playlist : owns
User "1" --> "*" Stream : owns
User "1" --> "*" Timeline : owns
User "1" --> "*" Provider : creates
Playlist "1" --> "*" Video : includes
Playlist "1" --> "*" PlaylistVideo : includes
Timeline "1" --> "*" TimelineItem : contains
TimelineItem "0..1" --> "0..1" Video : refers to
TimelineItem "0..1" --> "0..1" Playlist : refers to
Stream "1" --> "*" Provider : uses
Stream "1" --> "1" Timeline : references
Guest "1" --> "0..*" Video : owns
Guest "1" --> "0..*" GuestToken : possesses
Queue "1" --> "*" QueueItem : contains
QueueItem "1" --> "1" Video : processes
VideoEncoder --> Video : encodes
