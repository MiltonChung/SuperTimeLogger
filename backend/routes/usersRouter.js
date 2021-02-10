const express = require("express");
const userRouter = express.Router();
const User = require("../models/user.model");

userRouter.route("/").get((req, res, next) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json("Error: " + err));
});

userRouter.route("/add").post((req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	const name = req.body.name;
	const bio = req.body.bio;
	const title = req.body.title;

	const newUser = new User({ username, password, name, bio, title });
	newUser
		.save()
		.then(user => res.json(user))
		.catch(err => res.status(400).json("Error: " + err));
});

module.exports = userRouter;
