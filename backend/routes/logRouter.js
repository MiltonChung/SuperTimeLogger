const express = require("express");
const logRouter = express.Router();
const Log = require("../models/log.model");

logRouter.route("/").post((req, res, next) => {
	if (req.body.userId === "") {
		Log.find()
			.then(logs => res.json(logs))
			.catch(err => res.status(400).json("Error: " + err));
	} else {
		Log.find({ userId: req.body.userId.uid })
			.sort({ date: -1 })
			.then(logs => res.json(logs))
			.catch(err => res.status(400).json("Error: " + err));
	}
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
		.catch(err => {
			console.log("bad");
			res.status(400).json("Error: " + err);
		});
});

logRouter
	.route("/:id")
	.get((req, res) => {
		Log.findById(req.params.id)
			.then(log => res.json(log))
			.catch(err => res.status(400).json("Error: " + err));
	})
	.delete((req, res) => {
		Log.findByIdAndDelete(req.params.id)
			.then(log => res.json(log))
			.catch(err => res.status(400).json("Error: " + err));
	});

logRouter.route("/update/:id").post((req, res) => {
	Log.findById(req.params.id)
		.then(log => {
			log.description = req.body.description;
			log.label = req.body.label;
			log.duration = req.body.duration;
			// log.date = req.body.date;
			log.userId = req.body.userId;

			log.save()
				.then(log => res.json(log))
				.catch(err => res.status(400).json("Error: " + err));
		})
		.catch(err => res.status(400).json("Error: " + err));
});

module.exports = logRouter;
