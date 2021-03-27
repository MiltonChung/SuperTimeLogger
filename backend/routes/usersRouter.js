const express = require("express");
const User = require("../models/user.model");

const userRouter = express.Router();

userRouter.route("/").get((req, res, next) => {
	User.find()
		.then(users => {
			res.json(users);
			console.log(users);
		})
		.catch(err => {
			console.log(err);
			res.status(400).json("Error: " + err);
		});
});

userRouter.route("/add").post((req, res, next) => {
	console.log("USERS ROUTE ADD: ", req.body);
	User.create({
		userFirebaseUID: req.body.userFirebaseUID,
		email: req.body.email,
		bio: req.body.bio,
		title: req.body.title,
		name: req.body.name,
	})
		.then(user => {
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({ status: "Registration Successful!", user: user });
		})
		.catch(err => res.status(400).json("Error: " + err));
});

userRouter.route("/:id").get((req, res) => {
	User.findOne({ userFirebaseUID: req.params.id })
		.then(user => {
			// console.log(user);
			res.statusCode = 200;
			res.setHeader("Content-Type", "application/json");
			res.json({ status: "User found!", user: user });
		})
		.catch(err => res.status(400).json("Error: " + err));
});

userRouter.route("/update/:id").post((req, res) => {
	User.findOne({ userFirebaseUID: req.params.id })
		.then(user => {
			user.userFirebaseUID = req.body.userFirebaseUID;
			user.name = req.body.name;
			user.bio = req.body.bio;
			user.title = req.body.title;
			user.email = req.body.email;

			user
				.save()
				.then(user => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json({ status: "User updated!", user: user });
				})
				.catch(err => res.status(400).json("inner Error: " + err));
		})
		.catch(err => res.status(400).json("outer Error: " + err));
});

module.exports = userRouter;
