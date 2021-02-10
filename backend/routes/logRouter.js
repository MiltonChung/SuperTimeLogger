const express = require("express");
const logRouter = express.Router();
const Log = require("../models/log.model");

logRouter.route("/").get((req, res, next) => {
	Log.find()
		.then(logs => res.json(logs))
		.catch(err => res.status(400).json("Error: " + err));
});

logRouter.route("/add").post((req, res, next) => {
	const description = req.body.description;
	const label = req.body.label;
	const date = Date.parse(req.body.date);
	const duration = Number(req.body.duration);
	const userId = req.body.userId;

	const newLog = new Log({ description, label, date, duration, userId });
	newLog
		.save()
		.then(log => res.json(log))
		.catch(err => res.status(400).json("Error: " + err));
});

module.exports = logRouter;
