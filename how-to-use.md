# **Odin Book**

This project is an api for the Odin Book social media platform. It's kinda like the Facebook.

## **Features**

You can implement these features with this api:
- create a public profile,
- submit posts including images,
- submit comments to posts,
- reply to comments,
- like the posts,
- send friend requests to the people with the same location,
- chat with your friends in privates and rooms.

## **HTTP Endpoints**

The base URL starts with `http://127.0.0.1:3000/`.

**NOTE:** All the routes except `/accounts/` require a JSON Web Token (JWT).

The endpoints that you should send requests to:

### **Signup**

**NOTE:** After signing up with Google, you need to show the users a page which asks for their username. This is necessary because after signing up with Google, the username is just a number (username has to be only alphabetical). The URL you need to send a POST request to is `/users/setusername/` (more information on this route is provided bellow).

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| signup with Google | `GET` | `/accounts/oauth2/google/` | - | - | - |
| signup with username and password | `POST` | `/accounts/signup/` | `username <String>`, `password <String>`, `confirmPass <String>` | JWT | The username must be only alphabetical and contains at least 3 characters. The password should be at least 6 characters. `password` and `confirmPass` must contain the same value. |

With both methods of signup, you will be given a JWT for further actions in the app.

### **Login**

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| login with google | `GET` | `/accounts/oauth2/google/` | - | JWT | - |
| login with username and password | `POST` | `/accounts/login/` | `username <String>`, `password <String>` | JWT | - |

With both methods of login, you will be given a JWT for further actions in the app.

### **Posts**

**NOTE:** while submitting a post, when the user uploads an image, the client application must upload the image to the server immediately at `/img/upload/` and retrieve the image's web address from the response. There should be one request per image.

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| create post | `POST` | `/posts/create/` | `content <String>`, `images [<String>]` | post object containing these properties: `author`: `_id` of the creator, `date`, `content` (escaped), `is_edited`, `comments`: `[]`, `likes`: `[]`, `hashtags`: `[<String>]`, `images`: `[<String>]` | If there's any image uploaded, `content` should contain the web address of it along with the post's text. The `images` must be and array of all successfully uploaded images names. The content will be escaped and stored in the database, so you need to unescape the content after retrieving it. |
| edit post | `POST` | `/posts/edit/?id={post._id}/` | `content <String>`, `images [<String>]` | post object containing these properties: `author`: `_id` of the creator, `date`, `content` (escaped), `is_edited`, `comments`: `[]`, `likes`: `[]`, `hashtags`: `[<String>]`, `images`: `[<String>]` | If the user deletes any image, the client application must send a `DELETE` request to the server at `/img/delete/?name={img_name}/`. If there's any new image uploaded, `content` should contain the web address of it along with the post's text. The `images` must be and array of all successfully uploaded images names. The content will be escaped and stored in the database, so you need to unescape the content after retrieving it. |
| delete post | `DELETE` | `/posts/delete/?id={post._id}/` | - | `200 OK` | - |
| get posts | `GET` | `/posts/?page={number}` | - | An array of post objects with these properties: `_id`, `author`, `date`, `content`, `is_edited`, `comments`, `likes` and `hashtags`. | The `author` field is populated with `_id`, `username` and `profile_pic` properties. For loading the comments, you need to send a request to `/posts/comments/?postid={_id of the post}` |
| get comments of a post | `GET` | `/posts/comments/?postid={_id of the post}&page={page number}/` | - | an array of objects. Each object (comment) contains `author`(id), `post`(id), `date`, `content`, `replies`, `in_reply_to` and `is_edited`. Every response contains up to 20 comments. | You need to get the `replies` of comments by sending a request to `/comments/replies/?commentid={_id of parent comment}`. |
| get all posts by a hashtag | `GET` | `/posts/hashtag/{hashtag}/?page={page number}` | - | An array of post objects which contain these properties: `author`(populated with `username` and `profile_pic`), `date`, `content`, `comments`(array of ids), `likes`(array of ids), `hashtags`, `images`(uploaded images name) and `is_edited`. | There would be up to 10 posts per page and all the posts will be sorted from old to new based on their `date`. |

### **Comments**

**NOTE:** comments are not suppossed to contain images.

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| create a comment | `POST` | `/comments/create/?postid={_id of the post}/` | `content <String>`, `replyTo <String>` | The comment object with these properties: `author`: `_id` of the creator, `content` (escaped), `date`, `replies`: `[_id]`, `in_reply_to`: `_id` of the parent comment, `post`: `_id` of the post | The content will be escaped and stored in the db. The `replyTo` property can be omitted or `null`. If the user is replying to a comment, this has to be the parent comment's `_id`. |
| edit a comment | `PUT` | `/comments/edit/?commentid={_id of the comment}/` | `content <String>` | The comment object with these properties: `content` (escaped), `is_edited`, `author`: `_id` of the creator. | The content will be escaped and stored in the db. 
| delete a comment | `DELETE` | `/comments/delete/?commentid={_id of the comment}/` | - | `200 OK` | - |
| get replies of a comment | `GET` | `/comments/replies/?commentid={_id of the parent comment}` | - | An array of objects. Each object (comment) contains `author`(id), `post`(id), `date`, `content`, `replies`, `in_reply_to` and `is_edited`. | The `author` field is populated with `username` and `profile_pic` properties. The `replies` is an array of comments which you can use to show replies of the comments (replies and comments are sent together). You can also get the `replies` of comments by sending a request to `/comments/replies/?commentid={_id of parent comment}`. |

### **Friend requests**

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| send a friend request | `POST` | `/friendreq/send/` | `to <String>`, `message <String>` | Friend request object with these properties: `to`: `_id` of the target user, `from`: `_id` of the sender, `message`: the message sent with the request. | The `to` field must be the target user's `_id`. `message` will be escaped before being stored in database. |
| accept a friend request | `POST` | `/friendreq/accept/?id={friend request _id}/` | - | `200 OK` | - |
| deny a friend request | `DELETE` | `/friendreq/deny/?id={friend request _id}/` | - | `200 OK` | - |
| get all friend requests | `GET` | `/friendreq/?page={number}/` | - | An array of requests. Each request is an object with properties `to`, `from` and `message`. | The `to` property is the current user. `from` is populated and has `username` and `profile_pic` properties. Each response will have up to 10 requests (each `page` contains this amount). |

### **Change profile info**

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| change username | `PUT` | `/users/setusername/` | `username <String>` | JWT | `username` must contain only alphabetical characters |
| change user's info | `POST` | `/users/setprofileinfo/` | `first_name <String>`, `last_name <String>`, `date_of_birth <Date>` and `location <String>` | User object with these properties: `location`, `date_of_birth`, `first_name`, `last_name`. | The `location` property should be an Alpha-2 [country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes). `first_name` and `last_name` should be alphabetical with the minimum length of 1 character. |
| change user's prfile pic | `PUT` | `/users/setprofilepic/` | `image <file>` | The image name in the cloud storage. | - |
| change password | `PUT` | `/users/setpassword/` | `oldPassword <String>`, `password <String>`, `confirmPass <String>` | `200 OK` | The `password` and `confirmPass` have to be the same. The password has to contain at least 6 characters. |

### **User profile**

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| get a user's profile | `GET` | `/users/{target user's username}` | - | If the user is visiting his/her own profile, the response would contain `first_name`, `last_name`, `username`, `location`, `profile_pic`, `privates` and `rooms`. The `privates` has `members` field which will be populated. The `rooms` has `memebers` (populated with `username` and `profile_pic`) and `profile_pic`. If the user is visiting others profile, the respone wouldn't have `privates` and `rooms`. | You need to get the posts of the user from `/users/{username}/posts/` and the friends of users from `/users/friends/` (only the current user). |
| get user's friends list | `GET` | `/users/friends/` | - | An array of user objects with these properties: `username`, `profile_pic` | - |
| get user's posts | `GET` | `/users/{username}/posts/?page={page number}` | - | An array of 10 posts objects (max) with these properties: `author`(populated with `username` and `profile_pic`), `date`, `content`, `comments`([id]), `likes`([id]), `is_edited` and `hashtags`([String]). | The posts are sorted from old to new by their `date`. |

### **Like/dislike a post**

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| like a post | `POST` | `/like/?postid={_id of the post}` | - | `200 OK` | This route is used both for like and dislike. If the user has alredy liked the post, then it's assumed a dislike. |

### **Images**

To get the images you need to send a request in this form: `/img/get/{image name}

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| upload a post image | `POST` | `/img/upload/` | `image <file>` | The image name in the storage. | - |
| get an image | `GET` | `/img/get/{image name}` | - | The image file. | - |
| delete an image | `DELETE` | `/img/delete/?name={image name}` | - | `200 OK` | - |

## **Rooms**

| Title | HTTP method | URL | Request body | Response | Description |
| ----- | ----------- | --- | ------------ | -------- | ----------- |
| set room's name | `PUT` | `/rooms/setname/?roomId={_id of room}/` | `name <String>` | `200 OK` | The user has to be the creator of room. After recieving the response you should emit `roomNameChanged` event. |
| set room's profile pic | `PUT` | `/rooms/setroompic/?roomId={_id of room}/` | `image <file>` | The uploaded image name in the cloud storage | The user has to be the creator of room. After recieving the response you should emit `roomProfilePicChanged` event. |

### A word about HTTP errors

The error codes you may encounter are: `500`, `502`, `400`, `404`, `401`, `403`. 

The response with these codes has this structure:

```
{
  messsage: "error(s) message(s) seperated by a comma ,",
  reqBody: {} // the request body, if you have provided
  reqQuery: {} // the request query, if you have provided
  time: new Date()
}
```

## **Socket events**

Upon loading the page, you need to connect to the socket at `"/"` namespace.

**NOTE:** to connect to the Socket.io you need to supply the request with "Athorization" header which holds the JWT for current user.

### **`.emit('event')`**

Here's a list of events that client can emit.

| Event | Purpose | Parameters | Response event emitted by sever | Possible error events |
| ----- | ------- | --------- | ------------------------------- | --------------------- |
| `sendFriendReq` | When the user sends a friend request to another user, after getting the HTTP response from server, you need to emit this event so the target user could be notified about the request if he/she is online. | `targetUser <String>`: the target user's `_id` | `friendReqreceived` | - |
| `acceptFriendReq` | When the target user accepts the friend request, you need to emit this event so the sender of the request could be notified if he/she is online. | `reqId <String>`: the friend request's `_id` | `friendReqAccepted` | `Forbidden` |
| `createRoom` | You can emit this event to create a new room. | `roomInfo <Object>`: an object containing `name` and `profile_pic` prorperties. After creating the room in database, the socket will be joined to the room. | `roomCreated` | - |
| `deleteRoom` | To delete a room which was created by the current user, you need to emit this event. | `roomId <String>`: the `_id` of target room | `roomDeleted` (to all of members) | `NotFound`, `Forbidden` |
| `joinRoom` | If the client has a room link like `odinChat/{_id of a room}`, it can join a room by emitting this event. | `roomId <String>`: the `_id` of the target room | `userJoinedRoom` (to the members of room), `joinedRoom` (to the socket) | `NotFound`, `AlreadyJoined` |
| `leaveRoom` | Emit it if the user wants to leave a room. | `roomId <String>`: the `_id` of the target room | `userLeft` (to the room memebers), `leftRoom` (to the socket) | `NotFound`, `Forbidden` |
| `messageRoom` | For sending a message to a room, you need to emit this event. | `message <String>`: the message to send (will be escaped and stored in database) | `roomMessage` (to both the sender and room members) | `NotFound`, `Forbidden` |
| `getRoomMessages` | To retrieve the room messages. There will be 100 messages per page and they're sorted by their date from old to new. | `page <Number>`: the pagination number, `roomId <String>`: the `_id` of the room | `retrieveRoomMessages` | `NotFound`, `Forbidden` |
| `roomNameChanged` | After changing sending a request to `/rooms/setname/` and getting the response, you need to emit this event so all the members of the room could be notified. | `newName <String>`: new chosen name of the room, `roomId <String>`: the `_id` of the target room | `roomNameChanged` (to room members excluding the sender). | `Forbidden` |
| `roomProfilePicChanged` | After getting the name of the uploaded image name at `/rooms/setprofilepic/`, you need to emit this event so all the room members could be notified. | `newImgName <String>`: the newly uploaded image name, `roomId <String>`: the `_id` of the target room | `roomProfilePicChanged` (to room members excluding the sender) | `Forbidden`, `BadRequest` |
| `startPrivate` | To start a private chat with someone, you need to emit this event. | `targetUser <String>`: the `_id` of the target user | `privateCreated` (to both users). | `NotFound`, `DuplicatePrivate` |
| `messagePrivate` | To send a message in a private chat, you need to emit this event. | `message <String>`: the message to submit, `privateId <String>`: the `_id` of the target private chat | `privateMessage` (to both the sender and receiver) | `NotFound`, `Forbidden` |
| `getPrivateMessages` | Get the messages of a private chat. Each page contains up to 100 messages. | `page <Number>`: the pagination number, `privateId <String>`: the `_id` of the target private chat | `retrievePrivateMessages` | `NotFound`, `Forbidden` |
| `usernameChanged` | After the client changed it's username at `/users/setusername/`, you need to emit this event so all the rooms and private chats that the user is a member of can change the username immediately. | `newUsername <String>`: the newly chosen username | `usernameChanged` (to all the rooms and private messages the user is joined) | `BadRequest` |
| `userProfilePicChanged` | After the client updated the profile picture at `/users/setProfilePic/`, you need to emit this event so all the rooms and private chats that the user is a member of get notified. | `newImgName <String>`: the newly uploaded image name | `userProfilePicChanged` (to all the rooms and private chats). | `BadRequest` |
| `userProfilInfoChanged` | After updating the user's info at `/users/setProfileInfo/`, you need to emit this event so all the rooms and private chats that the user is a member of get notified. | `newInfo <Object>`: this object should have these properties: `first_name`, `last_name`, `date_of_birth` and `location` | `userProfileInfoChanged` (to all the rooms and privates the user is a member of). | `BadRequest` |

### **`.on('event')`**

Here's a list of the event you should expect from the server on the client-side:

| Event | Purpose | Arguments | Event that caused this |
| ----- | ------- | --------- | ---------------------- |
| `friendReqreceived` | If the user is online, you can use this to show a notification to the user. | Sender's info: `{ _id, username, profile_pic}` | `sendFriendReq` |
| `friendReqAccepted` | If the user is online, you can use this event to show a notification to him/her. | receiver's info: `{ _id, username, profile_pic}` | `acceptFriendReq` |
| `roomCreated` | Can be used to create the room immediately after creation. | `room Object: {_id, members[_id], creator: _id, messages, name, profile_pic}` | `createRoom` |
| `roomDeleted` | When this is emitted, the room is no longer available, so you may delete it for the user too or not let any message be sent. | `roomId: _id` | `deleteRoom` |
| `userJoinedRoom` | You may want to create a message to the members inside the room. Joining won't make any message inside database. | `joinedUser._id` | `joinRoom` |
| `joinedRoom` | Can be used for showing the room to the user. | `{ room: {_id, memebers[_id], messages[msg Object: {id, author, content, date}], creator: _id, profile_pic}, onlineMembers[_id] }` | `joinRoom` |
| `userLeft` | Notify the members when a user leaves the room (I mean really leaving not from Socket.io perspective). | `leavingUser._id` | `leaveRoom` |
| `leftRoom` | Can be used to remove the room. | `room._id` | `leaveRoom` |
| `roomMessage` | Show the message that was successfully sent to the user. | `msgObj: {id, time, content, author: _id }`, `room._id` | `messageRoom` |
| `retrieveRoomMessages` | Can be used to show the 100 messages to the user. | `[msg Objects: {is, time, author: _id, content}]`, `_id`: the `_id` of the target room | `getRoomMessages` |
| `roomNameChanged` | Show the new name to all the members. | `newName`: the newly chosen name, `_id`: the `_id` of the target room | `roomNameChanged` |
| `roomProfilePicChanged` | Show the new profile pic of the room to all the members. | `newImgName`: the newly uploaded image name in the storage | `roomProfilePicChanged` |
| `privateCreated` | To show the private chat to the current user. | `private object: {members: [_id], messages}` | `startPrivate` |
| `joinedPrivate` | To show the target user the private chat. | `private Object: {members: [_id], messages}` | `startPrivate` |
| `privateMessage` | Show the user the recently sent message. | `msgObj: {id, time, content, author: _id}`, `_id`: the target private's `_id` | `messagePrivate` |
| `retrievePrivateMessages` | Show the 100 messages of the chat to the user. | `[ msgObj: {id, time, content, author} ]`, `_id`: the `_id` of the target private chat | `getPrivateMessages` |
| `usernameChanged` | Show the newly chosen username to all the members of a room or a private chat. | `_id`: the `_id` of the user that changed his/her username, `newUsername` | `usernameChanged` |
| `userProfilePicChanged` | Show the newly uploaded profile pic. | `_id`: the `_id` of the user that changed his/her profile pic, `newImgName` | `userProfilePicChanged` |
| `userProfileInfoChanged` | Show the newly submitted profile info. | `_id`: the `_id` of the user that changed his/her profile info, `newInfo: { last_name, first_name, date_of_birth, location }` (the properties are taken from the emitted event payload, so if you send all of them, you get all of them) | `userProfileInfoChanged` |
| `retrievePrivate` | This event is emitted just after you connected to the socket. You can use this to get all the private chats the user is inside. | `private object: { members: [{username, profile_pic }] }` | `connection` |
| `retrieveRoom` | This event is emitted just after you connected to the socket. You can use this to get all the rooms the user is inside. | `room object: { members: [{username, profile_pic }] }` | `connection` |
| `friendReqAvailable` | This event is emitted just after you connected to the socket. If there's any friend request for the user to accept, the quatity of them will be emitted. | `length <Number>` | `connection` |


### **`.on('event')`** #Errors

The errors of your emitted events payload are sent to you by emitting an error event. The arguments you get are the arguments you've sent to the server.

| Event | Purpose | Arguments | Event that caused this |
| ----- | ------- | --------- | ---------------------- |
| `BadRequest` | You may have gone wrong in providing some needed info. | the payload you've sent | `roomNameChanged`, `roomProfilePicChanged`, `usernameChanged`, `userProfilePicChanged` |
| `NotFound` | The `_id` you've provided is probably wrong. | the `_id` you've sent | `deleteRoom`, `getPrivateMessages`, `getRoomMessages`, `joinRoom`, `leaveRoom`, `messagePrivate`, `messageRoom`, `startPrivate` |
| `Fobidden` | The use is not allowed to take the action. | the `_id` you've sent | `acceptFriendReq`, `deleteRoom`, `getPrivateMessages`, `getRoomMessages`, `leaveRoom`, `messagePrivate`, `roomNameChanged`, `roomProfilePicChanged` |
| `AlreadyJoined` | The user is alredy a member of the room he/she is trying to join. | `_id` of the target room | `joinRoom` |
| `DuplicatePrivate` | The user is trying to make a private chat that already exists. | `_id` of the target user | `startPrivate` |
