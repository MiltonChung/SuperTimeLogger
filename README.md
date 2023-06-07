# Super Time Logger

A full stack website that allows users to log and keep track of their time.

## Table of contents

-  [About](#about)
-  [Technologies](#technologies)
-  [Features](#features)
-  [Challenges](#challenges)
-  [Inspiration](#inspiration)

## About

A full stack website that allows users to log and keep track of their time. I used React for the frontend and Express middleware web framework to handle CRUD operations and connect with MongoDB database. I used Firebase for the user authentication processes. I wanted to learn both Firebase and MongoDB so I implemented both. This is my first full stack website so I learned a lot about the backend side of things and how everything connects together through different API calls. The backend is hosted on Heroku and the frontend is hosted on Netlify. Since the backend is hosted on Heroku, loading the data might be a bit slow since I have a basic tier account.

Time to complete: ~ 35 hours

## Technologies

Project is created with:

-  React
-  MongoDB
-  Mongoose
-  Nodejs
-  Express
-  Firebase
-  Figma

## Features

-  Signup/Login
-  Edit profile(Name, bio, etc...)
-  Add/edit/delete time logs
-  Different nspirational quote every time user goes to the Total tab
-  Displays user's total time spent and all accounts' cummulative time spent
-  Automatically logs user in if they signed in before
-  Mobile friendly

## Challenges

-  Storing and displaying dates were a challenge because the HTML date input format is different than
   what I wanted, so I needed to write functions to convert them to work with Date objects
-  Deploying backend and frontend separately and making them work together live was challenging because
   it was my first time deploying a full stack website
-  CRUD operations was hard because the data needs to go through different layers to get to MongoDB and sometimes it's hard to keep track or find bugs
-  Showing different pages based on if user is logged in or not and displaying only the logged in user info
-  Weird layout issues on mobile(iPhone Chrome) because iPhone browsers support different CSS styles

## Inspiration

I like to keep track of my time and it's super interesting to see what I usually spend my time on. The VS code extension WakaTime inspired me to make one.
