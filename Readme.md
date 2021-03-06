# πΆ Introduction

It is a platform for memories that you can share,like and delete.Also it has the search capability through keyword or category.You can use it with every devices

It's a MERN application which is build with using Mongodb,Express,ReactJs and NodeJs.

---

# βΊοΈ Motivation

Challenge and motivation are the things which make better a person. I was looking for something advanced and challenge me to raise me in the second level.I found this project on [this channel]("https://www.youtube.com/watch?v=VsUzmlZfYNg") and I **rebuilt it from scratch** with using last updated library and added some features like Redux toolkit,i18n,theme provider, sessions and cookies to protect route and passportJS.

---

# π Contents

This app features two folders. First, we have a directory for our frontend client,and second, we have a directory for our node server that contains all of the backend code.
_**file structure**_ π΄

```
βββ Project
β   βββ client
β   βββ server
β   βββ Readme.md
```

# π Requirements

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

```
βββ src
β   βββ api
β   β   βββ index.js π All routes called here
β   βββ assets
β   β   βββ memories logo
β   βββ components
β   β   βββ Auth π Login & Register and OAuth2.
|   β   β   βββ Auth.js
|   β   β   βββ Icon.js
|   β   β   βββ Input.js
|   β   β   βββ style.js
β   β   βββ Form π inputs for edit,create,upload and submit post
|   β   β   βββ Form.js
|   β   β   βββ style.js
β   β   βββ Home π Home page and pagination and search called here.
|   β   β   βββ index.js
|   β   β   βββ style.js
β   β   βββ Navbar π AppBar and settings website goes here.
|   β   β   βββ Navbar.js
|   β   β   βββ style.js
β   β   βββ PostDetails
|   β   β   βββ PostDetails.js π To show post in single page.
|   β   β   βββ CommentSection.js π  Comment component
|   β   β   βββ style.js π Post details style.
β   β   βββ Posts π fetch all posts and designed card for each component.
|   β   β   βββ PostList.js
|   β   β   βββ style.js
|   β   β   βββ Post  π card component.
|   |   β   β   βββ Post.js
|   |   β   β   βββ Like.js π Responsible for Like and unlike action
|   |   β   β   βββ style.js
β   βββ features π Redux toolkit
β   β   βββ Post π Reducer and actions for posts.
|   β   β   βββ postSlice.js
β   β   βββ user π Reducer and actions for user authentication
β   βββ i18n
|   β   βββ en π English translation
|   |   β   βββ en.json
|   β   βββ ar π Arabic translation
|   |   β   βββ ar.json
|   β   β   βββ userSlice.js
β   βββ index.js π entry React point
β   βββ App.js π entry application point
β   βββ style.js π application main styles
β   βββ store.js π Reducers
β   βββ themeContext.js π React context to apply themeProvider
```

## React 18 , Mui library V5 , Redux toolkit , Google Auth SDK , Validation password, Like and unlike post if user authenticated also appears how likes each post, Use Pagination material ui, Use Location,Navigate and prevPath with routes in react-route-dom v6, use ImageListItem Mui to show recommended posts and toggle them mode, toggle direction and change language, Search by tags also by words, Use object state to avoid unnecessary re-renders .

## Express , Mongoe db , Middleware , Post models and User modles.
