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

# 🔔 Requirements

- Node js >= 16.15.0
- npm >= 8.5.5

---

# client getting started

After clone project run this commands:

```
npm install
npm start
```

Let's talk about file structures:

```
├── src
│   ├── api
│   │   ├── index.js 👉 All routes called here
│   ├── assets
│   │   ├── memories logo
│   ├── components
│   │   ├── Auth
│   │   ├── Form
│   │   ├── Home
│   │   ├── Navbar
│   │   ├── PostDetails
│   │   ├── Posts
|   │   │   ├── Post 👉 Card
│   ├── features 👉 Redux toolkit
│   │   ├── Post
|   │   │   ├── postSlice.js 👉 Reducer and actions for posts
│   │   ├── user
|   │   │   ├── userSlice.js 👉 Reducer and actions for Authentication
│   ├── index.js 👉 entry React point
│   ├── style.js 👉 application main styles
│   ├── App.js 👉 entry application point
│   ├── store.js 👉 Reducers
│   ├── themeContext.js 👉 React context to apply themeProvider
```

## React 18 , Mui library V5 , Redux toolkit , Google Auth SDK , Validation password, Like and unlike post if user authenticated also appears how likes each post, Use Pagination material ui, Use Location,Navigate and prevPath with routes in react-route-dom v6, use ImageListItem Mui to show recommended posts and toggle them mode, toggle direction and change language, Search by tags also by words, Use object state to avoid unnecessary re-renders .

## Express , Mongoe db , Middleware , Post models and User modles.
