# 👶 Introduction

It is a platform for memories that you can share,like and delete.Also it has the search capability through keyword or category.You can use it with every devices

It's a MERN application which is build with using Mongodb,Express,ReactJs and NodeJs.

---

# 😄 Motivation

Challenge and motivation are the things which make better a person. I was looking for something advanced and challenge me to raise me in the second level.I found this project on [this channel]("https://www.youtube.com/watch?v=VsUzmlZfYNg") and I **rebuilt it from scratch** with using last updated library and added some features like Redux toolkit,i18n,theme provider, sessions and cookies to protect route and passportJS.

---

# 📖 Contents

This app features two folders. First, we have a directory for our frontend client,and second, we have a directory for our node server that contains all of the backend code.
_**file structure**_ 🌴

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

---

# client getting started

After clone project run this commands:

```
npm install
npm start
```

### I will explain client folder to you by files structure and write what's file contains, also I'll describe what the job they have done.

```bash
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

## React 18 , Mui library V5 , Redux toolkit , Google Auth SDK , Validation password, Like and unlike post if user authenticated also appears how likes each post, Use Pagination material ui, Use Location,Navigate and prevPath with routes in react-route-dom v6, use ImageListItem Mui to show recommended posts and toggle them mode, toggle direction and change language, Search by tags also by words, Use object state to avoid unnecessary re-renders .

## Express , Mongoe db , Middleware , Post models and User modles.
