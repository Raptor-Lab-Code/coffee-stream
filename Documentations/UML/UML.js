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
