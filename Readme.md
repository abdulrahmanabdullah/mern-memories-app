# 👶 Introduction

It is a platform for memories that you can share,like and delete.Also it has the search capability through keyword or category.You can use it with every devices

It's a MERN application which is build with using Mongodb,Express,ReactJs and NodeJs.

# ☺️ Motivation

Challenge and motivation are the things which make better a person. I was looking for something advanced and challenge me to raise me in the second level.I found this project on [this channel]("https://youtu.be/VsUzmlZfYNg?t=17"), And I **rebuilt it from scratch** with using last updated library and added some features like Redux toolkit,i18n,theme provider, sessions, authenication to protect routes with JWT strategy and soical media login with passportJS.

# 📖 Contents

This app features two folders. First, we have a directory for our frontend client side which it's build with React.And second, we have a directory for our node server that contains all of the backend code.

```
├── Project
│   ├── client
│   ├── server
│   ├── Readme.md
```

# 📌 Requirements

- Node js >= 16.15.0
- npm >= 8.5.5
- React >= 17

you can run this commands to check which version on your machine

```
node -v
npm -v
```

# client getting started

After clone project run this commands:

```
cd projectFolder
cd client
npm install
npm start
```

### I will explain client folder to you by files structure and write what's file contains, also I'll describe what the job they have done.

```
├── src
│   ├── api
│   │   ├── index.js 👉 All routes called here
│   ├── assets
│   │   ├── memories logo
│   ├── components
│   │   ├── Auth 👉 Login & Register and OAuth2.
|   │   │   ├── Auth.js
|   │   │   ├── Icon.js
|   │   │   ├── Input.js
|   │   │   ├── style.js
│   │   ├── Form 👉 inputs for edit,create,upload and submit post
|   │   │   ├── Form.js
|   │   │   ├── style.js
│   │   ├── Home 👉 Home page and pagination and search called here.
|   │   │   ├── index.js
|   │   │   ├── style.js
│   │   ├── Navbar 👉 AppBar and settings website goes here.
|   │   │   ├── Navbar.js
|   │   │   ├── style.js
│   │   ├── PostDetails
|   │   │   ├── PostDetails.js 👉 To show post in single page.
|   │   │   ├── CommentSection.js 👉  Comment component
|   │   │   ├── style.js 👉 Post details style.
│   │   ├── Posts 👉 fetch all posts and designed card for each component.
|   │   │   ├── PostList.js
|   │   │   ├── style.js
|   │   │   ├── Post  👉 card component.
|   |   │   │   ├── Post.js
|   |   │   │   ├── Like.js 👉 Responsible for Like and unlike action
|   |   │   │   ├── style.js
│   ├── features 👉 Redux toolkit
│   │   ├── Post 👉 Reducer and actions for posts.
|   │   │   ├── postSlice.js
│   │   ├── user 👉 Reducer and actions for user authentication
│   ├── i18n
|   │   ├── en 👉 English translation
|   |   │   ├── en.json
|   │   ├── ar 👉 Arabic translation
|   |   │   ├── ar.json
|   │   │   ├── userSlice.js
│   ├── index.js 👉 entry React point
│   ├── App.js 👉 entry application point
│   ├── style.js 👉 application main styles
│   ├── store.js 👉 Reducers
│   ├── themeContext.js 👉 React context to apply themeProvider
```

# Server

Our server is responsible for connecting to the database, and routing incoming requests to the users.

# 📌 Requirements

- Node js >= 16.15.0

# Server getting started

after clone project run this commands:

```
cd projectFolder && cd server
npm install
npm start
```

# Database :convenience_store:

Here I'm using [NoSQL](https://www.mongodb.com/nosql-explained) database that store data in a format other than relational tables like MongoDB. In our database we created two documents first one for [posts](./server/models/postSchem.js) and the seconde one for [users](./server/models/user.js).

## Connect to database:

You can use Mongo Atlas cloud database-[follow this steps](https://www.mongodb.com/atlas/database),OR install mongo in local machine-[guid to install mongodb](https://www.mongodb.com/docs/manual/installation/). However I'm using docker container to connect local database. If you already installed docker write this command:

```
docker run --name mongodb -d -p 27017:27017 mongo
```

Now we have the database url and port

```
mongodb://localhost:27017/app
```

# Routes 🔄

We have two main routes. First one for posts and the other one for user.
In post routes we built all functionality to manage post create,edit,delete,update and like post. (e.g post routes)

```
request.get("/posts"); // To fetch all posts
request.get("/post/:id"); // To fetch post by id param
request.post("/posts",middleWare,createPost); //  Only authenticated user can create new post
```

And in user route we have register,login and logout routes.(e.g user routes)

```
request.post("/user/register", userPayload);
request.post("/user/login", userPayload);
request.post("/user/logout");
```

# Authentication :handshake:

Here I'm using [JWT](https://jwt.io/introduction) for authentication with RS256 algorithm and public/private keys to encrypted token. Here I'm using [this](./server/generateKey.js) model to generating keys.Thanks to [PassportJS](https://www.passportjs.org/) to make this easy.

# License

The code in this project is free software under the [AGPL License version 3 or later](./LICENSE.md).

---

## This app built by Abdulrahman Alkhudhayri keep learning 💪.
